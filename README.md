# Pixfolio - Digital Album Platform for Photographers

Pixfolio is a full-stack digital album platform designed for photographers and labs to create, manage, and share stunning photo albums with clients. Built with React 19 and Node.js/Express, it offers a premium, high-performance experience for showcasing professional photography.

## Key Features

- **Minimal & Premium Album Viewer** — A clean, distraction-free viewer that displays all album images vertically. No action buttons or overlays, ensuring the photography remains the focal point.
- **Dynamic Photographer Branding** — The viewer header automatically displays the photographer or studio details associated with the album, reinforcing brand identity.
- **Engagement Tracking** — Real-time tracking of view counts per album, providing valuable insights into client engagement.
- **Credit-Based System** — Multi-step album creation flow integrated with a billing and credit-based system for professional lab workflows.
- **QR Code Sharing** — instant album sharing via auto-generated QR codes directly from the dashboard.
- **Modern Dashboard UI** — Built with shadcn/ui and Radix primitives, offering a sleek, responsive interface with full dark mode support.
- **Admin Command Center** — Master admin panel for user moderation, platform-wide analytics, and infrastructure management.

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, Tailwind CSS v4, shadcn/ui, Framer Motion, Radix UI |
| **Backend** | Node.js 18+, Express 5, MongoDB + Mongoose 9 |
| **Authentication** | JWT (JSON Web Tokens), bcryptjs (12 salt rounds) |
| **Security** | Rate limiting, CORS sanitization, secure environment management |

## Project Structure

```
photo/
├── Backend/          # Express API server (Controllers, Models, Routes, Middleware)
├── frontend/         # React SPA (Vite-powered, shadcn/ui components)
│   ├── src/
│   │   ├── app/      # Central routing and context providers
│   │   ├── features/ # Modular feature logic (Album, Auth, Admin, User)
│   │   ├── services/ # API integration layer
│   │   └── styles/   # CSS variables and design system tokens
└── README.md
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (Local instance or Atlas connection string)

### 1. Backend Setup
```bash
cd Backend
npm install
cp .env.example .env   # Configure MONGO_URI, JWT_SECRET, and PORT
npm run dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Note: Ensure the backend is running so the frontend can proxy API requests correctly.*

Open [http://localhost:5173](http://localhost:5173).

## Album Viewer Concept
The viewer (`/viewer/:id`) is designed as a **"Visual Book"**. It fetches album metadata via a public endpoint and renders the front cover, spreads, and back cover in a seamless vertical flow. This "app-less" experience allows clients to view their photos instantly on any device without software installation.

## License
MIT — see [LICENSE](./LICENSE).

---
Developed by [Sahil Prajapati](https://github.com/Sahil-Prajapati-8917)