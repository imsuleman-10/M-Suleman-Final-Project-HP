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
connectDB().then(seedAdmin);

const app = express();

app.use(cors());
app.use(express.json());

// Main route
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Import Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/enroll', require('./routes/enrollmentRoutes'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
