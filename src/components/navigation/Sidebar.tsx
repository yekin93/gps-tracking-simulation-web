import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Monitor,
  Map,
  Route,
  Bell,
  FileBarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Overview', path: '/overview', icon: <LayoutDashboard className="h-5 w-5 shrink-0" /> },
  { label: 'Devices', path: '/devices', icon: <Monitor className="h-5 w-5 shrink-0" /> },
  { label: 'Live Map', path: '/map', icon: <Map className="h-5 w-5 shrink-0" /> },
  { label: 'Trips', path: '/trips', icon: <Route className="h-5 w-5 shrink-0" /> },
  { label: 'Alerts', path: '/alerts', icon: <Bell className="h-5 w-5 shrink-0" /> },
  { label: 'Reports', path: '/reports', icon: <FileBarChart className="h-5 w-5 shrink-0" /> },
  { label: 'Settings', path: '/settings', icon: <Settings className="h-5 w-5 shrink-0" /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="relative flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-300 ease-in-out shrink-0"
      style={{ width: collapsed ? 80 : 260, height: '100vh' }}
    >
      {/* Logo / brand area */}
      <div
        className="flex items-center gap-3 px-5 border-b border-slate-100"
        style={{ height: 64, overflow: 'hidden' }}
      >
        <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 text-white shrink-0">
          <Map className="h-4 w-4" />
        </div>
        {!collapsed && (
          <span className="text-sm font-bold text-slate-800 tracking-tight whitespace-nowrap">
            GPS Tracker
          </span>
        )}
      </div>

      {/* Navigation items */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map(({ label, path, icon }) => (
          <NavLink
            key={path}
            to={path}
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              [
                'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
                isActive
                  ? 'bg-blue-50 text-blue-700'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800',
              ].join(' ')
            }
          >
            {icon}
            {!collapsed && (
              <span className="whitespace-nowrap overflow-hidden">{label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse / expand button */}
      <div className="px-3 pb-4">
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="flex items-center justify-center w-full rounded-lg px-3 py-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <>
              <ChevronLeft className="h-4 w-4 mr-2" />
              <span className="text-xs font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
