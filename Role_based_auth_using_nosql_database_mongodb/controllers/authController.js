// controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getPool } = require('../config/dbconnection');

// Number of salt rounds for hashing passwords
const saltNum = 12;

// Register a new user
const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const pool = getPool();

        // Validate input
        if (!username || !password || !role) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if role is valid
        if (!['admin', 'teacher','parent','student'].includes(role)) {
            return res.status(400).json({ message: 'Invalid role' });
        }

        // Check if the username already exists
        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE username = ?',
            [username]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltNum);

        // Create a new user
        const [result] = await pool.execute(
            'INSERT INTO users1 (username, password, role) VALUES (?, ?, ?)',
            [username, hashedPassword, role]
        );

        res.status(201).json({ message: `${role} registered with username ${username}` });
    } catch (err) {
        console.error(err); // Log the error for debugging
        res.status(500).json({ message: 'Something went wrong during registration' });
    }
};

const login = async (req, res) => {
    try {
        // Destructure and validate request body
        const { username, password } = req.body;
        const pool = getPool();

        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user in the database
        const [users] = await pool.execute(
            'SELECT id, username, password, role FROM users1 WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: `User with username ${username} not found` });
        }

        const user = users[0];

        // Compare input password with stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if JWT secret is defined
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined');
            return res.status(500).json({ message: 'Server configuration error: Missing JWT_SECRET' });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role }, // Payload
            jwtSecret,                        // Secret key
            { expiresIn: '7d' }               // Token expiration
        );

        // Send success response with token
        res.status(200).json({
            message: 'Login successful',
            token,
            user: { username: user.username, role: user.role }
        });
    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: 'Something went wrong during login' });
    }
};

module.exports = { register, login };