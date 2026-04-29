import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/navigation/Sidebar';

const SIDEBAR_EXPANDED = 260;
const SIDEBAR_COLLAPSED = 80;

export default function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED;

  return (
    <>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <main
        className="min-h-screen overflow-y-auto bg-slate-50 transition-all duration-300 ease-in-out"
        style={{ marginLeft: sidebarWidth }}
      >
        <Outlet />
      </main>
    </>
  );
}
