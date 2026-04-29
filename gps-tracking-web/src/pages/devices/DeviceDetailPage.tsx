import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDeviceById } from "../../api/deviceApi";
import type { Device } from "../../types/device";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";

const statusColors: Record<Device["status"], string> = {
  ACTIVE: "bg-green-100 text-green-700",
  INACTIVE: "bg-gray-100 text-gray-500",
};

const typeIcons: Record<Device["type"], string> = {
  CAR: "🚗",
  TRUCK: "🚛",
  BIKE: "🚲",
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
    <span className="text-sm font-medium text-gray-500">{label}</span>
    <span className="text-sm text-gray-800">{value}</span>
  </div>
);

const DeviceDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    getDeviceById(Number(id))
      .then(setDevice)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load device")
      )
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!device) return null;

  return (
    <div className="mx-auto max-w-lg">
      <div className="mb-4">
        <Link
          to="/devices"
          className="text-sm text-blue-600 hover:underline"
        >
          ← Back to Devices
        </Link>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{typeIcons[device.type]}</span>
            <h1 className="text-xl font-bold text-gray-800">{device.name}</h1>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColors[device.status]}`}
          >
            {device.status}
          </span>
        </div>

        <div className="mt-4">
          <DetailRow label="ID" value={String(device.id)} />
          <DetailRow label="Type" value={device.type} />
          <DetailRow label="Status" value={device.status} />
          <DetailRow
            label="Created At"
            value={new Date(device.createdAt).toLocaleString()}
          />
          <DetailRow
            label="Updated At"
            value={new Date(device.updatedAt).toLocaleString()}
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceDetailPage;
