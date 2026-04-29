import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { devicesApi } from '../api/devices';
import type { Device } from '../types/device';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Modal } from '../components/Modal';
import { useToast } from '../components/toastContext';

function formatLastSeen(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

export default function DeviceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (!id) return;
    devicesApi.getDevice(id).then((data) => {
      setDevice(data ?? null);
      setLoading(false);
    });
  }, [id]);

  const handleToggleStatus = async () => {
    if (!device) return;
    setToggling(true);
    const newStatus = device.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    const updated = await devicesApi.updateDevice(device.id, { status: newStatus });
    if (updated) {
      setDevice(updated);
      addToast(
        `${device.name} is now ${newStatus === 'ACTIVE' ? 'active' : 'inactive'}.`,
        'success',
      );
    } else {
      addToast('Failed to update status. Please try again.', 'error');
    }
    setToggling(false);
  };

  const handleDelete = async () => {
    if (!device) return;
    setDeleting(true);
    const success = await devicesApi.deleteDevice(device.id);
    if (success) {
      addToast(`${device.name} deleted successfully.`, 'success');
      navigate('/devices');
    } else {
      addToast('Failed to delete device. Please try again.', 'error');
      setDeleting(false);
      setDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <p className="text-slate-500 text-sm animate-pulse">Loading device…</p>
      </div>
    );
  }

  if (!device) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <p className="text-slate-600 font-medium text-lg">Device not found</p>
        <Button variant="secondary" onClick={() => navigate('/devices')}>
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Devices
        </Button>
      </div>
    );
  }

  const isActive = device.status === 'ACTIVE';

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Page header ── */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => navigate('/devices')}
              className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 transition-colors duration-200 ease-in-out text-left w-fit mb-1"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All Devices
            </button>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                {device.name}
              </h1>
              <Badge variant={isActive ? 'active' : 'inactive'}>
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {device.id}</p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            <Button
              variant="secondary"
              onClick={() => navigate(`/devices/${device.id}/edit`)}
            >
              Edit
            </Button>
            <Button
              variant={isActive ? 'ghost' : 'primary'}
              loading={toggling}
              onClick={handleToggleStatus}
            >
              {isActive ? 'Deactivate' : 'Activate'}
            </Button>
            <Button variant="destructive" onClick={() => setDeleteModalOpen(true)}>
              Delete
            </Button>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main className="max-w-4xl mx-auto px-6 py-8 flex flex-col gap-6">
        {/* Location section */}
        <section className="bg-white rounded-xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Location
            </h2>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-slate-400 mb-1">Address</p>
              <p className="text-sm font-medium text-slate-800">
                {device.location.address ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Coordinates</p>
              <p className="text-sm font-mono text-slate-700">
                {device.location.lat.toFixed(4)}, {device.location.lng.toFixed(4)}
              </p>
            </div>
          </div>
        </section>

        {/* Device info section */}
        <section className="bg-white rounded-xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
              Device Info
            </h2>
          </div>
          <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-slate-400 mb-2">Status</p>
              <Badge variant={isActive ? 'active' : 'inactive'}>
                {isActive ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-1">Last Seen</p>
              <p className="text-sm font-medium text-slate-800">
                {formatLastSeen(device.lastSeen)}
              </p>
            </div>
            {device.batteryLevel !== undefined && (
              <div>
                <p className="text-xs text-slate-400 mb-2">Battery Level</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={[
                        'h-full rounded-full transition-all',
                        device.batteryLevel > 50
                          ? 'bg-emerald-500'
                          : device.batteryLevel > 20
                            ? 'bg-amber-500'
                            : 'bg-red-500',
                      ].join(' ')}
                      style={{ width: `${device.batteryLevel}%` }}
                    />
                  </div>
                  <span
                    className={[
                      'text-sm font-semibold tabular-nums',
                      device.batteryLevel > 50
                        ? 'text-emerald-600'
                        : device.batteryLevel > 20
                          ? 'text-amber-500'
                          : 'text-red-500',
                    ].join(' ')}
                  >
                    {device.batteryLevel}%
                  </span>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* ── Delete confirmation modal ── */}
      <Modal
        open={deleteModalOpen}
        onClose={() => !deleting && setDeleteModalOpen(false)}
        title="Delete Device"
      >
        <p className="text-sm text-slate-600">
          Are you sure you want to delete{' '}
          <span className="font-semibold text-slate-800">{device.name}</span>? This action
          cannot be undone.
        </p>
        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="secondary"
            onClick={() => setDeleteModalOpen(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button variant="destructive" loading={deleting} onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
}
