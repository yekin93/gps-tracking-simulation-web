import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DeviceListPage from './pages/DeviceListPage';
import DeviceDetailPage from './pages/DeviceDetailPage';
import { ToastProvider } from './components/Toast';
import './index.css';

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/devices" replace />} />
          <Route path="/devices" element={<DeviceListPage />} />
          <Route path="/devices/:id" element={<DeviceDetailPage />} />
          <Route
            path="/devices/new"
            element={
              <div className="flex items-center justify-center min-h-screen text-slate-600 text-lg">
                New Device form — coming soon
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
    </ToastProvider>
  );
}

export default App;


