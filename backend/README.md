# ⚙️ Hunarmand - Backend API

This is the backend server for the **Hunarmand LMS**, built with **Node.js**, **Express**, and **MongoDB**. It provides a secure and scalable RESTful API for managing users, courses, and enrollments.

## 🚀 Key Technologies
- **Node.js**: Server-side runtime.
- **Express.js**: Fast and minimalist web framework.
- **MongoDB & Mongoose**: NoSQL database and object modeling.
- **JSON Web Token (JWT)**: Secure authentication and authorization.
- **Bcryptjs**: Password hashing for security.
- **CORS**: Cross-Origin Resource Sharing for frontend compatibility.

## 📁 Folder Structure
```text
/
├── config/      # Database connection configuration (db.js)
├── controllers/ # Logic for handling API requests
├── middleware/  # Authentication and error handling middlewares
├── models/      # Mongoose schemas (User.js, Course.js, etc.)
├── routes/      # Definition of API endpoints
└── server.js    # Main entry point of the server
```

## ⚙️ Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Environment Variables**
   Create a `.env` file in this directory with the following variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=admin_password
   ```

3. **Run the Server**
   - **Development Mode** (with nodemon):
     ```bash
     npm run dev
     ```
   - **Production Mode**:
     ```bash
     npm start
     ```
   The API will be accessible at `http://localhost:5000`.

## 🔗 Related Resources
- [Main Project README](../README.md)
- [Frontend Documentation](../frontend/README.md)
