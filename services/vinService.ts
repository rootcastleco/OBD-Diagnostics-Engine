
import type { VehicleProfile, ModelProfile, SpecProfile } from '../types';

async function getSpecsForMake(make: string): Promise<ModelProfile[]> {
    try {
        const response = await fetch(`/data/vehicle/specs/${make.toLowerCase().replace(' ', '-')}.json`);
        if (!response.ok) {
            return [];
        }
        return await response.json();
    } catch (e) {
        console.error(`Spesifikasyon dosyası yüklenemedi: ${make}`, e);
        return [];
    }
}

async function decodeVIN(vin: string) {
  const vpicRes = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
  );
  if (!vpicRes.ok) {
      throw new Error("VPIC API'sine ulaşılamadı veya VIN geçersiz.");
  }
  const vpicData = await vpicRes.json();
  const vpicResults = vpicData.Results;

  const getVpicValue = (variable: string) => {
    const result = vpicResults.find((r: any) => r.Variable === variable && r.Value && r.Value.trim() !== "" && r.Value.trim() !== "Not Applicable");
    return result ? result.Value : null;
  };

  const make = getVpicValue("Make");
  const model = getVpicValue("Model");
  const yearStr = getVpicValue("Model Year");
  const year = yearStr ? parseInt(yearStr, 10) : null;

  if (!make || !model || !year) {
      return null;
  }
  
  return { make, model, year };
}


const mapSpecToProfile = (make: string, model: string, year: number, spec: SpecProfile, vin?: string): VehicleProfile => {
    return {
        vin: vin,
        make,
        model,
        year,
        trim: spec.body,
        engine: {
            volume_cc: parseInt(spec.engine_displacement?.replace('cc', '').trim() || '0'),
            power_hp: parseInt(spec.engine_hp?.replace('HP', '').trim() || '0'),
            torque_nm: parseInt(spec.engine_torque?.replace('Nm', '').trim() || '0'),
            fuel: spec.fuel,
            aspiration: spec.engine,
            cylinders: 4, // Assuming 4, not in new data
        },
        transmission: {
            type: spec.transmission,
            gears: 'Bilinmiyor'
        },
        technical_specs: {
            acceleration_0_100: spec.zero_to_100_kmh?.replace('s','').trim() || 'N/A',
            top_speed: spec.max_speed_kmh?.replace('km/h', '').trim() || 'N/A',
            avg_consumption: 'N/A',
            weight_kg: 'N/A',
            boot_liters: 'N/A',
            fuel_tank_liters: 'N/A'
        },
        image_url: ''
    };
};

export async function resolveVehicleByVIN(vin: string) {
  const baseInfo = await decodeVIN(vin);

  if (!baseInfo) {
    throw new Error("VIN geçersiz veya VPIC API tarafından tanınamadı.");
  }

  const { make, model, year } = baseInfo;
  
  const allSpecsForMake = await getSpecsForMake(make);
  if (!allSpecsForMake.length) {
      return { make, model, year, status: "spec_data_missing", vehicle: null, spec: null };
  }
  
  const modelData = allSpecsForMake.find(m => m.model.toLowerCase() === model.toLowerCase());
  if (!modelData) {
      return { make, model, year, status: "model_not_found", vehicle: null, spec: null };
  }

  const matchingSpecs = modelData.specs.filter(spec => year >= spec.startYear && year <= spec.endYear);

  if (matchingSpecs.length === 0) {
      return { make, model, year, status: "year_not_found", vehicle: null, spec: null };
  }
  
  // Return the first match for simplicity
  const bestSpec = matchingSpecs[0];
  const vehicleProfile = mapSpecToProfile(make, model, year, bestSpec, vin);

  return {
    status: "ok",
    vehicle: vehicleProfile,
    spec: bestSpec,
    make, 
    model, 
    year
  };
}
