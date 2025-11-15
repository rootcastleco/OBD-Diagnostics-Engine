
export interface VehicleData {
  make: string;
  model: string;
  year: string;
  fuel?: string;
  vin?: string;
  engine?: string;
  trim?: string;
}

export interface LiveData {
    rpm: string | number;
    speed: string | number;
    maf: string | number;
    ltft: string | number;
    stft: string | number;
    ect: string | number;
    dtc: string[];
}

// --- NEW ROOTCASTLE DATA STRUCTURES ---

export interface EngineProfile {
    volume_cc: number;
    power_hp: number;
    torque_nm: number;
    fuel: string;
    aspiration: string;
    cylinders: number;
}

export interface TransmissionProfile {
    type: string;
    gears: string;
}

export interface TechnicalSpecs {
    acceleration_0_100: string;
    top_speed: string;
    avg_consumption: string;
    weight_kg: string;
    boot_liters: string;
    fuel_tank_liters: string;
}

export interface VehicleProfile {
    vin?: string;
    make: string;
    model: string;
    year: number;
    segment: string;
    body: string;
    engine: EngineProfile;
    transmission: TransmissionProfile;
    trim: string;
    technical_specs: TechnicalSpecs;
    image_url: string;
}

export interface VehicleUI {
    makes: string[];
    models: string[];
    years: number[];
    fuels: string[];
    engines: { engine: string; fuel: string; transmission: string }[];
    trims: string[];
}

export interface SourceConfidence {
    tr_dataset: 'high' | 'medium' | 'low' | 'none';
    arabalar_com: 'high' | 'medium' | 'low' | 'none';
    world_cars: 'high' | 'medium' | 'low' | 'none';
    vpic: 'high' | 'medium' | 'low' | 'none';
}

export interface RootcastleResponse {
    vehicle: VehicleProfile;
    ui: VehicleUI;
    source_confidence: SourceConfidence;
}


// --- DEPRECATED ---
export interface ResolvedVehicleData {
    vin: string;
    make: string;
    model: string;
    year: number;
    engine: {
        volume_cc: number;
        power_hp: number;
        torque_nm: number;
        fuel: string;
        configuration: string;
    };
    transmission: string;
    segment: string;
    trim: string;
    source_confidence: any;
}
