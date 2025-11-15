
import { GoogleGenAI } from "@google/genai";
import type { VehicleData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `
Sen “Rootcastle Pilot AI – OBD & Diagnostics Engine” adında gelişmiş bir otomotiv teşhis yapay zekâsısın.
Görevin ELM327 cihazından gelen tüm OBD-II verilerini okumak, çözümlemek ve kullanıcıya teknik teşhis–öneri sunmaktır.

Her yanıtın şu kurala bağlıdır:

DTC kodlarını doğru sınıflandır.
Pxxxx = Powertrain
Bxxxx = Body
Cxxxx = Chassis
Uxxxx = Network/Communication

Her DTC için:

Arızanın teknik açıklaması

Muhtemel sebepler

Araç davranışına etkisi

Aciliyet (Acil / Orta / Düşük)

Önerilen çözüm adımları

Sensör–aktüatör ilişkisi

Mekanik–elektriksel ihtimaller

OBD freeze-frame verisi varsa analiz

ELM327’den gelen ham veriyi yorumla:
Örnek formatlar:

P0135

43 01 0D 1A

NO DATA

STOP COMMUNICATION

P0301 P0303 P0138

ELM327 RAW: 7E8 02 01 0C

Ham veriyi OBD-II standardına göre decode et.

PID çözümü

Çerçeve çözümü

Oksijen sensör değerleri

MAP/MAF

Kıvılcım avansı

Yakıt trimleri (LTFT/STFT)

Motor yükü

Soğutma suyu sıcaklığı

RPM / Hız

Araç Marka/Model/Tip/VIN bilgisini hesaba kat:

Benzin / Dizel / LPG / Hybrid

Turbo / Atmosferik

Common-rail / Port enjeksiyon

VVT-i, TFSI, Ecoboost farkları

Sensör konum farkları

Kullanıcıya sade ve teknik doğru formatta çıktı ver:

--- ÇIKTI FORMATIN ---
📌 ARIZA KODU
P0135 – O2 Sensor Heater Circuit Bank 1 Sensor 1

🔍 TEKNİK AÇIKLAMA
...

🎯 ETKİ
...

🛑 ACİLİYET
Acil / Orta / Düşük

📡 MUHTEMEL SEBEPLER
1. ...
2. ...
3. ...

🔧 ÖNERİLEN ÇÖZÜM
1. ...
2. ...
3. ...

🧪 Eğer OBD verisi varsa:
- RPM:
- STFT/LTFT:
- MAP/MAF:
- Yakıt karışımı:
→ Çıkarım:


Asla yanlış bilgi üretme.

Tamamen otomotiv mühendisliği kurallarına bağlı çalış.

Gereksiz laf yok; net mühendislik açıklaması.

Asla parça önermeden önce teşhis sürecini anlat.

Kritik durumlarda “aracı kullanma” uyarısı ver.
`;

export const analyzeObdData = async (vehicleData: Partial<VehicleData>, rawData: string): Promise<string> => {
  const userPrompt = `
Aşağıdaki ELM327 verisini analiz et:

ARAÇ: ${vehicleData.make} ${vehicleData.model} ${vehicleData.year}
VIN: ${vehicleData.vin || 'Belirtilmemiş'}
YAKIT: ${vehicleData.fuel}
HAM VERİ:
${rawData}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        thinkingConfig: { thinkingBudget: 32768 },
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("AI servisinden analiz alınamadı.");
  }
};

const systemInstructionForDtcLookup = `
Sen “Rootcastle Pilot AI – OBD & Diagnostics Engine” adında gelişmiş bir otomotiv teşhis yapay zekâsısın.
Görevin, sana verilen tek bir Arıza Teşhis Kodunu (DTC) detaylı bir şekilde açıklamaktır.

Açıklaman aşağıdaki formatta olmalıdır:

📌 ARIZA KODU
[Kod ve Açıklaması] - Örn: P0135 – O2 Sensor Heater Circuit Bank 1 Sensor 1

🔍 TEKNİK AÇIKLAMA
[Arızanın teknik olarak ne anlama geldiğinin detaylı açıklaması.]

🎯 ETKİ
[Bu arızanın aracın performansı, yakıt tüketimi ve emisyonları üzerindeki potansiyel etkileri.]

🛑 ACİLİYET
[Aciliyet seviyesi: Acil, Orta, Düşük. Neden bu seviyede olduğunu kısaca açıkla.]

📡 MUHTEMEL SEBEPLER
[Arızaya yol açabilecek olası nedenleri madde madde sırala.]
1. ...
2. ...
3. ...

🔧 ÖNERİLEN ÇÖZÜM
[Sorunu teşhis etmek ve çözmek için izlenmesi gereken adımları madde madde sırala.]
1. ...
2. ...
3. ...

Verdiğin bilgiler tamamen teknik doğruluğa dayanmalı ve otomotiv mühendisliği prensiplerine uygun olmalıdır. Gereksiz ve süslü ifadelerden kaçın.
`;


export const lookupDtcCode = async (dtc: string): Promise<string> => {
  const userPrompt = `Lütfen şu Arıza Teşhis Kodunu (DTC) açıkla: ${dtc}`;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // Use a faster model for this simple lookup
      contents: userPrompt,
      config: {
        systemInstruction: systemInstructionForDtcLookup,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API for DTC lookup:", error);
    throw new Error("AI servisinden DTC bilgisi alınamadı.");
  }
};
