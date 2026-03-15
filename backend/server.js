require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL || 'sam@gmail.com';
        const adminPass = process.env.ADMIN_PASSWORD || '1234';
        const adminExists = await User.findOne({ email: adminEmail });
        if (!adminExists) {
            await User.create({
                name: 'Sam',
                email: adminEmail,
                password: adminPass,
                role: 'Admin'
            });
            console.log('Admin user seeded');
        }
    } catch (err) {
        console.error('Failed to seed admin user:', err.message);
    }
};

// Connect to MongoDB
connectDB()
    .then(() => {
        console.log('Database connected successfully');
        seedAdmin();
    })
    .catch(err => {
        console.error('CRITICAL: Database connection failed:', err.message);
        // Don't process.exit here on Vercel, just log it so we can see it in dashboard
    });

const app = express();

// ... existing middleware ...
app.use(cors());
app.use(express.json());

// Diagnostic logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Health check and environment check
app.get('/api/health', (req, res) => {
    const dbState = require('mongoose').connection.readyState;
    const states = ['Disconnected', 'Connected', 'Connecting', 'Disconnecting'];
    res.json({
        status: 'UP',
        dbState: states[dbState] || 'Unknown',
        timestamp: new Date().toISOString(),
        node_env: process.env.NODE_ENV
    });
});

// Root route
app.get('/', (req, res) => {
    res.send('Hunarmand API is running...');
});

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enroll', require('./routes/enrollmentRoutes'));

// Global error handler
app.use((err, req, res, next) => {
    console.error('GLOBAL ERROR:', err.stack);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

module.exports = app;
