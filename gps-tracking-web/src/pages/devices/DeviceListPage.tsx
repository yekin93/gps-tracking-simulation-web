import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDevices } from "../../api/deviceApi";
import type { Device } from "../../types/device";
import DeviceCard from "../../components/devices/DeviceCard";
import Loading from "../../components/common/Loading";
import ErrorMessage from "../../components/common/ErrorMessage";
import EmptyState from "../../components/common/EmptyState";

const DeviceListPage = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getDevices()
      .then(setDevices)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load devices")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Devices</h1>
        <Link
          to="/devices/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          + New Device
        </Link>
      </div>

      {devices.length === 0 ? (
        <EmptyState message="No devices found. Create your first device!" />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {devices.map((device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DeviceListPage;
