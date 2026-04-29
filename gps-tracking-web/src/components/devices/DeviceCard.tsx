import { Link } from "react-router-dom";
import type { Device } from "../../types/device";

interface DeviceCardProps {
  device: Device;
}

const statusColors: Record<Device["status"], string> = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-100 text-gray-500",
};

const typeIcons: Record<Device["type"], string> = {
  CAR: "🚗",
  TRUCK: "🚛",
  BIKE: "🚲",
};

const DeviceCard = ({ device }: DeviceCardProps) => (
  <Link
    to={`/devices/${device.id}`}
    className="block rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md hover:border-blue-300"
  >
    <div className="flex items-center justify-between">
      <span className="text-2xl">{typeIcons[device.type]}</span>
      <span
        className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[device.status]}`}
      >
        {device.status}
      </span>
    </div>
    <h3 className="mt-3 text-lg font-semibold text-gray-800">{device.name}</h3>
    <p className="mt-1 text-sm text-gray-500">Type: {device.type}</p>
    <p className="mt-1 text-xs text-gray-400">
      Created: {new Date(device.createdAt).toLocaleDateString()}
    </p>
  </Link>
);

export default DeviceCard;
