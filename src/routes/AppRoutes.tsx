import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import DeviceListPage from '../pages/DeviceListPage';
import DeviceDetailPage from '../pages/DeviceDetailPage';
import OverviewPage from '../pages/overview/OverviewPage';
import MapPage from '../pages/map/MapPage';
import TripsPage from '../pages/trips/TripsPage';
import AlertsPage from '../pages/alerts/AlertsPage';
import ReportsPage from '../pages/reports/ReportsPage';
import SettingsPage from '../pages/settings/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/devices" replace />} />
      <Route element={<DashboardLayout />}>
        <Route path="/overview" element={<OverviewPage />} />
        <Route path="/devices" element={<DeviceListPage />} />
        <Route
          path="/devices/new"
          element={
            <div className="flex items-center justify-center min-h-screen text-slate-600 text-lg">
              New Device form — coming soon
            </div>
          }
        />
        <Route path="/devices/:id" element={<DeviceDetailPage />} />
        <Route
          path="/devices/:id/edit"
          element={
            <div className="flex items-center justify-center min-h-screen text-slate-600 text-lg">
              Edit Device form — coming soon
            </div>
          }
        />
        <Route path="/map" element={<MapPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/reports" element={<ReportsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
