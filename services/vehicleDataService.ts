
import { ModelProfile, SpecProfile } from '../types';

// Cache for the datasets
let brands: string[] | null = null;
const specsCache: { [key: string]: ModelProfile[] } = {};

const getBrands = async (): Promise<string[]> => {
    if (!brands) {
        try {
            const response = await fetch('/data/vehicle/brands.json');
            if (!response.ok) throw new Error('Marka listesi yüklenemedi.');
            const data = await response.json();
            brands = data.map((b: { brand: string }) => b.brand).sort();
        } catch (e) {
            console.error(e);
            return [];
        }
    }
    return brands;
};

const getSpecsForMake = async (make: string): Promise<ModelProfile[]> => {
    const cacheKey = make.toLowerCase();
    if (!specsCache[cacheKey]) {
        try {
            const response = await fetch(`/data/vehicle/specs/${make.toLowerCase().replace(' ', '-')}.json`);
            if (!response.ok) throw new Error(`Spesifikasyonlar yüklenemedi: ${make}`);
            specsCache[cacheKey] = await response.json();
        } catch (e) {
            console.error(e);
            specsCache[cacheKey] = [];
        }
    }
    return specsCache[cacheKey];
};


// --- API Functions for UI Dropdowns ---
export const getMakes = async (): Promise<string[]> => {
    return getBrands();
};

export const getModelsForMake = async (make: string): Promise<string[]> => {
    if (!make) return [];
    const specs = await getSpecsForMake(make);
    return specs.map(m => m.model).sort();
};

export const getYearsForModel = async (make: string, model: string): Promise<number[]> => {
    if (!make || !model) return [];
    const specs = await getSpecsForMake(make);
    const modelData = specs.find(m => m.model === model);
    if (!modelData) return [];

    const years = new Set<number>();
    modelData.specs.forEach(spec => {
        for (let y = spec.startYear; y <= spec.endYear; y++) {
            years.add(y);
        }
    });

    return Array.from(years).sort((a, b) => b - a);
};

export const getSpecsForYear = async (make: string, model: string, year: number): Promise<SpecProfile[]> => {
    if (!make || !model || !year) return [];
    const specs = await getSpecsForMake(make);
    const modelData = specs.find(m => m.model === model);
    if (!modelData) return [];

    return modelData.specs.filter(spec => year >= spec.startYear && year <= spec.endYear);
};
