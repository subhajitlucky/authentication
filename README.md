# 🔐 Authentication System

A full-stack authentication system built with Node.js, Express, MongoDB, and React.

## Features

- User registration and login
- JWT authentication
- Password reset system
- Protected routes
- Modern React frontend
- MongoDB integration

## Tech Stack

**Backend:**
- Node.js & Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

**Frontend:**
- React 18
- Vite
- React Router
- Axios for API calls

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB

### Installation

1. **Backend Setup**
   ```bash
   cd auth-backend
   npm install
   
   # Create .env file with:
   # PORT=5000
   # MONGO_URI=your_mongodb_connection_string
   # JWT_SECRET=your_jwt_secret
   
   npm run dev
   ```

2. **Frontend Setup**
   ```bash
   cd auth-frontend
   npm install
   
   # Create .env file with:
   # VITE_API_URL=http://localhost:5000
   
   npm run dev
   ```

## API Endpoints

- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/protected` - Protected route

## Project Structure

```
auth-backend/          # Express server
├── models/           # Database models
├── middlewares/      # Auth middleware
└── server.js        # Main server file

auth-frontend/        # React application
├── src/
│   ├── components/   # UI components
│   ├── utils/       # API utilities
│   └── App.jsx      # Main app
```
