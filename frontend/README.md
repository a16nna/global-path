# Global Path — Frontend

AI-powered study-abroad roadmap platform for Indian B.Tech students. Redesigned
frontend built on React + Vite, styled around a boarding-pass / travel-document
visual language.

## Stack

- React 18 + Vite
- React Router
- Tailwind CSS v4
- Framer Motion
- React Three Fiber + Drei (hero globe)
- Lucide React (icons)

## Getting started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:5173`.

## Backend integration

`src/services/api.js` points at `http://localhost:5000/api`. Update the
`baseURL` there once your backend is ready. `src/services/auth.js` and
`src/services/roadmap.js` call real endpoints first and fall back to mock
data if the request fails, so the UI is fully usable before the backend is
wired up — remove the fallbacks once your endpoints are live.

## Structure

```
src/
  assets/        images, 3D models, textures, icons
  components/
    layout/      Navbar, Footer, Background
    hero/        Hero, Globe, FlightPaths, Stars
    roadmap/     University, cost, timeline, checklist cards
    ui/          Button, Card, Badge, Loader
    sections/    Landing page sections
  pages/         Landing, Login, Register, Dashboard, RoadmapForm, Roadmap
  hooks/         useCountUp
  services/      api, auth, roadmap
  utils/         formatters
  constants/     nav links, destinations, form options
```

## Routes

| Path             | Page          |
| ----------------- | ------------- |
| `/`               | Landing       |
| `/login`           | Login         |
| `/register`        | Register      |
| `/dashboard`       | Dashboard     |
| `/roadmap`         | Roadmap wizard (form) |
| `/roadmap/result`  | Roadmap results dashboard |
