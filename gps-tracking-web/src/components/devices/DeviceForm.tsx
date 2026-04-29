import { useState } from "react";
import type { FormEvent } from "react";
import type { CreateDeviceRequest, DeviceType, DeviceStatus } from "../../types/device";

interface DeviceFormProps {
  onSubmit: (request: CreateDeviceRequest) => void;
  isSubmitting: boolean;
}

const DeviceForm = ({ onSubmit, isSubmitting }: DeviceFormProps) => {
  const [name, setName] = useState("");
  const [type, setType] = useState<DeviceType>("CAR");
  const [status, setStatus] = useState<DeviceStatus>("ACTIVE");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ name, type, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Device Name
        </label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g. Truck Alpha"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Type
        </label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as DeviceType)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="CAR">Car</option>
          <option value="TRUCK">Truck</option>
          <option value="BIKE">Bike</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as DeviceStatus)}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating..." : "Create Device"}
      </button>
    </form>
  );
};

export default DeviceForm;
