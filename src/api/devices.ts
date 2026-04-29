import type { Device } from '../types/device';

const mockDevices: Device[] = [
  {
    id: '1',
    name: 'Truck Alpha',
    status: 'ACTIVE',
    lastSeen: new Date(Date.now() - 1000 * 60 * 3).toISOString(),
    location: { lat: 40.7128, lng: -74.006, address: '123 Broadway, New York, NY' },
    batteryLevel: 87,
  },
  {
    id: '2',
    name: 'Van Beta',
    status: 'ACTIVE',
    lastSeen: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    location: { lat: 34.0522, lng: -118.2437, address: '456 Sunset Blvd, Los Angeles, CA' },
    batteryLevel: 62,
  },
  {
    id: '3',
    name: 'Bike Gamma',
    status: 'INACTIVE',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    location: { lat: 41.8781, lng: -87.6298, address: '789 Michigan Ave, Chicago, IL' },
    batteryLevel: 14,
  },
  {
    id: '4',
    name: 'Car Delta',
    status: 'ACTIVE',
    lastSeen: new Date(Date.now() - 1000 * 30).toISOString(),
    location: { lat: 29.7604, lng: -95.3698, address: '321 Main St, Houston, TX' },
    batteryLevel: 95,
  },
  {
    id: '5',
    name: 'Scooter Epsilon',
    status: 'INACTIVE',
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    location: { lat: 33.449, lng: -112.0667, address: '654 Central Ave, Phoenix, AZ' },
    batteryLevel: 3,
  },
  {
    id: '6',
    name: 'Bus Zeta',
    status: 'ACTIVE',
    lastSeen: new Date(Date.now() - 1000 * 60 * 8).toISOString(),
    location: { lat: 39.9526, lng: -75.1652, address: '987 Market St, Philadelphia, PA' },
    batteryLevel: 74,
  },
];

/** Simulates a network delay */
function delay(ms = 300): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const devicesApi = {
  /** Fetch all devices */
  async getDevices(): Promise<Device[]> {
    await delay();
    return [...mockDevices];
  },

  /** Fetch a single device by id */
  async getDevice(id: string): Promise<Device | undefined> {
    await delay();
    return mockDevices.find((d) => d.id === id);
  },

  /** Create a new device */
  async createDevice(data: Omit<Device, 'id'>): Promise<Device> {
    await delay();
    const newDevice: Device = { ...data, id: String(Date.now()) };
    mockDevices.push(newDevice);
    return newDevice;
  },

  /** Update an existing device */
  async updateDevice(id: string, data: Partial<Omit<Device, 'id'>>): Promise<Device | undefined> {
    await delay();
    const index = mockDevices.findIndex((d) => d.id === id);
    if (index === -1) return undefined;
    mockDevices[index] = { ...mockDevices[index], ...data };
    return mockDevices[index];
  },

  /** Delete a device */
  async deleteDevice(id: string): Promise<boolean> {
    await delay();
    const index = mockDevices.findIndex((d) => d.id === id);
    if (index === -1) return false;
    mockDevices.splice(index, 1);
    return true;
  },
};
