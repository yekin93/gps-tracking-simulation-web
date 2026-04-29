import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDevice } from "../../api/deviceApi";
import type { CreateDeviceRequest } from "../../types/device";
import DeviceForm from "../../components/devices/DeviceForm";
import ErrorMessage from "../../components/common/ErrorMessage";

const DeviceCreatePage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (request: CreateDeviceRequest) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const device = await createDevice(request);
      navigate(`/devices/${device.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Failed to create device"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">
        Create New Device
      </h1>
      {error && (
        <div className="mb-4">
          <ErrorMessage message={error} />
        </div>
      )}
      <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
        <DeviceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
      </div>
    </div>
  );
};

export default DeviceCreatePage;
