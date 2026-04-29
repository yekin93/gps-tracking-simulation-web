import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { devicesApi } from '../api/devices';
import type { Device, DeviceStatus } from '../types/device';

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

  const filtered = useMemo(() => {
    return devices.filter((d) => {
      const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
      const matchesSearch = d.name.toLowerCase().includes(search.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [devices, search, statusFilter]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* ── Page header ── */}
      <header className="bg-white border-b border-slate-200 px-6 py-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Devices</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {devices.length} device{devices.length !== 1 ? 's' : ''} registered
          </p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/devices/new')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          aria-label="Create a new device"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Device
        </button>
      </header>

      {/* ── Filters bar ── */}
      <div className="px-6 py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search by device name…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-slate-300 bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Search devices by name"
          />
        </div>

        {/* Status filter pills */}
        <div className="flex items-center gap-2" role="group" aria-label="Filter by status">
          {(['ALL', 'ACTIVE', 'INACTIVE'] as StatusFilter[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatusFilter(s)}
              aria-pressed={statusFilter === s}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
                statusFilter === s
                  ? s === 'ACTIVE'
                    ? 'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300'
                    : s === 'INACTIVE'
                    ? 'bg-rose-100 text-rose-700 ring-1 ring-rose-300'
                    : 'bg-blue-600 text-white'
                  : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
              }`}
            >
              {s === 'ALL' ? 'All' : s.charAt(0) + s.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* ── Device list ── */}
      <main className="px-6 pb-10">
        {loading ? (
          <div className="flex items-center justify-center py-24 text-slate-500 text-sm">
            Loading devices…
          </div>
        ) : filtered.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-24 text-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="text-slate-600 font-medium text-base">No devices found</p>
            <p className="text-slate-400 text-sm max-w-xs">
              {search || statusFilter !== 'ALL'
                ? "Try adjusting your search or filter to find what you're looking for."
                : 'Get started by adding your first device.'}
            </p>
            {!search && statusFilter === 'ALL' && (
              <button
                type="button"
                onClick={() => navigate('/devices/new')}
                className="mt-2 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Add Device
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((device) => (
              <DeviceCard key={device.id} device={device} onView={() => navigate(`/devices/${device.id}`)} onEdit={() => navigate(`/devices/${device.id}/edit`)} />
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

  const batteryColor =
    device.batteryLevel === undefined
      ? 'text-slate-400'
      : device.batteryLevel > 50
      ? 'text-emerald-600'
      : device.batteryLevel > 20
      ? 'text-amber-500'
      : 'text-rose-500';

  return (
    <article className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col">
      {/* Card header */}
      <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-lg font-bold text-slate-800 truncate leading-tight">
            {device.name}
          </h2>
          {device.location.address && (
            <p className="text-xs text-slate-400 mt-1 truncate">{device.location.address}</p>
          )}
        </div>
        {/* Status badge */}
        <span
          className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
            isActive
              ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
              : 'bg-slate-100 text-slate-500 ring-1 ring-slate-200'
          }`}
          aria-label={`Status: ${device.status}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-slate-400'}`} aria-hidden="true" />
          {isActive ? 'Active' : 'Inactive'}
        </span>
      </div>

      {/* Card body — metadata */}
      <div className="px-5 py-3 border-t border-slate-100 flex items-center gap-4 text-xs text-slate-500">
        <span title="Last seen">
          🕐 {formatLastSeen(device.lastSeen)}
        </span>
        {device.batteryLevel !== undefined && (
          <span className={batteryColor} title="Battery level">
            🔋 {device.batteryLevel}%
          </span>
        )}
      </div>

      {/* Card footer — actions */}
      <div className="px-4 py-3 border-t border-slate-100 flex gap-2 mt-auto">
        <button
          type="button"
          onClick={onView}
          className="flex-1 py-1.5 text-sm font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          aria-label={`View details for ${device.name}`}
        >
          View
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 py-1.5 text-sm font-medium rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
          aria-label={`Edit ${device.name}`}
        >
          Edit
        </button>
      </div>
    </article>
  );
}
