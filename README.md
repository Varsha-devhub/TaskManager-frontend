# 📝 Task Manager Frontend (MERN Stack)

A full-stack task management application with secure authentication, email-based password reset, and real-world deployment setup.

🔗 Live Demo: https://task-manager-frontend-lemon-ten.vercel.app  
🔗 Backend Repo: https://github.com/Varsha-devhub/TaskManagerBackend  

---

## ✨ Features

- 🔐 User Authentication (JWT-based)
- 🔑 Secure Login & Registration
- 📧 Password Reset via Email (Token-based)
- ✅ Create, Update, Delete Tasks (CRUD)
- 🔒 Protected Routes
- ⚡ Real-time UI updates with React state
- 📱 Responsive UI design
- 🚫 Error handling & loading states

---

##  Tech Stack
### Frontend:
- React.js
- JavaScript (ES6+)
- Tailwind CSS
- Axios
- React Router
- Context API

### Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

### Tools & Deployment:
- Vercel (Frontend)
- Render (Backend)
- Mailtrap (Email testing)
- Git & GitHub

---
##  Authentication Flow
- User registers with email & password  
- Password is securely hashed using bcrypt  
- JWT token is generated on login  
- Protected routes require valid token  
- Password reset uses token-based email verification  

--- 

## What I Learned
  Handling real-world deployment issues (API routing, env configs)
  Debugging frontend-backend integration
  Managing async operations and error states in React
  Secure authentication flow using JWT

--- 

## Challenges Faced
  Fixing API connection issues after deployment
  Managing environment variables in production
  Handling email service failures
  Ensuring secure authentication flow

--- 

##  Environment Variables

Create a .env file:
VITE_API_URL=https://auth-backend-3kx0.onrender.com

--- 

##  Installation

git clone https://github.com/Varsha_devhub/TaskManager-frontend.git
cd TaskManager-frontend
npm install
npm run dev

--- 

## 🌐 Backend API

This frontend connects to:

👉 https://auth-backend-3kx0.onrender.com

--- 

## 📸 Screenshots

### Login Page
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Reset Password
![Reset](./screenshots/reset.png)

--- 

## 👨‍💻 Author

* Varsha
* GitHub: https://github.com/Varsha-devhub


