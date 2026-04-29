# GPS Tracking Simulation Web

A React frontend for a GPS Tracking Simulation system.

## Project Structure

```
gps-tracking-web/   ← Vite + React + TypeScript frontend
```

## Tech Stack

- **Vite** – build tool & dev server
- **React 19** – UI framework
- **TypeScript** – type safety
- **Tailwind CSS v4** – utility-first styling
- **React Router v7** – client-side routing
- **Axios** – HTTP client (ready for real API integration)
- **Mock API** – in-memory mock for development while backend is not ready

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install Dependencies

```bash
cd gps-tracking-web
npm install
```

### Run Development Server

```bash
cd gps-tracking-web
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
cd gps-tracking-web
npm run build
```

### Preview Production Build

```bash
cd gps-tracking-web
npm run preview
```

### Lint

```bash
cd gps-tracking-web
npm run lint
```

## Pages

| Path | Description |
|------|-------------|
| `/` | Redirects to `/devices` |
| `/devices` | Device list page |
| `/devices/new` | Create a new device |
| `/devices/:id` | Device detail view |

## Mock API

The mock API lives in `src/api/deviceApi.ts` and simulates network latency using `src/utils/delay.ts`.

To connect to a real backend, replace the mock implementations in `deviceApi.ts` with real Axios HTTP calls.

## Folder Structure

```
gps-tracking-web/src/
├── api/
│   └── deviceApi.ts          # Mock API layer
├── components/
│   ├── common/
│   │   ├── Loading.tsx
│   │   ├── ErrorMessage.tsx
│   │   └── EmptyState.tsx
│   └── devices/
│       ├── DeviceCard.tsx
│       └── DeviceForm.tsx
├── layouts/
│   └── MainLayout.tsx
├── pages/
│   └── devices/
│       ├── DeviceListPage.tsx
│       ├── DeviceCreatePage.tsx
│       └── DeviceDetailPage.tsx
├── routes/
│   └── AppRoutes.tsx
├── types/
│   └── device.ts
└── utils/
    └── delay.ts
```
