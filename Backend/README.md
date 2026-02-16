# Pixfolio Backend

The server-side component of the Pixfolio platform, providing a RESTful API for user authentication, profile management, and project storage.

## 🛠️ Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT (JSON Web Tokens)** - Secure authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)
- npm or yarn

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   Create a `.env` file in this directory with the following variables:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

3. **Run the Server:**
   - Development mode (with nodemon):
     ```bash
     npm run dev
     ```
   - Production mode:
     ```bash
     npm start
     ```

## 🛣️ API Endpoints

### Authentication
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Authenticate and get token
- `GET /api/users/me` - Get current authenticated user details

### Profile
- `GET /api/users/profile` - Retrieve user profile information
- `PUT /api/users/profile` - Update user profile and social media links

## 📁 Directory Structure

- `config/` - Database connection settings
- `controllers/` - Request handlers and logic
- `middleware/` - Authentication and validation logic
- `models/` - Mongoose schemas (User)
- `routes/` - API route definitions
- `utils/` - Shared utility functions
