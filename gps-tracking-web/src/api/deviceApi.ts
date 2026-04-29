import type { Device, CreateDeviceRequest } from "../types/device";
import { delay } from "../utils/delay";

const mockDevices: Device[] = [
  {
    id: 1,
    name: "Truck Alpha",
    type: "TRUCK",
    status: "ACTIVE",
    createdAt: "2024-01-10T08:00:00Z",
    updatedAt: "2024-01-15T12:00:00Z",
  },
  {
    id: 2,
    name: "Car Beta",
    type: "CAR",
    status: "INACTIVE",
    createdAt: "2024-02-05T09:30:00Z",
    updatedAt: "2024-02-20T10:00:00Z",
  },
  {
    id: 3,
    name: "Bike Gamma",
    type: "BIKE",
    status: "ACTIVE",
    createdAt: "2024-03-01T11:00:00Z",
    updatedAt: "2024-03-10T14:00:00Z",
  },
];

let nextId = mockDevices.length + 1;

export const getDevices = async (): Promise<Device[]> => {
  await delay(500);
  return [...mockDevices];
};

export const getDeviceById = async (id: number): Promise<Device> => {
  await delay(400);
  const device = mockDevices.find((d) => d.id === id);
  if (!device) {
    throw new Error(`Device with id ${id} not found`);
  }
  return { ...device };
};

export const createDevice = async (
  request: CreateDeviceRequest
): Promise<Device> => {
  await delay(600);
  const now = new Date().toISOString();
  const newDevice: Device = {
    id: nextId++,
    name: request.name,
    type: request.type,
    status: request.status,
    createdAt: now,
    updatedAt: now,
  };
  mockDevices.push(newDevice);
  return { ...newDevice };
};
