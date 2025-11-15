
// FIX: Add minimal Web Bluetooth API type definitions to resolve TypeScript errors.
// This is necessary when @types/web-bluetooth is not available in the project.
declare global {
  interface BluetoothDevice {
    readonly id: string;
    readonly name?: string;
    readonly gatt?: BluetoothRemoteGATTServer;
    addEventListener(type: 'gattserverdisconnected', listener: (this: this, ev: Event) => any): void;
    removeEventListener(type: 'gattserverdisconnected', listener: (this: this, ev: Event) => any): void;
  }

  interface BluetoothRemoteGATTServer {
    readonly device: BluetoothDevice;
    readonly connected: boolean;
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryServices(): Promise<BluetoothRemoteGATTService[]>;
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  }

  interface BluetoothRemoteGATTService {
    readonly uuid: string;
    getCharacteristics(): Promise<BluetoothRemoteGATTCharacteristic[]>;
    getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
  }

  interface BluetoothRemoteGATTCharacteristic {
    readonly uuid: string;
    readonly properties: BluetoothCharacteristicProperties;
    startNotifications(): Promise<void>;
    stopNotifications(): Promise<void>;
    addEventListener(type: 'characteristicvaluechanged', listener: (event: any) => void): void;
    removeEventListener(type: 'characteristicvaluechanged', listener: (event: any) => void): void;
    writeValue(value: BufferSource): Promise<void>;
    writeValueWithoutResponse(value: BufferSource): Promise<void>;
  }

  interface BluetoothCharacteristicProperties {
    readonly broadcast: boolean;
    readonly read: boolean;
    readonly writeWithoutResponse: boolean;
    readonly write: boolean;
    readonly notify: boolean;
    readonly indicate: boolean;
    readonly authenticatedSignedWrites: boolean;
    readonly reliableWrite: boolean;
    readonly writableAuxiliaries: boolean;
  }
  
  interface Navigator {
    readonly bluetooth: {
      requestDevice(options?: any): Promise<BluetoothDevice>;
    };
  }
}

const ELM_SERVICE_UUIDS = [
    '0000ffe0-0000-1000-8000-00805f9b34fb', // Common non-standard
    '00001101-0000-1000-8000-00805f9b34fb'  // Standard SPP
];

export class ELM327Service {
  private device: BluetoothDevice | null = null;
  private server: BluetoothRemoteGATTServer | null = null;
  private tx: BluetoothRemoteGATTCharacteristic | null = null;
  private rx: BluetoothRemoteGATTCharacteristic | null = null;
  private commandQueue: string[] = [];
  private isSending = false;
  private decoder = new TextDecoder();

  public onData?: (data: string) => void;
  public onLog?: (log: string) => void;
  public onDisconnect?: () => void;

  async connect() {
    this.onLog?.('Bluetooth cihazı isteniyor...');
    try {
      this.device = await navigator.bluetooth.requestDevice({
        filters: [
          { namePrefix: 'OBD' },
          { namePrefix: 'V-LINK' },
          { namePrefix: 'ELM' }
        ],
        optionalServices: ELM_SERVICE_UUIDS
      });

      if (!this.device || !this.device.gatt) {
        throw new Error('Geçerli bir cihaz seçilmedi veya GATT sunucusu yok.');
      }
      
      this.onLog?.(`${this.device.name} üzerindeki GATT Sunucusuna bağlanılıyor...`);
      this.device.addEventListener('gattserverdisconnected', this.handleDisconnect);
      this.server = await this.device.gatt.connect();

      this.onLog?.('Uyumlu servis aranıyor...');
      let service: BluetoothRemoteGATTService | undefined;
      
      for(const uuid of ELM_SERVICE_UUIDS) {
        try {
            service = await this.server.getPrimaryService(uuid);
            if (service) {
                this.onLog?.(`Servis bulundu: ${uuid}`);
                break;
            }
        } catch(e) { /* Service not found, try next */ }
      }
      
      if (!service) {
        throw new Error('Uyumlu ELM327 servisi bulunamadı.');
      }

      this.onLog?.('Okuma/Yazma karakteristikleri aranıyor...');
      const characteristics = await service.getCharacteristics();
      
      this.rx = characteristics.find(c => c.properties.notify || c.properties.indicate) || null;
      this.tx = characteristics.find(c => c.properties.writeWithoutResponse || c.properties.write) || null;

      if (!this.rx || !this.tx) {
        throw new Error('Gerekli okuma/yazma karakteristiği bulunamadı.');
      }
      this.onLog?.(`RX Karakteristiği: ${this.rx.uuid}`);
      this.onLog?.(`TX Karakteristiği: ${this.tx.uuid}`);

      this.onLog?.('Bildirimler başlatılıyor...');
      await this.rx.startNotifications();
      this.rx.addEventListener("characteristicvaluechanged", this.handleData);
      this.onLog?.('Bağlantı başarılı. Cihaz başlatılıyor...');
      
      this.send('ATZ');
      this.send('ATE0');
      this.send('ATL0');
      this.send('ATSP0');
      this.send('0100');

      return true;
    } catch (error) {
      this.onLog?.(`Bağlantı başarısız: ${error}`);
      console.error(error);
      this.disconnect();
      return false;
    }
  }
  
  private handleDisconnect = () => {
      this.onLog?.('Cihaz bağlantısı kesildi.');
      if (this.device) {
        this.device.removeEventListener('gattserverdisconnected', this.handleDisconnect);
      }
      this.device = null;
      this.server = null;
      this.tx = null;
      this.rx = null;
      this.commandQueue = [];
      this.isSending = false;
      this.onDisconnect?.();
  }

  disconnect() {
      if (this.server && this.server.connected) {
          this.server.disconnect();
      } else {
         this.handleDisconnect();
      }
  }

  private handleData = (event: any) => {
    const value = this.decoder.decode(event.target.value);
    const messages = value.split('\r').filter(msg => msg.trim() !== '');
    messages.forEach(msg => {
        const cleanValue = msg.replace(/>/g, '').trim();
        if (cleanValue) {
            this.onLog?.(`RX: ${cleanValue}`);
            this.onData?.(cleanValue);
        }
    });
    this.isSending = false;
    this.processQueue();
  };
  
  public getVIN() {
    this.send('0902');
  }

  send(command: string) {
    this.commandQueue.push(command);
    this.processQueue();
  }
  
  private async processQueue() {
    if (this.isSending || this.commandQueue.length === 0 || !this.tx) {
        return;
    }
    this.isSending = true;
    const command = this.commandQueue.shift();
    if (command) {
        this.onLog?.(`TX: ${command}`);
        const data = new TextEncoder().encode(command + "\r");
        try {
            await this.tx.writeValueWithoutResponse(data);
        } catch (error) {
            console.error('Komut gönderilemedi:', error);
            this.isSending = false;
        }
    } else {
        this.isSending = false;
    }
  }
}
