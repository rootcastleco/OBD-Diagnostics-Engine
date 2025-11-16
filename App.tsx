

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { VehicleData, LiveData, VehicleProfile, SpecProfile } from './types';
import { analyzeObdData, lookupDtcCode } from './services/geminiService';
import { ELM327Service } from './services/elmService';
import { resolveVehicleByVIN } from './services/vinService';
import { getMakes, getModelsForMake, getYearsForModel, getSpecsForYear } from './services/vehicleDataService';
import { EngineIcon, WrenchIcon, CarIcon, BoltIcon, InfoIcon, BluetoothIcon, VehicleSearchIcon, TransmissionIcon, FuelIcon, SpeedometerIcon } from './components/icons';
import { AnimatePresence, motion } from "framer-motion";

// --- HELPER & UTILITY COMPONENTS ---

const generateLogoUrl = (make: string) => {
    if (!make) return '';
    const makeLower = make.toLowerCase();
    if (makeLower === 'skoda') return 'https://upload.wikimedia.org/wikipedia/commons/2/29/Skoda_Logo.svg';
    const domain = makeLower.replace(/ /g, '').replace(/-/g, '') + '.com';
    return `https://logo.clearbit.com/${domain}`;
};

const IconButton: React.FC<{ icon: React.ReactNode; label: string; onClick: () => void; active: boolean; }> = ({ icon, label, onClick, active }) => (
    <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 w-full transition-colors duration-200 p-2 rounded-lg ${active ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-text-primary'}`}>
        {icon}
        <span className="text-xs font-medium">{label}</span>
    </button>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className }) => (
    <div className={`bg-brand-surface-glass border border-brand-border rounded-2xl backdrop-blur-md ${className}`}>
        {children}
    </div>
);


// --- SPEC DISPLAY COMPONENTS ---
const SpecItem: React.FC<{ icon: React.ReactNode; label: string; value: string | number; }> = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 p-2 bg-brand-dark/30 rounded-lg">
        <div className="text-brand-primary">{icon}</div>
        <div>
            <p className="text-xs text-brand-text-secondary">{label}</p>
            <p className="text-sm font-semibold text-brand-text-primary">{value || 'N/A'}</p>
        </div>
    </div>
);

const SpecDisplayCard: React.FC<{ spec: SpecProfile }> = ({ spec }) => {
    return (
        <div className="mt-4 pt-4 border-t border-brand-border">
            <h3 className="text-sm font-bold mb-3 text-brand-text-secondary">Teknik Özellikler</h3>
            <div className="grid grid-cols-2 gap-3">
                <SpecItem icon={<BoltIcon className="w-5 h-5" />} label="Beygir" value={spec.engine_hp} />
                <SpecItem icon={<WrenchIcon className="w-5 h-5" />} label="Tork" value={spec.engine_torque} />
                <SpecItem icon={<EngineIcon className="w-5 h-5" />} label="Motor" value={`${spec.engine_displacement} ${spec.engine}`} />
                <SpecItem icon={<TransmissionIcon className="w-5 h-5" />} label="Vites" value={spec.transmission} />
                <SpecItem icon={<FuelIcon className="w-5 h-5" />} label="Yakıt" value={spec.fuel} />
                <SpecItem icon={<SpeedometerIcon className="w-5 h-5" />} label="0-100 Hızlanma" value={spec.zero_to_100_kmh} />
                <SpecItem icon={<SpeedometerIcon className="w-5 h-5" />} label="Maks. Hız" value={spec.max_speed_kmh} />
            </div>
        </div>
    );
};


// --- GAUGE COMPONENTS ---

const RadialGauge: React.FC<{ label: string; value: number | string; unit: string; max: number; colorClass: string; }> = ({ label, value, unit, max, colorClass }) => {
    const numericValue = typeof value === 'number' ? value : parseFloat(String(value));
    const displayValue = isNaN(numericValue) ? 'N/A' : value;
    const percentage = isNaN(numericValue) ? 0 : Math.min((numericValue / max) * 100, 100);
    const circumference = 2 * Math.PI * 45;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <Card className="p-4 flex flex-col items-center justify-center aspect-square text-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" className="text-brand-border" stroke="currentColor" strokeWidth="6" fill="transparent" />
                <motion.circle
                    cx="50" cy="50" r="45"
                    className={colorClass}
                    stroke="currentColor"
                    strokeWidth="6"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: offset }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                />
            </svg>
            <div className="absolute flex flex-col">
                <span className="text-3xl font-bold tracking-tighter text-brand-text-primary">{displayValue}</span>
                <span className="text-sm text-brand-text-secondary -mt-1">{unit}</span>
            </div>
            <span className="mt-2 text-xs font-medium text-brand-text-secondary uppercase tracking-wider">{label}</span>
        </Card>
    );
};

const LinearGauge: React.FC<{ label: string; value: number | string; unit: string; max: number; colorClass: string; }> = ({ label, value, unit, max, colorClass }) => {
    const numericValue = typeof value === 'number' ? value : parseFloat(String(value));
    const displayValue = isNaN(numericValue) ? 'N/A' : value;
    const percentage = isNaN(numericValue) || numericValue < 0 ? 0 : Math.min((numericValue / max) * 100, 100);

    return (
        <Card className="p-3">
            <div className="flex justify-between items-baseline mb-2">
                <span className="text-xs text-brand-text-secondary">{label}</span>
                <span className="font-mono text-sm text-brand-text-primary">{displayValue} <span className="text-xs">{unit}</span></span>
            </div>
            <div className="w-full bg-brand-border rounded-full h-1.5">
                <motion.div
                    className={`${colorClass} h-1.5 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                />
            </div>
        </Card>
    );
};


// --- VIEW COMPONENTS ---

type MobileView = 'live' | 'config' | 'report';

const LiveDashboardView: React.FC<{ liveData: LiveData; vehicleProfile: VehicleProfile | null; selectedMake: string; logoError: boolean, onLogoError: () => void; }> = ({ liveData, vehicleProfile, selectedMake, logoError, onLogoError }) => {
    const displayMake = vehicleProfile?.make || selectedMake;

    return (
        <div className="p-4 space-y-4">
            {displayMake && (
                <Card className="p-4">
                    <div className="flex items-center gap-4">
                        {!logoError && (
                          <img 
                            key={displayMake}
                            src={generateLogoUrl(displayMake)} 
                            alt={`${displayMake} logo`}
                            className="w-14 h-14 bg-white/10 rounded-full p-1 object-contain" 
                            onError={onLogoError}
                          />
                        )}
                        <div>
                            <h1 className="text-lg font-bold text-brand-text-primary">{vehicleProfile ? `${vehicleProfile.make} ${vehicleProfile.model}` : displayMake}</h1>
                            {vehicleProfile && (
                                <p className="text-sm text-brand-text-secondary">{vehicleProfile.year} - {vehicleProfile.trim}</p>
                            )}
                        </div>
                    </div>
                </Card>
            )}
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 md:col-span-1">
                    <RadialGauge label="Motor Devri" value={liveData.rpm} unit="RPM" max={8000} colorClass="text-brand-primary" />
                </div>
                <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
                    <LinearGauge label="Hız" value={liveData.speed} unit="km/h" max={240} colorClass="bg-brand-secondary" />
                    <LinearGauge label="Soğutma Suyu" value={liveData.ect} unit="°C" max={120} colorClass="bg-yellow-400" />
                    <LinearGauge label="MAF" value={liveData.maf} unit="g/s" max={100} colorClass="bg-purple-400" />
                    <LinearGauge label="STFT" value={liveData.stft} unit="%" max={25} colorClass="bg-pink-400" />
                    <LinearGauge label="LTFT" value={liveData.ltft} unit="%" max={25} colorClass="bg-indigo-400" />
                </div>
            </div>
             {liveData.dtc.length > 0 && (
                <Card className="p-4">
                    <h3 className="text-sm font-bold mb-2 text-red-400">Arıza Kodları (DTC)</h3>
                    <div className="flex flex-wrap gap-2">
                        {liveData.dtc.map(code => (
                            <span key={code} className="bg-red-500/20 text-red-300 text-xs font-mono px-2 py-1 rounded-md">{code}</span>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

const ConfigView: React.FC<any> = ({ selections, setSelections, uiOptions, vin, setVin, isConnected, isConnecting, handleConnect, handleDisconnect, handleIdentifyByVIN, handleGetVIN, vehicleDataLoading, vehicleDataError }) => {
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setSelections((prev: any) => {
            const newState = { ...prev, [name]: value };
            if (name === 'make') {
                newState.model = '';
                newState.year = '';
                newState.spec = '';
            }
            if (name === 'model') {
                newState.year = '';
                newState.spec = '';
            }
            if (name === 'year') {
                newState.spec = '';
            }
            return newState;
        });
    };

    const CustomSelect = ({ name, value, onChange, options, placeholder, disabled = false }: { name: string, value: string, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void, options: (string|number)[], placeholder: string, disabled?: boolean}) => (
        <select
            name={name}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="w-full bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none appearance-none"
        >
            <option value="">{placeholder}</option>
            {options.map((opt: any) => <option key={opt.toString()} value={opt.toString()}>{opt.toString()}</option>)}
        </select>
    );
    
    const selectedSpec = selections.spec !== '' && uiOptions.specs?.[parseInt(selections.spec, 10)];
    
    return (
        <div className="p-4 space-y-4">
             <Card className="p-4">
                <h2 className="text-base font-bold mb-3 text-brand-text-primary">Bağlantı</h2>
                {isConnected ? (
                     <div className="space-y-3">
                        <div className="flex items-center justify-between bg-green-500/10 text-green-300 px-3 py-2 rounded-lg">
                            <span className="text-sm font-medium">ELM327'ye Bağlı</span>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        </div>
                        <button onClick={handleDisconnect} className="w-full bg-red-500/80 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            Bağlantıyı Kes
                        </button>
                    </div>
                ) : (
                    <button onClick={handleConnect} disabled={isConnecting} className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-brand-dark font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                        <BluetoothIcon className="w-5 h-5" />
                        {isConnecting ? 'Bağlanılıyor...' : "ELM327'ye Bağlan"}
                    </button>
                )}
            </Card>

            <Card className="p-4">
                <h2 className="text-base font-bold mb-3 text-brand-text-primary">VIN ile Tanımla</h2>
                 <div className="space-y-3">
                    <input
                        type="text"
                        value={vin}
                        onChange={(e) => setVin(e.target.value.toUpperCase())}
                        placeholder="VIN Girin (17 Karakter)"
                        className="w-full bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                    <div className="flex gap-2">
                        <button onClick={handleGetVIN} disabled={!isConnected} className="w-full bg-brand-secondary/80 hover:bg-brand-secondary text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                            VIN'i Al
                        </button>
                        <button onClick={handleIdentifyByVIN} disabled={!vin} className="w-full bg-brand-primary/80 hover:bg-brand-primary text-brand-dark text-sm font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                            Tanımla
                        </button>
                    </div>
                 </div>
            </Card>

            <Card className="p-4">
                <h2 className="text-base font-bold mb-3 text-brand-text-primary">Araç Seçimi</h2>
                 {vehicleDataLoading ? (
                     <p className="text-sm text-brand-text-secondary text-center py-4">Araç listesi yükleniyor...</p>
                ) : vehicleDataError ? (
                    <div className="text-sm text-red-400 bg-red-500/10 p-3 rounded-lg text-center">
                        <p>{vehicleDataError}</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                       <CustomSelect name="make" value={selections.make} onChange={handleSelectChange} options={uiOptions.makes} placeholder="Marka Seçin" />
                       <CustomSelect name="model" value={selections.model} onChange={handleSelectChange} options={uiOptions.models} placeholder="Model Seçin" disabled={!selections.make} />
                       <CustomSelect name="year" value={selections.year} onChange={handleSelectChange} options={uiOptions.years} placeholder="Yıl Seçin" disabled={!selections.model} />
                       <select
                            name="spec"
                            value={selections.spec}
                            onChange={handleSelectChange}
                            disabled={!selections.year || !uiOptions.specs || uiOptions.specs.length === 0}
                            className="w-full bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-brand-primary focus:outline-none appearance-none"
                        >
                            <option value="">Spesifikasyon Seçin</option>
                            {uiOptions.specs.map((spec: SpecProfile, index: number) => (
                                <option key={index} value={index.toString()}>
                                    {`${spec.body} / ${spec.engine} (${spec.engine_hp})`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
                {selectedSpec && <SpecDisplayCard spec={selectedSpec} />}
            </Card>
        </div>
    );
}

const ReportView: React.FC<any> = ({ analysisResult, isLoading, rawLog, dtcLookupCode, setDtcLookupCode, dtcLookupResult, isLookingUpDtc, dtcLookupError, handleDtcLookup, handleAnalyze }) => {
    return (
        <div className="p-4 space-y-4">
            <Card className="p-4">
                 <h2 className="text-base font-bold mb-3 text-brand-text-primary">Yapay Zeka Analizi</h2>
                 <button onClick={handleAnalyze} disabled={isLoading} className="w-full mb-3 bg-brand-primary hover:bg-brand-primary-hover text-brand-dark font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                    {isLoading ? 'Analiz Ediliyor...' : 'Mevcut Verileri Analiz Et'}
                </button>
                {analysisResult && (
                    <div className="prose prose-sm prose-invert max-w-none p-3 bg-black/20 rounded-lg mt-3">
                        <pre className="whitespace-pre-wrap font-sans">{analysisResult}</pre>
                    </div>
                )}
            </Card>
            
            <Card className="p-4">
                 <h2 className="text-base font-bold mb-3 text-brand-text-primary">DTC Kodu Arama</h2>
                 <div className="flex gap-2">
                    <input
                        type="text"
                        value={dtcLookupCode}
                        onChange={(e) => setDtcLookupCode(e.target.value.toUpperCase())}
                        placeholder="Örn: P0135"
                        className="w-full bg-brand-surface border border-brand-border rounded-lg px-3 py-2 text-sm font-mono focus:ring-2 focus:ring-brand-primary focus:outline-none"
                    />
                    <button onClick={handleDtcLookup} disabled={isLookingUpDtc || !dtcLookupCode} className="bg-brand-secondary/80 hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                        Ara
                    </button>
                 </div>
                 {isLookingUpDtc && <p className="text-sm mt-2 text-brand-text-secondary">Aranıyor...</p>}
                 {dtcLookupError && <p className="text-sm mt-2 text-red-400">{dtcLookupError}</p>}
                 {dtcLookupResult && (
                    <div className="prose prose-sm prose-invert max-w-none p-3 bg-black/20 rounded-lg mt-3">
                        <pre className="whitespace-pre-wrap font-sans">{dtcLookupResult}</pre>
                    </div>
                )}
            </Card>

            <Card className="p-4">
                <h2 className="text-base font-bold mb-3 text-brand-text-primary">Ham Veri Akışı</h2>
                <div className="h-48 overflow-y-auto bg-black/30 rounded-lg p-2 font-mono text-xs text-brand-text-secondary space-y-1">
                    {rawLog.map((log, i) => <p key={i} className={log.startsWith('RX:') ? 'text-cyan-400' : log.startsWith('TX:') ? 'text-yellow-400' : ''}>{log}</p>)}
                </div>
            </Card>
        </div>
    );
}

// --- MAIN APP COMPONENT ---

const App: React.FC = () => {
  // State
  const [selections, setSelections] = useState({ make: '', model: '', year: '', spec: '' });
  const [uiOptions, setUiOptions] = useState<{ makes: string[], models: string[], years: number[], specs: SpecProfile[] }>({ makes: [], models: [], years: [], specs: []});
  const [vin, setVin] = useState('');
  const [vehicleProfile, setVehicleProfile] = useState<VehicleProfile | null>(null);
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [liveData, setLiveData] = useState<LiveData>({ rpm: 0, speed: 0, maf: 0, ltft: 0, stft: 0, ect: 0, dtc: [] });
  const [rawLog, setRawLog] = useState<string[]>(["Rootcastle Pilot AI'ya hoş geldiniz."]);
  const [activeView, setActiveView] = useState<MobileView>('live');
  const [logoError, setLogoError] = useState<boolean>(false);
  const [dtcLookupCode, setDtcLookupCode] = useState<string>('');
  const [dtcLookupResult, setDtcLookupResult] = useState<string>('');
  const [isLookingUpDtc, setIsLookingUpDtc] = useState<boolean>(false);
  const [dtcLookupError, setDtcLookupError] = useState<string | null>(null);
  const [vehicleDataLoading, setVehicleDataLoading] = useState(true);
  const [vehicleDataError, setVehicleDataError] = useState<string | null>(null);

  // Refs
  const elmServiceRef = useRef<ELM327Service | null>(null);
  const liveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const vinBufferRef = useRef<Record<string, string>>({});
  const dtcCheckCounterRef = useRef(0);
  
  // Handlers
  const addLog = (log: string) => setRawLog(prev => [log, ...prev.slice(0, 99)]);
  
  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    addLog("Bağlantı işlemi başlatıldı...");
    elmServiceRef.current = new ELM327Service();
    elmServiceRef.current.onLog = addLog;
    elmServiceRef.current.onDisconnect = () => {
        setIsConnected(false);
        if(liveIntervalRef.current) clearInterval(liveIntervalRef.current);
    };

    elmServiceRef.current.onData = (data) => {
        // Simple data parser
        if (data.startsWith('41 0C')) { // RPM
            const hex = data.split(' ').slice(2).join('');
            const value = (parseInt(hex, 16)) / 4;
            setLiveData(d => ({...d, rpm: Math.round(value)}));
        } else if (data.startsWith('41 0D')) { // Speed
            const hex = data.split(' ')[2];
            setLiveData(d => ({...d, speed: parseInt(hex, 16)}));
        } else if (data.startsWith('41 05')) { // ECT
            const hex = data.split(' ')[2];
            setLiveData(d => ({...d, ect: parseInt(hex, 16) - 40}));
        } else if (data.startsWith('41 10')) { // MAF
             const hex = data.split(' ').slice(2).join('');
             const value = parseInt(hex, 16) / 100;
             setLiveData(d => ({...d, maf: parseFloat(value.toFixed(2))}));
        } else if (data.startsWith('41 06')) { // STFT
            const hex = data.split(' ')[2];
            const value = (parseInt(hex, 16) - 128) * 100 / 128;
            setLiveData(d => ({...d, stft: parseFloat(value.toFixed(2))}));
        } else if (data.startsWith('41 07')) { // LTFT
            const hex = data.split(' ')[2];
            const value = (parseInt(hex, 16) - 128) * 100 / 128;
            setLiveData(d => ({...d, ltft: parseFloat(value.toFixed(2))}));
        } else if (data.startsWith('43')) { // DTC
            // Basic DTC decoder for one frame
            const frames = data.replace(/43 /g, '').split(' ');
            const dtcs: string[] = [];
            for (let i = 0; i < frames.length; i += 2) {
                const byte1 = parseInt(frames[i], 16);
                if (byte1 === 0) continue;
                const firstChar = ['P', 'C', 'B', 'U'][(byte1 & 0xC0) >> 6];
                const secondChar = ((byte1 & 0x30) >> 4).toString();
                const thirdChar = (byte1 & 0x0F).toString(16).toUpperCase();
                const fourthAndFifth = frames[i+1].toUpperCase();
                dtcs.push(`${firstChar}${secondChar}${thirdChar}${fourthAndFifth}`);
            }
            setLiveData(d => ({...d, dtc: Array.from(new Set([...d.dtc, ...dtcs]))}));
        } else if(data.startsWith('0902')) {
            // VIN handling logic here if needed
        }
    };

    const status = await elmServiceRef.current.connect();
    if (status === 'success') {
        setIsConnected(true);
        liveIntervalRef.current = setInterval(() => {
            if (!elmServiceRef.current) return;
            elmServiceRef.current.send('010C'); // RPM
            elmServiceRef.current.send('010D'); // Speed
            elmServiceRef.current.send('0105'); // ECT
            elmServiceRef.current.send('0110'); // MAF
            elmServiceRef.current.send('0106'); // STFT B1
            elmServiceRef.current.send('0107'); // LTFT B1
            
            dtcCheckCounterRef.current++;
            if(dtcCheckCounterRef.current % 5 === 0) { // Check DTC every 5 cycles
                 elmServiceRef.current.send('03');
            }

        }, 1000);
    }
    setIsConnecting(false);
  }, []);
  
  const handleDisconnect = () => elmServiceRef.current?.disconnect();

  const handleGetVIN = () => {
      addLog("Cihazdan VIN isteniyor...");
      elmServiceRef.current?.getVIN();
  };

  const handleIdentifyByVIN = async () => {
    if (!vin) return;
    setIsResolving(true);
    setError(null);
    try {
        const result = await resolveVehicleByVIN(vin);
        if (result.status === 'ok' && result.vehicle) {
            setLogoError(false); // Reset logo error on successful identification
            setVehicleProfile(result.vehicle);
            setSelections({
                make: result.make || '',
                model: result.model || '',
                year: result.year?.toString() || '',
                spec: '',
            });
            addLog(`Araç tanımlandı: ${result.make} ${result.model} ${result.year}`);
        } else {
            throw new Error(`VIN çözümlenemedi: ${result.status}`);
        }
    } catch (e: any) {
        setError(e.message);
        addLog(`Hata: ${e.message}`);
    }
    setIsResolving(false);
  };
  
   const handleAnalyze = async () => {
        setIsLoading(true);
        setAnalysisResult('');
        setError(null);
        try {
            const vehicleData: Partial<VehicleData> = {
                make: vehicleProfile?.make || selections.make,
                model: vehicleProfile?.model || selections.model,
                year: (vehicleProfile?.year || selections.year).toString(),
                vin: vin,
            };
            const rawDataLog = `DTCs: ${liveData.dtc.join(', ') || 'None'}, RPM: ${liveData.rpm}, Speed: ${liveData.speed}, ECT: ${liveData.ect}, MAF: ${liveData.maf}, LTFT: ${liveData.ltft}, STFT: ${liveData.stft}`;
            const result = await analyzeObdData(vehicleData, rawDataLog);
            setAnalysisResult(result);
        } catch (e: any) {
            setError(e.message);
        }
        setIsLoading(false);
    };
    
    const handleDtcLookup = async () => {
        if (!dtcLookupCode) return;
        setIsLookingUpDtc(true);
        setDtcLookupResult('');
        setDtcLookupError(null);
        try {
            const result = await lookupDtcCode(dtcLookupCode);
            setDtcLookupResult(result);
        } catch (e: any) {
            setDtcLookupError(e.message);
        }
        setIsLookingUpDtc(false);
    };

  // Effects for data fetching
    useEffect(() => {
        setVehicleDataLoading(true);
        setVehicleDataError(null);
        getMakes().then(makes => {
            setUiOptions(prev => ({...prev, makes}));
            if (makes.length === 0) {
                setVehicleDataError("Araç marka listesi yüklenemedi. Lütfen internet bağlantınızı kontrol edin veya sunucu yapılandırmasını doğrulayın.");
            }
        }).catch(err => {
            console.error("Araç markaları yüklenirken hata oluştu:", err);
            setVehicleDataError("Araç markaları yüklenirken beklenmedik bir hata oluştu.");
        }).finally(() => {
            setVehicleDataLoading(false);
        });
    }, []);

  useEffect(() => { if (selections.make) getModelsForMake(selections.make).then(models => setUiOptions(prev => ({...prev, models, years: [], specs: []}))); }, [selections.make]);
  useEffect(() => { if (selections.model) getYearsForModel(selections.make, selections.model).then(years => setUiOptions(prev => ({...prev, years, specs: []}))); }, [selections.make, selections.model]);
  useEffect(() => { if (selections.year) getSpecsForYear(selections.make, selections.model, parseInt(selections.year)).then(specs => setUiOptions(prev => ({...prev, specs}))); }, [selections.make, selections.model, selections.year]);
  
  useEffect(() => {
    if (selections.make) {
        setLogoError(false);
    }
  }, [selections.make]);

  const CurrentView = () => {
      switch (activeView) {
          case 'live': return <LiveDashboardView liveData={liveData} vehicleProfile={vehicleProfile} selectedMake={selections.make} logoError={logoError} onLogoError={() => setLogoError(true)} />;
          case 'config': return <ConfigView selections={selections} setSelections={setSelections} uiOptions={uiOptions} vin={vin} setVin={setVin} isConnected={isConnected} isConnecting={isConnecting} handleConnect={handleConnect} handleDisconnect={handleDisconnect} handleIdentifyByVIN={handleIdentifyByVIN} handleGetVIN={handleGetVIN} vehicleDataLoading={vehicleDataLoading} vehicleDataError={vehicleDataError} />;
          case 'report': return <ReportView analysisResult={analysisResult} isLoading={isLoading} rawLog={rawLog} dtcLookupCode={dtcLookupCode} setDtcLookupCode={setDtcLookupCode} dtcLookupResult={dtcLookupResult} isLookingUpDtc={isLookingUpDtc} dtcLookupError={dtcLookupError} handleDtcLookup={handleDtcLookup} handleAnalyze={handleAnalyze}/>;
          default: return null;
      }
  }

  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto bg-brand-dark overflow-hidden">
      <main className="flex-1 overflow-y-auto">
        <CurrentView />
      </main>
      <footer className="w-full bg-brand-surface-glass border-t border-brand-border backdrop-blur-md">
        <nav className="flex justify-around items-center p-2">
            <IconButton icon={<CarIcon className="w-6 h-6" />} label="Araç" onClick={() => setActiveView('live')} active={activeView === 'live'} />
            <IconButton icon={<WrenchIcon className="w-6 h-6" />} label="Kontrol" onClick={() => setActiveView('config')} active={activeView === 'config'} />
            <IconButton icon={<InfoIcon className="w-6 h-6" />} label="Rapor" onClick={() => setActiveView('report')} active={activeView === 'report'} />
        </nav>
      </footer>
    </div>
  );
};

export default App;