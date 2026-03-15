# 🎓 Hunarmand - Full Fledged MERN Stack LMS

## 🌟 Project Overview
**Hunarmand** is a comprehensive, industry-standard Learning Management System (LMS) built on the MERN stack. It provides a robust platform for students to learn and instructors to monetize their knowledge. The application features a stunning glassmorphism UI/UX design, secure role-based access control, and a scalable architecture.

Key user roles include:
- **Admin**: Full system oversight, user management, and global course control.
- **Instructor**: Course creation, management, and content delivery (Video/Text).
- **Student**: Course discovery, seamless enrollment, and personalized progress tracking.

---

## 🚀 Key Features

### 🔐 User Roles & Authorization
- **Role-Based Access**: Specialized dashboards for Admins, Instructors, and Students.
- **JWT Protection**: Secure, stateless authentication for all interactive portals.
- **Authorized Actions**: Instructors can only manage their own content; Admins have global permissions.

### 🎨 Premium UI/UX Experience
- **Glassmorphism Design**: Modern, sleek, and high-quality visual components with blurred effects and gradients.
- **Responsive Layout**: Fully optimized for various screen sizes using Bootstrap grids.
- **Dynamic Content**: Live search filtering, staggered entrance animations, and interactive tabs.

### 📚 Course Management
- **Rich Lesson Content**: Support for both video references and textual lessons.
- **Personalized Dashboards**: Students can track their progress through enrolled courses in real-time.
- **Course Catalog**: A detailed, searchable catalog with categories and pricing.

---

## 🛠️ Technologies Used

### Frontend
- **React.js**: Robust UI with functional components and hooks.
- **React Router 7**: Modern routing with data APIs.
- **Axios**: Promised-based HTTP client for API interactions.
- **Bootstrap / React-Bootstrap**: Professional grid system and accessible components.
- **Lucide React**: High-quality SVG icons for a premium feel.

### Backend
- **Node.js**: Event-driven runtime for high performance.
- **Express.js**: Fast, unopinionated web framework for the API layer.
- **MongoDB & Mongoose**: Scalable NoSQL database with elegant object modeling.
- **JSON Web Token (JWT)**: Secure identity management.
- **Bcryptjs**: Industrial-grade password hashing.
- **Dotenv**: Secure management of environment variables.

---

## 📁 Folder Structure

```text
/
├── backend/            # Express.js Server
│   ├── config/         # DB Connection logic
│   ├── controllers/    # Business logic handlers
│   ├── middleware/     # Auth & Error middlewares
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API endpoints
│   └── server.js       # Entry point
└── frontend/           # React App (Vite)
    ├── public/         # Static assets
    └── src/
        ├── components/ # Reusable UI blocks
        ├── context/    # Global State (Auth)
        ├── pages/      # Page containers
        ├── services/   # Backend API calls
        └── App.jsx     # Main routing
```

---

## ⚙️ Quick Start

### 1. Prerequisite
- Node.js (v18+)
- MongoDB (Local or Atlas)

### 2. Backend Setup
```bash
cd backend
npm install
# Create a .env file based on the config requirements:
# PORT=5000, MONGO_URI, JWT_SECRET
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

---

## 🔒 Default Admin Credentials
For testing and initial setup:
- **Email**: `sam@gmail.com`
- **Password**: `1234`

---

## 📸 Technical Considerations
- **Error Handling**: Comprehensive try-catch blocks with user-friendly alerts.
- **Restful API**: Clean endpoint structure following industry standards.
- **Performance**: Optimized for fast loading and smooth transitions.
