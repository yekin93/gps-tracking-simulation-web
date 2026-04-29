import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      {/*
        Make only the main content area scroll.
        Sidebar stays visible via `position: sticky` + `h-screen`.
      */}
      <main className="flex-1 min-w-0 min-h-screen overflow-y-auto bg-slate-50">
        <Outlet />
      </main>
    </div>
  );
}
