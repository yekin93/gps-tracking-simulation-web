export type DeviceType = "CAR" | "TRUCK" | "BIKE";
export type DeviceStatus = "ACTIVE" | "INACTIVE";

export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  status: DeviceStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDeviceRequest {
  name: string;
  type: DeviceType;
  status: DeviceStatus;
}
