export type DeviceStatus = 'ACTIVE' | 'INACTIVE';

export interface Device {
  id: string;
  name: string;
  status: DeviceStatus;
  lastSeen: string; // ISO 8601 date string
  location: {
    lat: number;
    lng: number;
    address?: string;
  };
  batteryLevel?: number; // 0–100
}
