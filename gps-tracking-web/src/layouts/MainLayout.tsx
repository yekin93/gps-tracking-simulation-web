import { Link, Outlet } from "react-router-dom";

const MainLayout = () => (
  <div className="min-h-screen bg-gray-50">
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-blue-600 tracking-tight">
          📡 GPS Tracking
        </Link>
        <nav className="flex gap-4 text-sm font-medium text-gray-600">
          <Link to="/devices" className="hover:text-blue-600 transition-colors">
            Devices
          </Link>
          <Link
            to="/devices/new"
            className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700 transition-colors"
          >
            + New Device
          </Link>
        </nav>
      </div>
    </header>
    <main className="mx-auto max-w-5xl px-4 py-8">
      <Outlet />
    </main>
  </div>
);

export default MainLayout;
