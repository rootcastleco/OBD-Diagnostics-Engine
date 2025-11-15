
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

// --- NEW ROOTCASTLE DATA STRUCTURES from automobile-models-and-specs ---

export interface SpecProfile {
    body: string;
    engine: string;
    engine_displacement: string;
    engine_hp: string;
    engine_torque: string;
    fuel: string;
    max_speed_kmh: string;
    startYear: number;
    endYear: number;
    transmission: string;
    zero_to_100_kmh: string;
}

export interface ModelProfile {
    model: string;
    specs: SpecProfile[];
}

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
    trim: string;
    engine: EngineProfile;
    transmission: TransmissionProfile;
    technical_specs: TechnicalSpecs;
    image_url: string;
}
