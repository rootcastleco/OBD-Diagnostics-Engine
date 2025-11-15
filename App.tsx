
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { VehicleData, LiveData, VehicleProfile } from './types';
import { analyzeObdData } from './services/geminiService';
import { ELM327Service } from './services/elmService';
import { resolveVehicleByVIN, resolveVehicleManually } from './services/vinService';
import { EngineIcon, WrenchIcon, CarIcon, BoltIcon, InfoIcon, BluetoothIcon, VehicleSearchIcon } from './components/icons';

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUAAAAPACAYAAAB/Y4w6AAAF4UlEQVR4nO3d4XHTMBSG4bcy2xkgE5BNUCZgA5QJUCZgmAAmCZgEwASYAG9JgL+h42kkyZPk/x2fPRLJW0s+XpZt24Jb/B4AAEBgCQQkIAEJSEACEnALb+9vX/6i/H0A4H/LbduW3CAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCDA3/gP8P0d/b8LCEgAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCABCUhAAhKQgAQkIMBbeL9+/v57+P64b27f/vAAwP+W27YlNwhIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCCAv/Ef4Ps7+n8XEJCAAAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEnB7eX4/vj99+uP3s+f983l+P3/K78+f48d3n+e329u3z/t3AECg8hL49fM9v334/Pl2u11vby/j+/v7Lp/n9vZm3+324/P23t6/z/fnz3k/P35+vP+fH395Pj+/3f8HAECg/gIPDAgCEpCABCQggW/g5w8P+Pj8/Pz3eX6/vx+/v38/n19/3+/vj+/P+Hl+v3++v79/vj9/vr/4/QECgSr89v6e327/9vmc3++3t7eX8fb2drvdbsft9vt8fn6b3+/xeHw/n59x+/3j8fiP3x8AAKgQeGBAEJCAAAQkIAEJ+A08v7+n+fXt7eX4+vr6/ffz/H5/35/v7+/n+P39/Tq/PwACRfgFnhgQBCQgAQlIQAISkIAEfi8gIAMSkIAEJCABCUhAAhKQgAQlIAEJSEACEpCAAAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEnBb2Lbt1t7eXj4/P+/p/f19T2/v9vHx+H3v+PHx+PXr9/eP3x8AAB/gDwIJSAC/hA/wPz9+e3t7e4+Pj/v8/HxeX1/39fV1T0/v+Xx+/fj06T0+Pr7Hx8f9+PFxfn67p6fH5+fn9fb2vsePHz/u3//8AQBQIfDAgCAgAQkISEACEpCAX8D19XVPb2/v6empra2tvb29/f33169fX758+fz58+fPnz9+/Pjx48ePn5+fn5+f9/X19ePHj3t7e/v48ePevn37/Pnzvr6+/vz5s7e3t7e3t7e3t6+vr2trc58/f/78+fPevn379evXr1+/fvx+f3+/P78/AACK8AseGBAEJCAgAQlIQAISkIAE/JdAQAYkIAEJSEACEpCABCQgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCABCUhAAv/P8A/w/R39vwsISEACEpCABCQgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCABCUhAAhKQgAQkIAEJSEACEpCABCQgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCAgAQlIQAISkIAEJCABCUhAAv//gQAEJPAGvgEAAAAASUVORK5CYII=';

const LiveValue: React.FC<{ label: string; value: string | number; unit?: string }> = ({ label, value, unit }) => (
  <div className="flex justify-between items-baseline bg-brand-dark/50 p-2 rounded">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="font-mono text-lg text-brand-blue">{value} <span className="text-xs text-gray-500">{unit}</span></span>
  </div>
);

type MobileView = 'live' | 'config' | 'report';

const App: React.FC = () => {
  // --- STATE MANAGEMENT ---
  const [selections, setSelections] = useState({ make: '', model: '', year: '', engine: '', trim: '' });
  const [vin, setVin] = useState('');
  
  const [vehicleProfile, setVehicleProfile] = useState<VehicleProfile | null>(null);

  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResolving, setIsResolving] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [liveData, setLiveData] = useState<LiveData>({ rpm: 'N/A', speed: 'N/A', maf: 'N/A', ltft: 'N/A', stft: 'N/A', ect: 'N/A', dtc: [] });
  const [rawLog, setRawLog] = useState<string[]>(["Rootcastle Pilot AI'ya hoş geldiniz. Başlamak için bir araca bağlanın."]);
  const [activeView, setActiveView] = useState<MobileView>('config');


  const elmServiceRef = useRef<ELM327Service | null>(null);
  const liveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const consoleRef = useRef<HTMLDivElement>(null);
  const vinBufferRef = useRef<Record<string, string>>({});
  const dtcCheckCounterRef = useRef(0);
  
  // --- DATA FETCHING & LOGIC ---
  const log = useCallback((message: string) => {
    setRawLog(prev => [...prev.slice(-100), message]);
    setTimeout(() => {
        consoleRef.current?.scrollTo({ top: consoleRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  }, []);

  const handleSelectionChange = (field: keyof typeof selections, value: string) => {
      setSelections(prev => ({...prev, [field]: value}));
  };

  const handleResolveVehicle = async () => {
    setIsResolving(true);
    setError(null);
    
    try {
        let profile: VehicleProfile | null = null;
        let wasVinLookup = false;

        if (selections.make && selections.model && selections.year && selections.engine && selections.trim) {
            profile = await resolveVehicleManually(
                selections.make, 
                selections.model, 
                parseInt(selections.year, 10), 
                selections.engine, 
                selections.trim
            );
            if (profile && vin.trim().length >= 17) {
                profile.vin = vin;
            }
        } 
        else if (vin.trim().length >= 17) {
            wasVinLookup = true;
            const result = await resolveVehicleByVIN(vin);
            if (result.status === "ok") {
                profile = result as VehicleProfile;
            } else {
                 setError(`Araç ${result.make} ${result.model} ${result.year} olarak tanındı, ancak TR veritabanında detay bulunamadı. Lütfen motor ve donanım bilgilerini manuel olarak girerek devam edin.`);
                 profile = { make: result.make, model: result.model, year: result.year, vin: result.vin } as Partial<VehicleProfile> as VehicleProfile;
            }
        } 
        else {
             throw new Error("Aracı tanımlamak için lütfen 17 haneli VIN girin veya tüm alanları manuel olarak girin.");
        }

        if (profile) {
            setVehicleProfile(profile);

            if (wasVinLookup) {
                 setSelections({
                     make: profile.make,
                     model: profile.model,
                     year: profile.year.toString(),
                     engine: profile.engine ? `${profile.engine.volume_cc}cc ${profile.engine.power_hp}hp` : '',
                     trim: profile.trim || ''
                 });
                 if (profile.vin) setVin(profile.vin);
            }
        }
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
      log(`RX: VIN Çerçevesi ${frameIndex} alındı.`);

      if (Object.keys(vinBufferRef.current).length >= 2) {
          const sortedKeys = Object.keys(vinBufferRef.current).sort();
          const fullVinHex = sortedKeys.map(key => vinBufferRef.current[key]).join('');
          
          const decodedVin = hexToAscii(fullVinHex).replace(/\u0000/g, '');
          if (decodedVin.length >= 17) {
            const finalVin = decodedVin.substring(1, 18); // VIN starts from 2nd char in payload
            log(`BAŞARILI: VIN çözüldü: ${finalVin}`);
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
  }, [log]);

  const startLiveMode = useCallback((service: ELM327Service) => {
      if (liveIntervalRef.current) clearInterval(liveIntervalRef.current);
      log('Canlı Veri Modu başlatılıyor...');
      
      log('İlk DTC taraması yapılıyor...');
      service.send('03');
      dtcCheckCounterRef.current = 0;

      liveIntervalRef.current = setInterval(() => {
          service.send('010C');
          service.send('010D');
          service.send('0110');
          service.send('0107');
          service.send('0106');
          service.send('0105');
          
          dtcCheckCounterRef.current += 1;
          if (dtcCheckCounterRef.current >= 10) { // Approx every 15 seconds
              log('Periyodik DTC taraması yapılıyor...');
              service.send('03');
              dtcCheckCounterRef.current = 0;
          }
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
        setError("ELM327 cihazına bağlanılamadı. Cihazın açık ve menzilde olduğundan emin olun.");
    }
    setIsConnecting(false);
  }, [log, parsePIDResponse, startLiveMode]);
  
  const handleDisconnect = useCallback(() => {
    log('Bağlantı kesiliyor...');
    elmServiceRef.current?.disconnect();
  }, [log]);

  const handleGetVin = () => {
    if (elmServiceRef.current) {
        log("Araçtan VIN isteniyor (Mod 09, PID 02)...");
        vinBufferRef.current = {};
        elmServiceRef.current.getVIN();
    }
  };
  
  const handleAnalysis = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult('');
    setActiveView('report');

    let rawData = `DTCs: ${liveData.dtc.join(', ') || 'Yok'}\n`;
    rawData += Object.entries(liveData)
      .filter(([key]) => key !== 'dtc')
      .map(([key, value]) => `${key.toUpperCase()}: ${value}`)
      .join('\n');
      
    if (rawData.trim() === 'DTCs: Yok') {
        setError('Analiz edilecek canlı veri yok. Lütfen önce bir araca bağlanın.');
        setIsLoading(false);
        return;
    }

    try {
      const vehicleInfoForAI: Partial<VehicleData> = vehicleProfile ? {
        vin: vin,
        make: vehicleProfile.make,
        model: `${vehicleProfile.model} (${vehicleProfile.trim})`,
        year: vehicleProfile.year.toString(),
        fuel: vehicleProfile.engine ? `${vehicleProfile.engine.fuel} (${vehicleProfile.engine.volume_cc}cc, ${vehicleProfile.engine.power_hp}HP)` : 'Bilinmiyor'
      } : { ...selections, vin };

      const result = await analyzeObdData(vehicleInfoForAI, rawData);
      setAnalysisResult(result);
    } catch (err) {
      setError('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
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

  const inputClasses = "w-full bg-brand-gray border border-brand-light-gray rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-blue";

  const BottomNavBar = () => (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#111827] border-t border-gray-700/50 flex justify-around items-center p-2 z-10">
      <button onClick={() => setActiveView('live')} className={`flex flex-col items-center space-y-1 ${activeView === 'live' ? 'text-brand-blue' : 'text-gray-400'}`}>
        <CarIcon className="w-6 h-6"/>
        <span className="text-xs">Araç</span>
      </button>
      <button onClick={() => setActiveView('config')} className={`flex flex-col items-center space-y-1 ${activeView === 'config' ? 'text-brand-blue' : 'text-gray-400'}`}>
        <WrenchIcon className="w-6 h-6"/>
        <span className="text-xs">Kontrol</span>
      </button>
      <button onClick={() => setActiveView('report')} className={`flex flex-col items-center space-y-1 ${activeView === 'report' ? 'text-brand-blue' : 'text-gray-400'}`}>
        <InfoIcon className="w-6 h-6"/>
        <span className="text-xs">Rapor</span>
      </button>
    </nav>
  );

  return (
    <div className="bg-[#0E121A] min-h-screen text-gray-200 flex flex-col md:flex-row font-sans h-screen overflow-hidden">
      {/* LEFT SIDEBAR */}
      <aside className={`w-full md:w-80 bg-[#111827] p-4 flex-col border-r border-gray-700/50 overflow-y-auto pb-20 md:pb-4 ${activeView === 'live' ? 'flex' : 'hidden'} md:flex`}>
        <header className="mb-6 flex items-center justify-start md:justify-center space-x-3">
          <img src={logoBase64} alt="Rootcastle Pilot AI Logo" className="w-10 h-10" />
          <div className='text-left md:text-center'>
            <h1 className="text-2xl font-bold text-white leading-tight">Rootcastle</h1>
            <p className="text-sm text-brand-blue leading-tight">Pilot AI</p>
          </div>
        </header>
        {isConnected ? (
             <button onClick={handleDisconnect} className="w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors">
                <BluetoothIcon className="w-5 h-5 mr-2"/> Bağlantıyı Kes
            </button>
        ) : (
            <button onClick={handleConnect} disabled={isConnecting} className="w-full flex justify-center items-center py-2 px-4 rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-500 transition-colors">
                 {isConnecting ? <svg className="animate-spin mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                 : <BluetoothIcon className="w-5 h-5 mr-2"/>}
                {isConnecting ? 'Bağlanılıyor...' : "ELM327'ye Bağlan"}
            </button>
        )}
        <div className={`mt-2 text-center text-sm ${isConnected ? 'text-green-400' : 'text-gray-500'}`}>{isConnected ? 'Bağlı' : 'Bağlantı Yok'}</div>

        {vehicleProfile && vehicleProfile.engine && (
            <div className='mt-6 border-t border-gray-700 pt-4'>
                <h3 className="text-lg font-semibold mb-3 text-center">{vehicleProfile.make} {vehicleProfile.model}</h3>
                <p className="text-sm text-gray-400 text-center mb-3">{vehicleProfile.year} - {vehicleProfile.trim}</p>
                {vehicleProfile.image_url && <img src={vehicleProfile.image_url} alt={`${vehicleProfile.make} ${vehicleProfile.model}`} className="rounded-lg mb-4 w-full h-auto object-cover"/>}
                <div className="space-y-2 text-sm">
                    <LiveValue label="Motor" value={`${vehicleProfile.engine.volume_cc}cc ${vehicleProfile.engine.power_hp}hp`} />
                    <LiveValue label="Aspirasyon" value={vehicleProfile.engine.aspiration} />
                    <LiveValue label="0-100km/s" value={vehicleProfile.technical_specs.acceleration_0_100} unit="s" />
                    <LiveValue label="Maks. Hız" value={vehicleProfile.technical_specs.top_speed} unit="km/h" />
                    <LiveValue label="Şanzıman" value={`${vehicleProfile.transmission.type} ${vehicleProfile.transmission.gears}`} />
                </div>
            </div>
        )}
        <div className='flex-grow'></div>
        <div>
            <h3 className="text-lg font-semibold mt-6 border-b border-gray-700 pb-1 mb-3">Canlı Veri</h3>
            <div className="space-y-2">
                <LiveValue label="Devir" value={liveData.rpm} />
                <LiveValue label="Hız" value={liveData.speed} unit="km/h" />
                <LiveValue label="Soğutma Suyu" value={liveData.ect} unit="°C" />
                <LiveValue label="Hava Akışı (MAF)" value={liveData.maf} unit="g/s" />
                <LiveValue label="STFT B1" value={liveData.stft} unit="%" />
                <LiveValue label="LTFT B1" value={liveData.ltft} unit="%" />
            </div>
            <div className="mt-4">
                <h4 className="text-sm text-gray-400">Bulunan Hata Kodları:</h4>
                <div className="font-mono text-yellow-400 text-center p-2 bg-brand-dark/50 rounded mt-1">
                    {liveData.dtc.length > 0 ? liveData.dtc.join(', ') : 'Yok'}
                </div>
            </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`flex-1 p-6 flex-col overflow-y-auto pb-20 md:pb-6 ${activeView === 'config' ? 'flex' : 'hidden'} md:flex`}>
        <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4'>
            <h2 className="text-2xl font-semibold text-white">Araç Konfigürasyonu</h2>
            <div className="flex items-center space-x-2 w-full md:w-auto">
                <button onClick={handleGetVin} disabled={!isConnected} className="flex-1 md:flex-none flex items-center justify-center py-2 px-3 rounded-md text-sm text-white bg-teal-600 hover:bg-teal-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors">
                    <CarIcon className="w-4 h-4 mr-2"/>
                    VIN'i Al
                </button>
                <button onClick={handleResolveVehicle} disabled={isResolving || (vin.trim().length < 17 && !selections.trim)} className="flex-1 md:flex-none flex items-center justify-center py-2 px-3 rounded-md text-sm text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-500 transition-colors">
                    {isResolving ? <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> 
                    : <VehicleSearchIcon className="w-4 h-4 mr-2"/>}
                    {isResolving ? 'Tanımlanıyor...' : 'Tanımla'}
                </button>
            </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-4">
           <input type="text" placeholder="VIN (Şasi Numarası) - 17 Karakter" value={vin} onChange={e => setVin(e.target.value.toUpperCase())} className="bg-brand-gray border border-brand-light-gray rounded-md py-2 px-3 text-white focus:outline-none focus:ring-1 focus:ring-brand-blue font-mono uppercase"/>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <input type="text" placeholder="Marka" value={selections.make} onChange={e => handleSelectionChange('make', e.target.value)} className={inputClasses} />
            <input type="text" placeholder="Model" value={selections.model} onChange={e => handleSelectionChange('model', e.target.value)} className={inputClasses} />
            <input type="text" placeholder="Yıl" value={selections.year} onChange={e => handleSelectionChange('year', e.target.value)} className={inputClasses} />
            <input type="text" placeholder="Motor (örn: 1598cc 120hp)" value={selections.engine} onChange={e => handleSelectionChange('engine', e.target.value)} className={inputClasses} />
            <input type="text" placeholder="Donanım" value={selections.trim} onChange={e => handleSelectionChange('trim', e.target.value)} className={inputClasses} />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-white">ELM327 Konsolu</h2>
        <div ref={consoleRef} className="bg-black/40 p-4 rounded-lg flex-grow font-mono text-sm overflow-y-auto border border-gray-700/50 min-h-[200px]">
            {rawLog.map((line, index) => <div key={index} className={line.startsWith('TX:') ? 'text-cyan-400' : line.startsWith('RX:') ? 'text-lime-400' : 'text-gray-500'}>{line}</div>)}
        </div>
        <button onClick={handleAnalysis} disabled={isLoading || !isConnected} className="w-full mt-6 flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm font-medium text-white bg-brand-blue hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-brand-light-gray disabled:cursor-not-allowed transition-colors">
            {isLoading ? 'Analiz Ediliyor...' : 'Canlı Veriyi AI ile Analiz Et'}
        </button>
      </main>

      {/* RIGHT SIDEBAR (AI REPORT) */}
      <aside className={`w-full md:w-[480px] bg-[#111827] p-4 flex-col border-l border-gray-700/50 overflow-y-auto pb-20 md:pb-4 ${activeView === 'report' ? 'flex' : 'hidden'} md:flex`}>
        <h2 className="text-2xl font-semibold text-white border-b-2 border-brand-blue pb-2 mb-2 shrink-0">Yapay Zekâ Teşhis Raporu</h2>
        <div className="flex-grow overflow-y-auto pr-2">
            {error && <div className="text-red-400 bg-red-900/30 p-3 rounded-md text-sm">{error}</div>}
            {isLoading && (
              <div className="flex flex-col items-center justify-center h-full text-gray-400">
                <svg className="animate-spin h-8 w-8 text-brand-blue mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <p>Yapay zekâ araç verilerini analiz ediyor...</p>
              </div>
            )}
            {!isLoading && !analysisResult && !error && (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 text-center">
                <EngineIcon className="w-12 h-12 mb-4"/>
                <p>Teşhis raporunuz burada görünecektir.</p>
                <p className="text-sm">Bir araca bağlanın ve "Canlı Veriyi AI ile Analiz Et" düğmesine basın.</p>
              </div>
            )}
            {analysisResult && (
              <div className="prose prose-invert max-w-none text-sm">
                {renderAnalysis(analysisResult)}
              </div>
            )}
        </div>
      </aside>
      <BottomNavBar />
    </div>
  );
};

export default App;
