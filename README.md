# 🔐 Full-Stack Authentication System

A complete, production-ready authentication system built with modern web technologies. This project demonstrates secure user authentication, authorization, and session management using industry best practices.

## 🌟 Features

### Core Authentication
- **User Registration** - Secure account creation with validation
- **User Login** - JWT-based authentication system
- **Password Reset** - Secure token-based password recovery
- **Protected Routes** - Authorization middleware for secured endpoints
- **Session Management** - Automatic token handling and expiration

### Security Features
- **Password Hashing** - bcrypt encryption with salt rounds
- **JWT Tokens** - Stateless authentication with expiration
- **Input Validation** - Server-side data validation
- **CORS Protection** - Cross-origin resource sharing configuration
- **Environment Security** - Sensitive data in environment variables

### Frontend Features
- **Modern React UI** - Built with React 18 and hooks
- **Responsive Design** - Mobile-friendly interface
- **Real-time Feedback** - Loading states and error handling
- **Route Protection** - Client-side route guards
- **Automatic Token Management** - Seamless authentication flow

## 🛠️ Technology Stack

### Backend
| Technology | Purpose | Version |
|------------|---------|---------|
| **Node.js** | Runtime environment | 18+ |
| **Express** | Web framework | ^4.21.2 |
| **MongoDB** | Database | Latest |
| **Mongoose** | ODM for MongoDB | ^8.9.3 |
| **JWT** | Authentication tokens | ^9.0.2 |
| **bcrypt** | Password hashing | ^6.0.0 |

### Frontend
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI library | ^18.3.1 |
| **Vite** | Build tool | ^6.0.5 |
| **React Router** | Client-side routing | ^7.1.1 |
| **Axios** | HTTP client | ^1.7.9 |

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **MongoDB** (local installation or cloud instance)
- **npm** or **yarn** package manager

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd auth-system
   ```

2. **Backend Configuration**
   ```bash
   cd auth-backend
   npm install
   ```
   
   Create `.env` file:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/auth-system
   JWT_SECRET=your_super_secure_jwt_secret_key_here
   ```

3. **Frontend Configuration**
   ```bash
   cd ../auth-frontend
   npm install
   ```
   
   Create `.env` file:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd auth-backend
   npm run dev
   ```
   Server will start on `http://localhost:5000`

2. **Start Frontend Application**
   ```bash
   cd auth-frontend
   npm run dev
   ```
   Application will open on `http://localhost:5173`

## 📡 API Reference

### Authentication Endpoints

#### Register User
```http
POST /signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

#### Forgot Password
```http
POST /forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

#### Reset Password
```http
POST /reset-password
Content-Type: application/json

{
  "resetToken": "token_from_email",
  "newPassword": "newSecurePassword123"
}
```

#### Protected Route
```http
GET /protected
Authorization: Bearer <jwt_token>
```

## 📁 Project Architecture

```
auth-system/
├── auth-backend/                 # Express.js API server
│   ├── models/
│   │   └── User.js              # MongoDB user schema
│   ├── middlewares/
│   │   └── authMiddleware.js    # JWT verification middleware
│   ├── server.js                # Main server configuration
│   ├── package.json             # Backend dependencies
│   └── .env                     # Environment variables
│
├── auth-frontend/               # React.js application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── ResetPassword.jsx
│   │   │   ├── Navigation.jsx
│   │   │   └── TestProtected.jsx
│   │   ├── pages/
│   │   │   └── Home.jsx         # Dashboard page
│   │   ├── utils/
│   │   │   ├── api.js           # Axios configuration
│   │   │   └── auth.js          # Authentication utilities
│   │   ├── App.jsx              # Main application component
│   │   └── main.jsx             # Application entry point
│   ├── package.json             # Frontend dependencies
│   └── .env                     # Environment variables
│
├── README.md                    # Project documentation
└── .gitignore                   # Git ignore rules
```

## 🔒 Security Considerations

- **Environment Variables**: All sensitive data stored in `.env` files
- **Password Security**: bcrypt hashing with salt rounds for password storage
- **JWT Security**: Tokens include expiration and are verified on each request
- **Input Validation**: Server-side validation for all user inputs
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Error Handling**: Secure error messages that don't expose system details

## 🧪 Testing the Application

1. **Start both servers** (backend on :5000, frontend on :5173)
2. **Navigate** to `http://localhost:5173`
3. **Create an account** using the signup form
4. **Login** with your credentials
5. **Test protected routes** using the test interface
6. **Try password reset** functionality

## 🚀 Deployment Ready

This application is structured for easy deployment to platforms like:
- **Backend**: Heroku, Railway, DigitalOcean, AWS
- **Frontend**: Vercel, Netlify, GitHub Pages
- **Database**: MongoDB Atlas, AWS DocumentDB

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](../../issues).

---

**Built with ❤️ for learning and development purposes**
