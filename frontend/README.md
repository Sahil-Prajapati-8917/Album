# Pixfolio Frontend - Dashboard & Digital Visual Book System

This is the frontend for **Pixfolio**, a high-end SaaS platform for photographers and digital labs to create, manage, and showcase interactive digital visual books.

## 🚀 Tech Stack

- **Framework**: React 19 (Vite)
- **Styling**: Tailwind CSS 4.0, Lucide Icons
- **UI Components**: Shadcn/UI (Radix UI)
- **Animation**: Framer Motion 12, GSAP, Lenis Smooth Scroll
- **Specialized**: react-pageflip (3D book physics), Recharts (Analytics), Swiper (Carousels)

---

## 📂 Project Structure

```bash
frontend/
├── src/
│   ├── app/                # Route definitions & global providers
│   ├── components/         # Shared UI (shadcn), Layouts, and common blocks
│   ├── features/           # Modular features (Main logic here)
│   │   ├── admin/          # Master Admin Dashboard & moderation
│   │   ├── album/          # Album creation (Pixfolio) & 3D Viewer
│   │   ├── auth/           # Login & Signup flows
│   │   ├── landing/        # Landing page & Pricing
│   │   └── user/           # User dashboard, Profile, Recharge, Photographers
│   ├── services/           # API communication layer (api.js)
│   ├── utils/              # Formatting, validation, and constants
│   └── styles/             # Global CSS & Tailwind configuration
└── public/                 # Static assets
```

---

## 🛠 Features for Backend Integration

### 1. User Authentication & Profile
- **Status**: **Integrated** with `/api/users`
- **Logic**: JWT-based auth. Tokens and user state are managed in `src/services/api.js`.
- **Backend Responsibility**: Passwords must be hashed (bcrypt), JWTs should expire in 30d.

### 2. Pixfolio (Albums) Management
- **Status**: **Currently Frontend Only** (localStorage: `albums`)
- **Action Required**: Migrate to `/api/albums`
- **Data Model**:
  ```json
  {
    "id": "ALBUM-XXXX",
    "clientName": "John Doe",
    "functionDate": "2025-05-20",
    "functionType": "wedding",
    "photographerId": "UUID",
    "songName": "Perfect",
    "views": 1500,
    "frontCover": "URL",
    "backCover": "URL",
    "spreads": [
      {
        "id": 1,
        "leftPage": { "image": "URL", "caption": "" },
        "rightPage": { "image": "URL", "caption": "" }
      }
    ]
  }
  ```

### 3. Photographer Directory
- **Status**: **Currently Frontend Only** (localStorage: `photographers`)
- **Action Required**: Migrate to `/api/photographers`
- **Data Model**:
  ```json
  {
    "id": "UUID",
    "name": "Jane Smith",
    "mobile": "9876543210",
    "city": "Mumbai",
    "state": "Maharashtra",
    "status": "Active"
  }
  ```

### 4. Billing & Credits
- **Status**: **UI Only**
- **Action Required**: Implement `/api/billing`
- **Logic**: Track "Credits" (Albums remaining). 1 credit per album created. Users can buy plans (Pay Per Album, Monthly, Yearly).

---

## 📡 API Endpoints (Referenced/Expected)

| Endpoint | Method | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `/api/users/register` | POST | Create new account | No |
| `/api/users/login` | POST | Get JWT token | No |
| `/api/users/me` | GET | Current user info | Yes |
| `/api/users/profile` | PUT | Update studio/socials | Yes |
| `/api/albums` | GET/POST | Manage pixfolios | Yes |
| `/api/photographers` | GET/POST | Manage partners | Yes |
| `/api/billing/history` | GET | Transaction logs | Yes |

---

## 🛠 Setup & Development

1. **Install Deps**: `npm install`
2. **Run Dev**: `npm run dev`
3. **Environment**: Update `VITE_API_URL` (if added) or modify `src/services/api.js` for custom backend URLs.

---

## 🏗 Admin Access
- **Path**: `/admin`
- **Master Admin Password**: Currently set in code for demo purposes. Backend should manage admin session validation separately.

---
Built with ❤️ by Sahil Prajapati
