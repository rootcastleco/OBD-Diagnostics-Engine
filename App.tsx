
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { VehicleData, LiveData, ResolvedVehicleData, RootcastleResponse, VehicleProfile } from './types';
import { analyzeObdData } from './services/geminiService';
import { ELM327Service } from './services/elmService';
import { getMakes, getModelsForMake, getYearsForModel, getOptionsForYear, resolveVehicleInfo } from './services/vehicleDataService';
import { EngineIcon, WrenchIcon, CarIcon, BoltIcon, InfoIcon, BluetoothIcon, VehicleSearchIcon, TransmissionIcon } from './components/icons';

const LiveValue: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between items-baseline bg-brand-dark/50 p-2 rounded">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="font-mono text-lg text-brand-blue">{value} <span className="text-xs text-gray-500">{unit}</span></span>
  </div>
);

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [selections, setSelections] = useState({ make: '', model: '', year: '', engine: '', trim: '' });
  const [vin, setVin] = useState('');
  
  const [uiOptions, setUiOptions] = useState({ makes: [] as string[], models: [] as string[], years: [] as number[], engines: [] as any[], trims: [] as string[] });
  const [vehicleProfile, setVehicleProfile] = useState<VehicleProfile | null>(null);

  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [liveData, setLiveData] = useState<LiveData>({ rpm: 'N/A', speed: 'N/A', maf: 'N/A', ltft: 'N/A', stft: 'N/A', ect: 'N/A', dtc: [] });
  const [rawLog, setRawLog] = useState<string[]>(['Welcome to Rootcastle Pilot AI. Connect to a vehicle to begin.']);

  const elmServiceRef = useRef<ELM327Service | null>(null);
  const liveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const vinBufferRef = useRef<Record<string, string>>({});

  // --- DATA FETCHING & LOGIC ---
  const log = useCallback((message: string) => {
    setRawLog(prev => [...prev.slice(-100), message]);
    setTimeout(() => {
        consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, []);

  useEffect(() => {
    const fetchMakes = async () => {
        const makes = await getMakes();
        setUiOptions(prev => ({...prev, makes}));
    };
    fetchMakes();
  }, []);

  useEffect(() => {
    if (selections.make) {
        const fetchModels = async () => {
            const models = await getModelsForMake(selections.make);
            setUiOptions(prev => ({...prev, models, years: [], engines: [], trims: []}));
            setSelections(s => ({...s, model: '', year: '', engine: '', trim: ''}));
            setVehicleProfile(null);
        };
        fetchModels();
    }
  }, [selections.make]);
  
  useEffect(() => {
    if (selections.make && selections.model) {
        const fetchYears = async () => {
            const years = await getYearsForModel(selections.make, selections.model);
            setUiOptions(prev => ({...prev, years, engines: [], trims: []}));
            setSelections(s => ({...s, year: '', engine: '', trim: ''}));
            setVehicleProfile(null);
        };
        fetchYears();
    }
  }, [selections.make, selections.model]);

  useEffect(() => {
    if (selections.make && selections.model && selections.year) {
        const fetchOptions = async () => {
            const { engines, trims } = await getOptionsForYear(selections.make, selections.model, parseInt(selections.year, 10));
            setUiOptions(prev => ({...prev, engines, trims}));
            setSelections(s => ({...s, engine: '', trim: ''}));
            setVehicleProfile(null);
        }
        fetchOptions();
    }
  }, [selections.make, selections.model, selections.year]);

  const handleSelectionChange = (field: keyof typeof selections, value: string) => {
      setSelections(prev => ({...prev, [field]: value}));
  };

  const handleResolveVehicle = async () => {
    setIsResolving(true);
    setError(null);
    try {
        const data: Partial<VehicleData> = { ...selections, vin, year: selections.year.toString() };
        const result: RootcastleResponse = await resolveVehicleInfo(data);
        setVehicleProfile(result.vehicle);
        // Sync selections with resolved data
        setSelections({
            make: result.vehicle.make,
            model: result.vehicle.model,
            year: result.vehicle.year.toString(),
            engine: `${result.vehicle.engine.volume_cc}cc ${result.vehicle.engine.power_hp}hp`,
            trim: result.vehicle.trim
        });
        setVin(vin || result.vehicle.vin || '');
    } catch (err) {
        setError((err as Error).message);
        setVehicleProfile(null);
    } finally {
        setIsResolving(false);
    }
  };

  const hexToAscii = (hexStr: string) => {
    let asciiStr = '';
    for (let i = 0; i < hexStr.length; i += 2) {
        asciiStr += String.fromCharCode(parseInt(hexStr.substr(i, 2), 16));
    }
    return asciiStr;
  };

  const parsePIDResponse = useCallback((dataString: string) => {
    const cleanData = dataString.replace(/\s/g, '').toUpperCase();
    
    if (cleanData.startsWith('4902')) { 
      const frameIndex = cleanData.substring(4, 6);
      const vinPart = cleanData.substring(6);
      
      vinBufferRef.current[frameIndex] = vinPart;
      log(`RX: VIN Frame ${frameIndex} received.`);

      if (Object.keys(vinBufferRef.current).length >= 2) {
          const sortedKeys = Object.keys(vinBufferRef.current).sort();
          const fullVinHex = sortedKeys.map(key => vinBufferRef.current[key]).join('');
          
          const decodedVin = hexToAscii(fullVinHex).replace(/\u0000/g, '');
          if (decodedVin.length >= 17) {
            const finalVin = decodedVin.substring(1, 18); // VIN starts from 2nd char in payload
            log(`SUCCESS: Decoded VIN: ${finalVin}`);
            setVin(finalVin);
            vinBufferRef.current = {}; 
            handleResolveVehicle(); // Automatically resolve after getting VIN
          }
      }
      return null;
    }

    if (cleanData.startsWith('41')) {
        const pid = cleanData.substring(2, 4);
        const dataBytes = cleanData.substring(4);
        const a = parseInt(dataBytes.substring(0, 2), 16);
        const b = parseInt(dataBytes.substring(2, 4), 16);

        switch (pid) {
            case '0C': return { rpm: Math.round(((a * 256) + b) / 4) };
            case '0D': return { speed: a };
            case '10': return { maf: (((a * 256) + b) / 100).toFixed(2) };
            case '07': return { ltft: ((a - 128) * 100 / 128).toFixed(2) };
            case '06': return { stft: ((a - 128) * 100 / 128).toFixed(2) };
            case '05': return { ect: a - 40 };
            default: return null;
        }
    } else if (cleanData.startsWith('43')) {
        const dtcData = cleanData.substring(2);
        const dtcs: string[] = [];
        if (dtcData.length > 0 && dtcData !== '0000') {
            for (let i = 0; i < dtcData.length; i += 4) {
                const dtcBytes = dtcData.substring(i, i + 4);
                if (dtcBytes === '0000') continue;
                const firstDigit = parseInt(dtcBytes.charAt(0), 16);
                const letter = ['P', 'C', 'B', 'U'][firstDigit >> 2];
                const code = letter + (firstDigit % 4).toString(16) + dtcBytes.substring(1);
                dtcs.push(code);
            }
        }
        return { dtc: dtcs };
    }
    return null;
  }, [log, handleResolveVehicle]);

  const startLiveMode = useCallback((service: ELM327Service) => {
      if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
      log('Starting Live Data Mode...');
      
      service.send('03');

      liveIntervalRef.current = setInterval(() => {
          service.send('010C');
          service.send('010D');
          service.send('0110');
          service.send('0107');
          service.send('0106');
          service.send('0105');
      }, 1500);
  }, [log]);
  
  const handleConnect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    const service = new ELM327Service();
    elmServiceRef.current = service;

    service.onLog = log;
    service.onData = (data) => {
        const parsed = parsePIDResponse(data);
        if (parsed) {
            setLiveData(prev => ({...prev, ...parsed}));
        }
    };
    service.onDisconnect = () => {
        if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
        setIsConnected(false);
        setIsConnecting(false);
        setLiveData({ rpm: 'N/A', speed: 'N/A', maf: 'N/A', ltft: 'N/A', stft: 'N/A', ect: 'N/A', dtc: [] });
    };

    const success = await service.connect();
    if (success) {
        setIsConnected(true);
        startLiveMode(service);
    } else {
        setError("Failed to connect to ELM327 device. Make sure it's on and in range.");
    }
    setIsConnecting(false);
  }, [log, parsePIDResponse, startLiveMode]);
  
  const handleDisconnect = useCallback(() => {
    log('Disconnecting...');
    elmServiceRef.current?.disconnect();
  }, [log]);

  const handleGetVin = () => {
    if (elmServiceRef.current) {
        log("Requesting VIN from vehicle (Mode 09, PID 02)...");
        vinBufferRef.current = {};
        elmServiceRef.current.getVIN();
    }
  };
  
  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult('');

    let rawData = `DTCs: ${liveData.dtc.join(', ') || 'None'}\n`;
    rawData += Object.entries(liveData)
      .filter(([key]) => key !== 'dtc')
      .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
      .join('\n');
      
    if (rawData.trim() === 'DTCs: None') {
        setError('No live data available to analyze. Please connect to a vehicle first.');
        setIsLoading(false);
        return;
    }

    try {
      const vehicleInfoForAI: Partial<VehicleData> = vehicleProfile ? {
        vin: vin,
        make: vehicleProfile.make,
        model: `${vehicleProfile.model} (${vehicleProfile.trim})`,
        year: vehicleProfile.year.toString(),
        fuel: `${vehicleProfile.engine.fuel} (${vehicleProfile.engine.volume_cc}cc, ${vehicleProfile.engine.power_hp}HP)`
      } : { ...selections, vin };

      const result = await analyzeObdData(vehicleInfoForAI, rawData);
      setAnalysisResult(result);
    } catch (err) {
      setError('An error occurred during analysis. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [selections, liveData, vehicleProfile, vin]);

  const renderAnalysis = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('📌')) return <h2 key={index} className="text-xl font-bold text-brand-blue mt-6 mb-2 flex items-center"><CarIcon className="w-6 h-6 mr-2 shrink-0" />{line.substring(1).trim()}</h2>;
      if (line.startsWith('🔍')) return <h3 key={index} className="text-lg font-semibold text-gray-200 mt-4 mb-1 flex items-center"><InfoIcon className="w-5 h-5 mr-2 shrink-0" />{line.substring(1).trim()}</h3>;
      if (line.startsWith('🎯')) return <h3 key={index} className="text-lg font-semibold text-gray-200 mt-4 mb-1 flex items-center"><EngineIcon className="w-5 h-5 mr-2 shrink-0" />{line.substring(1).trim()}</h3>;
      if (line.startsWith('🛑')) {
        const urgency = line.substring(1).trim();
        let color = 'text-green-400';
        if (urgency.includes('Orta')) color = 'text-yellow-400';
        if (urgency.includes('Acil')) color = 'text-red-500';
        return <h3 key={index} className={`text-lg font-semibold ${color} mt-4 mb-1 flex items-center`}><BoltIcon className="w-5 h-5 mr-2 shrink-0" />{urgency}</h3>;
      }
      if (line.startsWith('📡') || line.startsWith('🔧')) return <h3 key={index} className="text-lg font-semibold text-gray-200 mt-4 mb-1 flex items-center"><WrenchIcon className="w-5 h-5 mr-2 shrink-0" />{line.substring(1).trim()}</h3>;
      if (line.startsWith('1.') || line.startsWith('2.') || line.startsWith('3.') || line.startsWith('-') || line.startsWith('→') || line.startsWith('🧪')) return <p key={index} className="text-gray-400 ml-4">{line}</p>;
      if(line.trim() === '') return <br key={index} />;
      return <p key={index} className="text-gray-300">{line}</p>;
    });
  };

  const selectClasses = "w-full bg-brand-gray border border-brand-light-gray rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-blue";

  return (
    <div className="bg-[#0E121A] min-h-screen text-gray-200 flex font-sans overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className="w-80 bg-[#111827] p-4 flex flex-col border-r border-gray-700/50">
        <header className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-white">Rootcastle</h1>
            <p className="text-sm text-brand-blue">Pilot AI</p>
        </header>
        {isConnected ? (
             <button onClick={handleDisconnect} className="w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
                <BluetoothIcon className="w-5 h-5 mr-2"/> Disconnect
            </button>
        ) : (
            <button onClick={handleConnect} disabled={isConnecting} className="w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500 transition-colors">
                 {isConnecting ? <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                 : <BluetoothIcon className="w-5 h-5 mr-2"/>}
                {isConnecting ? 'Connecting...' : 'Connect ELM327'}
            </button>
        )}
        <div className={`mt-2 text-center text-sm ${isConnected ? 'text-green-400' : 'text-gray-500'}`}>{isConnected ? 'Connected' : 'Disconnected'}</div>

        {vehicleProfile && (
            <div className='mt-6 border-t border-gray-700 pt-4'>
                <h3 className="text-lg font-semibold mb-3 text-center">{vehicleProfile.make} {vehicleProfile.model}</h3>
                <p className="text-sm text-gray-400 text-center mb-3">{vehicleProfile.year} - {vehicleProfile.trim}</p>
                <img src={vehicleProfile.image_url} alt={`${vehicleProfile.make} ${vehicleProfile.model}`} className="rounded-lg mb-4 w-full h-auto object-cover"/>
                <div className="space-y-2 text-sm">
                    <LiveValue label="Engine" value={`${vehicleProfile.engine.volume_cc}cc ${vehicleProfile.engine.power_hp}hp`} />
                    <LiveValue label="Aspiration" value={vehicleProfile.engine.aspiration} />
                    <LiveValue label="0-100km/h" value={vehicleProfile.technical_specs.acceleration_0_100} unit="s" />
                    <LiveValue label="Top Speed" value={vehicleProfile.technical_specs.top_speed} unit="km/h" />
                    <LiveValue label="Transmission" value={`${vehicleProfile.transmission.type} ${vehicleProfile.transmission.gears}`} />
                </div>
            </div>
        )}
        <div className='flex-grow'></div>
        <div>
            <h3 className="text-lg font-semibold mt-6 border-b border-gray-700 pb-1 mb-3">Live Data</h3>
            <div className="space-y-2">
                <LiveValue label="RPM" value={liveData.rpm} />
                <LiveValue label="Speed" value={liveData.speed} unit="km/h" />
                <LiveValue label="Coolant" value={liveData.ect} unit="°C" />
            </div>
            <div className="mt-4">
                <h4 className="text-sm text-gray-400">DTCs Found:</h4>
                <div className="font-mono text-yellow-400 text-center p-2 bg-brand-dark/50 rounded mt-1">
                    {liveData.dtc.length > 0 ? liveData.dtc.join(', ') : 'None'}
                </div>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 flex flex-col">
        <div className='flex justify-between items-center mb-4'>
            <h2 className="text-2xl font-semibold text-white">Vehicle Configuration</h2>
            <div className="flex items-center space-x-2">
                <button onClick={handleGetVin} disabled={!isConnected} className="flex items-center py-2 px-3 rounded-md text-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                    <CarIcon className="w-4 h-4 mr-2"/>
                    Get VIN from Vehicle
                </button>
                <button onClick={handleResolveVehicle} disabled={isResolving || !selections.trim} className="flex items-center py-2 px-3 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 transition-colors">
                    {isResolving ? <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                    : <VehicleSearchIcon className="w-4 h-4 mr-2"/>}
                    {isResolving ? 'Identifying...' : 'Identify Vehicle'}
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
           <input type="text" placeholder="VIN (Vehicle Identification Number)" value={vin} onChange={e => setVin(e.target.value)} className="bg-brand-gray border border-brand-light-gray rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-blue font-mono"/>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <select value={selections.make} onChange={e => handleSelectionChange('make', e.target.value)} className={selectClasses}>
                <option value="">Select Make</option>
                {uiOptions.makes.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={selections.model} onChange={e => handleSelectionChange('model', e.target.value)} className={selectClasses} disabled={!selections.make}>
                <option value="">Select Model</option>
                {uiOptions.models.map(m => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={selections.year} onChange={e => handleSelectionChange('year', e.target.value)} className={selectClasses} disabled={!selections.model}>
                <option value="">Select Year</option>
                {uiOptions.years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
             <select value={selections.engine} onChange={e => handleSelectionChange('engine', e.target.value)} className={selectClasses} disabled={!selections.year}>
                <option value="">Select Engine</option>
                {uiOptions.engines.map(e => <option key={e.engine} value={e.engine}>{`${e.engine} (${e.fuel})`}</option>)}
            </select>
             <select value={selections.trim} onChange={e => handleSelectionChange('trim', e.target.value)} className={selectClasses} disabled={!selections.engine}>
                <option value="">Select Trim</option>
                {uiOptions.trims.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-white">ELM327 Console</h2>
        <div ref={consoleRef} className="bg-black/40 p-4 rounded-lg h-80 flex-grow font-mono text-sm overflow-y-auto border border-gray-700/50">
            {rawLog.map((line, index) => <div key={index} className={line.startsWith('TX:') ? 'text-cyan-400' : line.startsWith('RX:') ? 'text-lime-400' : 'text-gray-500'}>{line}</div>)}
        </div>
        <button onClick={handleAnalysis} disabled={isLoading || !isConnected} className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-brand-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-brand-light-gray disabled:cursor-not-allowed transition-colors">
            {isLoading ? 'Analyzing...' : 'Analyze Live Data with AI'}
        </button>
      </main>

      {/* RIGHT SIDEBAR (AI REPORT) */}
      <aside className="w-[480px] bg-[#111827] p-4 flex flex-col border-l border-gray-700/50">
        <h2 className="text-2xl font-semibold text-white border-b-2 border-brand-blue pb-2 mb-2 shrink-0">AI Diagnostic Report</h2>
        <div className="flex-grow overflow-y-auto pr-2">
            {error && <div className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</div>}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg className="animate-spin h-8 w-8 text-brand-blue mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p>AI is analyzing vehicle data...</p>
              </div>
            )}
            {!isLoading && !analysisResult && !error && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <EngineIcon className="w-12 h-12 mb-4"/>
                <p>Your diagnostic report will appear here.</p>
                <p className="text-sm">Connect to a vehicle and press "Analyze Live Data".</p>
              </div>
            )}
            {analysisResult && (
              <div className="prose prose-invert max-w-none text-sm">
                {renderAnalysis(analysisResult)}
              </div>
            )}
        </div>
      </aside>
    </div>
  );
};

export default App;
