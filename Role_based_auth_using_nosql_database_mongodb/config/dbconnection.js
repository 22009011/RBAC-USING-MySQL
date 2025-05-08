// config/dbconnection.js
const mysql = require('mysql2/promise');

let pool;

const dbConnect = async () => {
    try {
        pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 0
        });

        // Test the connection
        const connection = await pool.getConnection();
        console.log(`Database connected: ${process.env.DB_HOST}, ${process.env.DB_NAME}`);
        connection.release();
        
        return pool;
    } catch (err) {
        console.log('Database connection error:', err);
        process.exit(1);
    }
};

// Function to get the connection pool
const getPool = () => {
    if (!pool) {
        throw new Error('Database connection not initialized');
    }
    return pool;
};

module.exports = { dbConnect, getPool };