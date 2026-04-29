import { Route } from 'lucide-react';

export default function TripsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-5">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Trips</h1>
          <p className="text-sm text-slate-500 mt-0.5">History of recorded device trips</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm px-8 py-12 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-violet-50 text-violet-500">
            <Route className="h-6 w-6" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Coming soon</h2>
          <p className="text-sm text-slate-500 max-w-sm">
            Trip history and route playback are under construction. Recorded journeys will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}
