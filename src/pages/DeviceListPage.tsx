import { useMemo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { devicesApi } from '../api/devices';
import type { Device, DeviceStatus } from '../types/device';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';

type StatusFilter = 'ALL' | DeviceStatus;

function formatLastSeen(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return 'Just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHrs = Math.floor(diffMin / 60);
  if (diffHrs < 24) return `${diffHrs}h ago`;
  return `${Math.floor(diffHrs / 24)}d ago`;
}

const STATUS_FILTERS: { label: string; value: StatusFilter }[] = [
  { label: 'All', value: 'ALL' },
  { label: 'Active', value: 'ACTIVE' },
  { label: 'Inactive', value: 'INACTIVE' },
];

export default function DeviceListPage() {
  const navigate = useNavigate();
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('ALL');

  useEffect(() => {
    devicesApi.getDevices().then((data) => {
      setDevices(data);
      setLoading(false);
    });
  }, []);

  const filtered = useMemo(
    () =>
      devices.filter((d) => {
        const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
        const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
        return matchesStatus && matchesSearch;
      }),
    [devices, search, statusFilter],
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* ── Page header ── */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Devices</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              {devices.length} device{devices.length !== 1 ? 's' : ''} registered
            </p>
          </div>
          <Button
            onClick={() => navigate('/devices/new')}
            aria-label="Create a new device"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            New Device
          </Button>
        </div>
      </header>

      {/* ── Filters bar ── */}
      <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search */}
        <div className="flex-1 max-w-sm">
          <Input
            type="search"
            placeholder="Search by device name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search devices by name"
            leadingIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z"
                />
              </svg>
            }
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-2" role="group" aria-label="Filter by status">
          {STATUS_FILTERS.map(({ label, value }) => (
            <button
              key={value}
              type="button"
              onClick={() => setStatusFilter(value)}
              aria-pressed={statusFilter === value}
              className={[
                'px-3 py-1.5 rounded-full text-xs font-semibold transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1',
                statusFilter === value
                  ? value === 'ACTIVE'
                    ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300'
                    : value === 'INACTIVE'
                      ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-300'
                      : 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50',
              ].join(' ')}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Device list ── */}
      <main className="max-w-6xl mx-auto px-6 pb-12">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-400 text-sm animate-pulse">
            Loading devices…
          </div>
        ) : filtered.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-slate-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <p className="text-slate-600 font-medium text-base">No devices found</p>
            <p className="text-slate-400 text-sm max-w-xs">
              {search || statusFilter !== 'ALL'
                ? "Try adjusting your search or filter."
                : 'Get started by adding your first device.'}
            </p>
            {!search && statusFilter === 'ALL' && (
              <Button onClick={() => navigate('/devices/new')} className="mt-2">
                Add Device
              </Button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((device) => (
              <DeviceCard
                key={device.id}
                device={device}
                onView={() => navigate(`/devices/${device.id}`)}
                onEdit={() => navigate(`/devices/${device.id}/edit`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ────────────────────────────────────────────── */
/*  DeviceCard sub-component                      */
/* ────────────────────────────────────────────── */

interface DeviceCardProps {
  device: Device;
  onView: () => void;
  onEdit: () => void;
}

function DeviceCard({ device, onView, onEdit }: DeviceCardProps) {
  const isActive = device.status === 'ACTIVE';

  const batteryTextColor =
    device.batteryLevel === undefined
      ? 'text-slate-400'
      : device.batteryLevel > 50
        ? 'text-emerald-600'
        : device.batteryLevel > 20
          ? 'text-amber-500'
          : 'text-rose-500';

  return (
    <Card
      clickable
      onClick={onView}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onView()}
      aria-label={`View details for ${device.name}`}
      className="flex flex-col"
    >
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-slate-800 truncate leading-tight">
            {device.name}
          </h2>
          {device.location.address && (
            <p className="text-xs text-slate-400 mt-1 truncate">
              {device.location.address}
            </p>
          )}
        </div>
        <Badge variant={isActive ? 'active' : 'inactive'} className="shrink-0">
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      </div>

      {/* Card body — metadata */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500 flex-1">
        <span title="Last seen" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3.5 w-3.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {formatLastSeen(device.lastSeen)}
        </span>
        {device.batteryLevel !== undefined && (
          <span className={['flex items-center gap-1', batteryTextColor].join(' ')} title="Battery level">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 7H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2zm2 3h1a1 1 0 010 2h-1"
              />
            </svg>
            {device.batteryLevel}%
          </span>
        )}
      </div>

      {/* Card footer — actions */}
      <div
        className="px-4 py-3 border-t border-slate-100 flex gap-2"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="secondary"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onView();
          }}
          aria-label={`View details for ${device.name}`}
          className="flex-1"
        >
          View
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
          aria-label={`Edit ${device.name}`}
          className="flex-1"
        >
          Edit
        </Button>
      </div>
    </Card>
  );
}
