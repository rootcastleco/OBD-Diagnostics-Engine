
import type { VehicleProfile } from '../types';

// Cache for the local datasets
let trDataset: any[] | null = null;

async function getTrDataset() {
  if (!trDataset) {
    const response = await fetch('/data/vehicle/tr-dataset.json');
    if (!response.ok) {
      throw new Error('TR Veriseti yüklenemedi.');
    }
    trDataset = await response.json();
  }
  return trDataset;
}


export async function decodeVIN(vin: string) {
  const vpicRes = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`
  );
  if (!vpicRes.ok) {
      throw new Error("VPIC API'sine ulaşılamadı veya VIN geçersiz.");
  }
  const vpicData = await vpicRes.json();
  const vpicResults = vpicData.Results;

  const getVpicValue = (variable: string) => {
    const result = vpicResults.find((r: any) => r.Variable === variable && r.Value && r.Value.trim() !== "");
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

export async function resolveTRSpecs(make: string, model: string, year: number) {
  const dataset = await getTrDataset();
  const car = dataset.find((c: any) =>
    c.Marka?.toLowerCase() === make.toLowerCase() &&
    model.toLowerCase().includes(c.Model?.toLowerCase()) &&
    Number(c["Model Yılı"]) === Number(year)
  );

  return car || null;
}

const mapTrSpecsToProfile = (trSpecs: any, vin?: string): VehicleProfile => {
    const make = trSpecs.Marka;
    const model = trSpecs.Model;
    const year = Number(trSpecs["Model Yılı"]);

    return {
        vin: vin,
        make,
        model,
        year,
        segment: trSpecs.Segment,
        body: trSpecs['Kasa Tipi'],
        trim: trSpecs['Donanım Paketi'],
        engine: {
        volume_cc: parseInt(trSpecs['Motor Hacmi']?.replace(' cc', '') || '0', 10),
        power_hp: parseInt(trSpecs.Beygir?.replace(' HP', '') || '0', 10),
        torque_nm: parseInt(trSpecs.Tork?.replace(' Nm', '') || '0', 10),
        fuel: trSpecs['Yakıt Tipi'],
        aspiration: 'Bilinmiyor',
        cylinders: parseInt(trSpecs.Silindir || '4', 10)
        },
        transmission: {
        type: trSpecs['Vites Tipi'],
        gears: trSpecs['Vites Sayısı']
        },
        technical_specs: {
        acceleration_0_100: trSpecs['0-100 Hızlanma']?.replace(' s', '') || 'N/A',
        top_speed: trSpecs['Maksimum Hız']?.replace(' km/s', '') || 'N/A',
        avg_consumption: trSpecs['Karma Tüketim']?.replace(' lt', '') || 'N/A',
        weight_kg: trSpecs['Boş Ağırlık']?.replace(' kg', '') || 'N/A',
        boot_liters: trSpecs['Bagaj Hacmi']?.replace(' lt', '') || 'N/A',
        fuel_tank_liters: trSpecs['Yakıt Deposu']?.replace(' lt', '') || 'N/A'
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
  const trSpecs = await resolveTRSpecs(make, model, year);

  if (!trSpecs) {
    return {
        vin,
        make,
        model,
        year,
        status: "tr_data_missing"
    };
  }
  
  const vehicleProfile = mapTrSpecsToProfile(trSpecs, vin);

  return {
    ...vehicleProfile,
    status: "ok"
  };
}


export async function resolveVehicleManually(make: string, model: string, year: number, engineStr: string, trim: string): Promise<VehicleProfile> {
    const dataset = await getTrDataset();
  
    const engineMatch = engineStr.match(/(\d+)cc (\d+)hp/);
    if (!engineMatch) throw new Error("Motor formatı geçersiz.");
    const [, volume_cc, power_hp] = engineMatch;
  
    const trSpecs = dataset.find(car => 
        car.Marka === make &&
        car.Model === model &&
        Number(car["Model Yılı"]) === year &&
        parseInt(car['Motor Hacmi']) === parseInt(volume_cc) &&
        parseInt(car.Beygir) === parseInt(power_hp) &&
        car['Donanım Paketi'] === trim
    );
  
    if (!trSpecs) {
      throw new Error(`Belirtilen kriterlere uygun TR profili bulunamadı.`);
    }
    
    return mapTrSpecsToProfile(trSpecs);
}
