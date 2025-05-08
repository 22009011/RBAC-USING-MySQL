// server.js
const express = require('express');
const dotenv = require('dotenv').config();
const corsMiddleware = require('./middleware/corsMiddleware');
const app = express();

// Apply CORS middleware first
app.use(corsMiddleware);

// Import routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

// Import database connection
const { dbConnect } = require('./config/dbconnection');

// Connect to database
dbConnect().then(() => {
    console.log('Database connection established');
}).catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

// Built-in middleware for handling requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/questions', questionRoutes);

// Server start
const PORT = process.env.PORT || 7001;

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});