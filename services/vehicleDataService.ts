import type { VehicleData, RootcastleResponse, VehicleProfile } from '../types';

// --- MOCK DATABASE for TR Market ---
const db = {
    "Toyota": {
        "Corolla": {
            2014: {
                trims: ["Premium", "Active"],
                engines: [
                    { 
                        id: "1.6 Valvematic",
                        engine: { volume_cc: 1598, power_hp: 132, torque_nm: 160, fuel: 'Benzin', aspiration: 'Atmosferik', cylinders: 4 },
                        transmission: { type: 'Otomatik', gears: '7-speed' },
                    }
                ],
                specs: {
                    vin_prefix: "NMT",
                    segment: "C",
                    body: "Sedan",
                    technical_specs: { acceleration_0_100: "11.1", top_speed: "195", avg_consumption: "6.3", weight_kg: "1280", boot_liters: "452", fuel_tank_liters: "55" },
                    image_url: "https://cdn.ototeknikveri.com/Files/Cars/Toyota/Corolla/11th_gen/1.6_advance_multidrive_s/Toyota-Corolla-11th_gen-1.6_Advance_MultiDrive_S-2013-1024-01.jpg"
                }
            }
        },
        "Yaris": {
            2020: {
                trims: ["Dream", "Flame"],
                 engines: [
                    { 
                        id: "1.5 Hybrid",
                        engine: { volume_cc: 1490, power_hp: 116, torque_nm: 120, fuel: 'Hybrid', aspiration: 'Atmosferik', cylinders: 3 },
                        transmission: { type: 'e-CVT', gears: '' },
                    }
                ],
                specs: {
                    vin_prefix: "VN_Y",
                    segment: "B",
                    body: "Hatchback",
                    technical_specs: { acceleration_0_100: "9.7", top_speed: "175", avg_consumption: "3.8", weight_kg: "1160", boot_liters: "286", fuel_tank_liters: "36" },
                    image_url: "https://cdn.ototeknikveri.com/Files/Cars/Toyota/Yaris/4th_gen/1.5_hybrid_dream_e-cvt/Toyota-Yaris-4th_gen-1.5_Hybrid_Dream_e-CVT-2020-1024-03.jpg"
                }
            }
        }
    },
    "Ford": {
        "Focus": {
            2018: {
                 trims: ["Titanium", "ST-Line"],
                 engines: [
                    { 
                        id: "1.5 TDCi",
                        engine: { volume_cc: 1499, power_hp: 120, torque_nm: 300, fuel: 'Dizel', aspiration: 'Turbo', cylinders: 4 },
                        transmission: { type: 'Otomatik', gears: '8-speed' },
                    }
                ],
                 specs: {
                    vin_prefix: "WF0",
                    segment: "C",
                    body: "Hatchback",
                    technical_specs: { acceleration_0_100: "10.2", top_speed: "196", avg_consumption: "4.2", weight_kg: "1394", boot_liters: "375", fuel_tank_liters: "47" },
                    image_url: "https://cdn.ototeknikveri.com/Files/Cars/Ford/Focus/4th_gen/hatchback/1.5_ecoblue_titanium_at/Ford-Focus-4th_gen-Hatchback-1.5_EcoBlue_Titanium_AT-2018-1024-01.jpg"
                }
            }
        }
    }
};

type DbMake = keyof typeof db;
type DbModel<M extends DbMake> = keyof typeof db[M];
type DbYear<M extends DbMake, O extends DbModel<M>> = keyof typeof db[M][O];

// --- API Functions for UI ---
export const getMakes = async (): Promise<string[]> => {
    return Promise.resolve(Object.keys(db));
};

// FIX: Refactor to use explicit type casting after a type guard to ensure type safety.
export const getModelsForMake = async (make: string): Promise<string[]> => {
    if (make in db) {
        const typedMake = make as DbMake;
        return Promise.resolve(Object.keys(db[typedMake]));
    }
    return Promise.resolve([]);
};

// FIX: Refactor to use nested type guards and explicit casting to correctly narrow types.
export const getYearsForModel = async (make: string, model: string): Promise<number[]> => {
    if (make in db) {
        const typedMake = make as DbMake;
        if (model in db[typedMake]) {
            const typedModel = model as DbModel<typeof typedMake>;
            return Promise.resolve(Object.keys(db[typedMake][typedModel]).map(Number));
        }
    }
    return Promise.resolve([]);
}

// FIX: Refactor to use nested type guards and explicit casting to prevent 'never' type inference.
export const getOptionsForYear = async (make: string, model: string, year: number) => {
    const yearStr = year.toString();
    if (make in db) {
        const typedMake = make as DbMake;
        if (model in db[typedMake]) {
            const typedModel = model as DbModel<typeof typedMake>;
            const yearData = db[typedMake][typedModel];
            if (yearStr in yearData) {
                const data = yearData[yearStr as keyof typeof yearData];
                const engines = data.engines.map(e => ({
                    engine: `${e.engine.volume_cc}cc ${e.engine.power_hp}hp`,
                    fuel: e.engine.fuel,
                    transmission: e.transmission.type
                }));
                const trims = data.trims;
                return Promise.resolve({ engines, trims });
            }
        }
    }
    return Promise.resolve({ engines: [], trims: [] });
};

// --- NHTSA SIMULATION ---
const decodeVinNHTSA = async (vin: string): Promise<{ make: string; model: string; year: string; }> => {
    if (vin.startsWith("NMT")) return { make: "Toyota", model: "Corolla", year: "2014" };
    if (vin.startsWith("WF0")) return { make: "Ford", model: "Focus", year: "2018" };
    throw new Error('NHTSA API: VIN not found.');
}

// --- VEHICLE RESOLUTION ENGINE ---
// FIX: Refactor to use nested type guards for proper type narrowing and to fix property access on 'never' type errors.
export const resolveVehicleInfo = async (partialData: Partial<VehicleData>): Promise<RootcastleResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500)); 

    let baseData: { make: string; model: string; year: string };
    let vpicConfidence: RootcastleResponse['source_confidence']['vpic'] = 'none';

    if (partialData.vin && partialData.vin.length >= 3) {
        try {
            baseData = await decodeVinNHTSA(partialData.vin);
            vpicConfidence = 'high';
        } catch (e) {
            throw new Error("Could not decode VIN. Please use manual selection.");
        }
    } else if (partialData.make && partialData.model && partialData.year) {
        baseData = {
            make: partialData.make,
            model: partialData.model,
            year: partialData.year
        };
        vpicConfidence = 'low';
    } else {
        throw new Error("Please select Make, Model, and Year to identify the vehicle.");
    }
    
    const { make, model, year } = baseData;
    const numericYear = parseInt(year, 10);
    const yearStr = numericYear.toString();

    if (make in db) {
        const typedMake = make as DbMake;
        if (model in db[typedMake]) {
            const typedModel = model as DbModel<typeof typedMake>;
            const yearData = db[typedMake][typedModel];
            if (yearStr in yearData) {
                const vehicleEntry = yearData[yearStr as keyof typeof yearData];
                
                // Find the selected engine or default to the first one
                let selectedEngine = vehicleEntry.engines[0];
                if(partialData.engine) {
                    const potentialEngine = vehicleEntry.engines.find(e => `${e.engine.volume_cc}cc ${e.engine.power_hp}hp` === partialData.engine);
                    if(potentialEngine) selectedEngine = potentialEngine;
                }
        
                const vehicle: VehicleProfile = {
                    vin: partialData.vin,
                    make,
                    model,
                    year: numericYear,
                    ...vehicleEntry.specs,
                    engine: selectedEngine.engine,
                    transmission: selectedEngine.transmission,
                    trim: partialData.trim || vehicleEntry.trims[0]
                };
        
                const uiOptions = await getOptionsForYear(make, model, numericYear);
        
                const fullResponse: RootcastleResponse = {
                    vehicle,
                    ui: {
                        makes: await getMakes(),
                        models: await getModelsForMake(make),
                        years: await getYearsForModel(make, model),
                        fuels: ['Benzin', 'Dizel', 'Hybrid', 'LPG'],
                        engines: uiOptions.engines,
                        trims: uiOptions.trims,
                    },
                    source_confidence: {
                        tr_dataset: 'high',
                        arabalar_com: 'high',
                        world_cars: 'medium',
                        vpic: vpicConfidence
                    }
                };
                return fullResponse;
            }
        }
    }

    throw new Error(`Could not find a TR market profile for ${make} ${model} ${year}.`);
};
