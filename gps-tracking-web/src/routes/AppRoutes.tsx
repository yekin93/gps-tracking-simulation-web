import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DeviceListPage from "../pages/devices/DeviceListPage";
import DeviceCreatePage from "../pages/devices/DeviceCreatePage";
import DeviceDetailPage from "../pages/devices/DeviceDetailPage";

const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout />}>
      <Route index element={<Navigate to="/devices" replace />} />
      <Route path="/devices" element={<DeviceListPage />} />
      <Route path="/devices/new" element={<DeviceCreatePage />} />
      <Route path="/devices/:id" element={<DeviceDetailPage />} />
    </Route>
  </Routes>
);

export default AppRoutes;
