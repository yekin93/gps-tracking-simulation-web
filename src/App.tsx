import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DeviceListPage from './pages/DeviceListPage';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/devices" replace />} />
        <Route path="/devices" element={<DeviceListPage />} />
        {/* Placeholder routes for View / Edit (not in scope) */}
        <Route
          path="/devices/new"
          element={
            <div className="flex items-center justify-center min-h-screen text-slate-600 text-lg">
              New Device form — coming soon
            </div>
          }
        />
        <Route
          path="/devices/:id"
          element={
            <div className="flex items-center justify-center min-h-screen text-slate-600 text-lg">
              Device detail — coming soon
            </div>
          }
        />
        <Route
          path="/devices/:id/edit"
          element={
            <div className="flex items-center justify-center min-h-screen text-slate-600 text-lg">
              Edit Device form — coming soon
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

