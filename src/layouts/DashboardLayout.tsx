import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex" style={{ minHeight: '100vh' }}>
      <Sidebar />
      <div className="flex-1 min-w-0 bg-slate-50 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
