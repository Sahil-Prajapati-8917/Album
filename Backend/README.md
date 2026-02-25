# Pixfolio Backend

REST API for the Pixfolio digital album platform. Handles user auth, album CRUD, photographer management, and billing/credits.

## Tech Stack

- **Node.js 18+** / **Express 5.2**
- **MongoDB** + **Mongoose 9**
- **JWT 9.0** for auth, **bcryptjs 3.0** for password hashing
- **CORS** for cross-origin support

## Setup

```bash
cd Backend
npm install
cp .env.example .env   # set MONGO_URI, JWT_SECRET
npm run dev             # development (nodemon)
npm start               # production
```

## API Endpoints

### Auth (Public)

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| POST | `/api/users/register` | Create account | 5 / 15min |
| POST | `/api/users/login` | Get JWT token | 10 / 15min |

### User (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/me` | Current user data |
| PUT | `/api/users/profile` | Update profile & studio details |

### Albums

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/albums` | Yes | List user's albums |
| POST | `/api/albums` | Yes | Create album (deducts 1 credit) |
| GET | `/api/albums/:id` | **No** | Public album data (used by viewer). Increments view count. |
| PUT | `/api/albums/:id` | Yes | Update album (field whitelist enforced) |
| DELETE | `/api/albums/:id` | Yes | Delete album |

### Photographers (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/photographers` | List user's photographers |
| POST | `/api/photographers` | Add photographer |
| PUT | `/api/photographers/:id` | Update photographer |
| DELETE | `/api/photographers/:id` | Delete photographer |

### Billing (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/billing/purchase` | Purchase credits |
| GET | `/api/billing/history` | Transaction history |

## Data Models

### User
`email`, `password` (hashed), `personalName`, `accountType` (photographer/lab), `studioName`, `city`, `state`, `mobileNumber`, `address`, `credits`, social links.

### Album
`albumId` (unique, format `PF-<uuid>`), `clientName`, `functionDate`, `functionType`, `photographerId` (ref), `userId` (ref), `songName`, `frontCover` (URL string), `backCover` (URL string), `spreads` (array), `totalSheets`, `views`, `status`, `priority`, `label`.

**Spread structure:**
```json
{
  "id": 1,
  "leftPage": { "image": "https://...", "caption": "" },
  "rightPage": { "image": "https://...", "caption": "" }
}
```

### Photographer
`name`, `phone`, `city`, `userId` (ref).

### Transaction
`userId` (ref), `planId`, `amount`, `paymentId`, `credits`, `type`.

## Directory Structure

```
Backend/
├── config/         # DB connection
├── controllers/    # Route handlers (userController, albumController, etc.)
├── middleware/     # auth.js (JWT verify), rate limiters
├── models/         # Mongoose schemas
├── routes/         # Express routers
├── utils/          # Helpers
└── index.js        # Entry point
```

## Security

- Passwords hashed with bcrypt (12 salt rounds)
- JWT tokens with expiration
- Rate limiting on auth endpoints
- Field whitelist on album updates (prevents mass assignment)
- Ownership checks on all mutations (user can only modify their own data)

---
Built by Sahil Prajapati
