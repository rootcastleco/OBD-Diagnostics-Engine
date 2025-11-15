
// Cache for the local dataset
let trDataset: any[] | null = null;
const getTrDataset = async (): Promise<any[]> => {
  if (!trDataset) {
    const response = await fetch('/data/vehicle/tr-dataset.json');
    if (!response.ok) {
      console.error('TR Veriseti yüklenemedi.');
      return [];
    }
    trDataset = await response.json();
  }
  return trDataset;
};


// --- API Functions for UI Dropdowns ---
export const getMakes = async (): Promise<string[]> => {
    const data = await getTrDataset();
    const makes = new Set(data.map(car => car.Marka));
    return Promise.resolve(Array.from(makes).sort());
};

export const getModelsForMake = async (make: string): Promise<string[]> => {
    if (!make) return Promise.resolve([]);
    const data = await getTrDataset();
    const models = new Set(data.filter(car => car.Marka === make).map(car => car.Model));
    return Promise.resolve(Array.from(models).sort());
};

export const getYearsForModel = async (make: string, model: string): Promise<number[]> => {
    if (!make || !model) return Promise.resolve([]);
    const data = await getTrDataset();
    const years = new Set(data.filter(car => car.Marka === make && car.Model === model).map(car => Number(car["Model Yılı"])));
    return Promise.resolve(Array.from(years).sort((a, b) => b - a)); // Descending sort
}

export const getOptionsForYear = async (make: string, model: string, year: number) => {
    if (!make || !model || !year) return Promise.resolve({ engines: [], trims: [] });
    const data = await getTrDataset();
    const carsForYear = data.filter(car => car.Marka === make && car.Model === model && Number(car["Model Yılı"]) === year);

    const engines = carsForYear.map(car => ({
        engine: `${parseInt(car['Motor Hacmi'])}cc ${parseInt(car.Beygir)}hp`,
        fuel: car['Yakıt Tipi'],
        transmission: car['Vites Tipi']
    })).filter((v, i, a) => a.findIndex(t => (t.engine === v.engine)) === i); 

    const trims = Array.from(new Set(carsForYear.map(car => car['Donanım Paketi'])));

    return Promise.resolve({ engines, trims });
};
