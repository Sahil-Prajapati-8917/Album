# Pixfolio Backend - API Documentation

The server-side component of the Pixfolio platform, providing a robust RESTful API for user authentication, profile management, and system administration. Built with a focus on security, performance, and scalability.

## 🛠️ Technology Stack

- **Node.js 18+** - Modern JavaScript runtime
- **Express.js 5.2.1** - Fast, unopinionated web framework
- **MongoDB + Mongoose 9.0.2** - Flexible NoSQL database and ODM
- **JWT (JSON Web Tokens) 9.0.3** - Secure session management
- **bcryptjs 3.0.3** - Industrial-strength password hashing (12 salt rounds)
- **CORS 2.8.5** - Secure cross-origin resource sharing

## 📋 Prerequisites

- Node.js 18+ installed on your system
- A running MongoDB instance (Local or Atlas)
- npm or yarn package manager

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   cd Backend
   npm install
   ```

2. **Environment Configuration:**
   Copy the example environment file and update it with your own credentials:
   ```bash
   cp .env.example .env
   ```
   *Note: Ensure `MONGO_URI` and `JWT_SECRET` are properly configured in `.env`.*

3. **Run the Server:**
   - **Development mode** (with nodemon):
     ```bash
     npm run dev
     ```
   - **Production mode**:
     ```bash
     npm start
     ```

## 🛣️ API Reference

### Authentication Endpoints

#### Register a New User
`POST /api/users/register`
- **Access**: Public
- **Rate Limit**: 5 requests per 15 minutes
- **Body Parameters**:
  - `email` (Required): Valid email address
  - `password` (Required): Min 6 characters
  - `personalName` (Required): Full name
  - `accountType` (Required): `photographer` or `lab`
  - `city`, `state`, `studioName`, `mobileNumber`, `address` (Optional)
- **Success Response**: `201 Created` with JWT token and user data

#### Login User
`POST /api/users/login`
- **Access**: Public
- **Rate Limit**: 10 requests per 15 minutes
- **Body Parameters**:
  - `email` (Required)
  - `password` (Required)
- **Success Response**: `200 OK` with JWT token and user data

### User Management (Protected)

#### Get Current User (State Management)
`GET /api/users/me`
- **Auth**: Required (Bearer Token)
- **Description**: Returns current authenticated user data for frontend state initialization.

#### Get User Profile
`GET /api/users/profile`
- **Auth**: Required (Bearer Token)
- **Description**: Retrieves full profile data including social media links.

#### Update User Profile
`PUT /api/users/profile`
- **Auth**: Required (Bearer Token)
- **Body Parameters**: `personalName`, `studioName`, `mobileNumber`, `address`, `profilePicture`, `socialMedia` (nested object)
- **Description**: Updates user details and social media integration.

## 🛡️ Security Features

- **Password Hashing**: Uses bcrypt with a cost factor of 12 for secure storage.
- **JWT Authentication**: Secure token-based sessions with expiration.
- **Rate Limiting**: Protection against brute-force attacks on sign-up and login.
- **Input Validation**: Strict schema validation for all incoming requests.
- **CORS protection**: Configurable cross-origin resource sharing.
- **Secure Error Handling**: Formatted error responses without exposing internal server details.

## 📁 Directory Structure

```bash
Backend/
├── config/             # Database connection setup
├── controllers/        # Logical handlers for API routes
├── middleware/         # Auth, validation, and error handlers
├── models/             # Mongoose schemas (User, etc.)
├── routes/             # API endpoint definitions
├── utils/              # Helper utility functions
└── index.js            # Main entry point and server setup
```

## 🏗️ Data Model (User)

The platform supports two primary user roles with distinct characteristics:
- **Photographers**: Independent creators with specific specialties.
- **Labs**: Organizations providing services to multiple photographers.
- **Credits System**: Built-in logic for tracking user credits and validity.

## 🗺️ Future Roadmap
- [ ] Album Management Strategy (Migration to Database)
- [ ] AWS S3/Cloudinary Image Upload Integration
- [ ] Admin Control Panel API Extensions
- [ ] Real-time Notifications via WebSockets

---
Built with Node.js and Passion for the Pixfolio Ecosystem.
