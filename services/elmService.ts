
// FIX: Add minimal Web Bluetooth API type definitions to resolve TypeScript errors.
// This is necessary when @types/web-bluetooth is not available in the project.
declare global {
  interface BluetoothDevice {
    readonly name?: string;
    readonly gatt?: BluetoothRemoteGATTServer;
    addEventListener(type: 'gattserverdisconnected', listener: (this: this, ev: Event) => any): void;
    removeEventListener(type: 'gattserverdisconnected', listener: (this: this, ev: Event) => any): void;
  }

  interface BluetoothRemoteGATTServer {
    readonly connected: boolean;
    connect(): Promise<BluetoothRemoteGATTServer>;
    disconnect(): void;
    getPrimaryService(service: string): Promise<BluetoothRemoteGATTService>;
  }

  interface BluetoothRemoteGATTService {
    getCharacteristic(characteristic: string): Promise<BluetoothRemoteGATTCharacteristic>;
  }

  interface BluetoothRemoteGATTCharacteristic {
    startNotifications(): Promise<void>;
    addEventListener(type: 'characteristicvaluechanged', listener: (event: any) => void): void;
    writeValueWithoutResponse(value: BufferSource): Promise<void>;
  }

  interface Navigator {
    readonly bluetooth: {
      requestDevice(options?: any): Promise<BluetoothDevice>;
    };
  }
}


// services/elmService.ts
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
          { namePrefix: 'ELM' },
          { services: ['0000ffe0-0000-1000-8000-00805f9b34fb'] }
        ],
        optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
      });

      if (!this.device.gatt) {
        throw new Error('GATT Server not available.');
      }
      
      this.onLog?.(`${this.device.name} üzerindeki GATT Sunucusuna bağlanılıyor...`);
      this.device.addEventListener('gattserverdisconnected', this.handleDisconnect);
      this.server = await this.device.gatt.connect();

      this.onLog?.('Ana servis alınıyor...');
      const service = await this.server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
      
      this.onLog?.('Karakteristikler alınıyor...');
      this.rx = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
      this.tx = this.rx; 

      this.onLog?.('Bildirimler başlatılıyor...');
      await this.rx.startNotifications();
      this.rx.addEventListener("characteristicvaluechanged", this.handleData);
      this.onLog?.('Bağlantı başarılı. Cihaz başlatılıyor...');
      
      this.send('ATZ');
      this.send('ATE0');
      this.send('ATL0');
      this.send('ATSP0');
      this.send('0100'); // Check supported PIDs

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
            console.error('Failed to send command:', error);
            this.isSending = false;
        }
    } else {
        this.isSending = false;
    }
  }
}