// db-init.js
// Run this script once to set up your MySQL database tables
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');
dotenv.config();

async function initializeDatabase() {
    let connection;
    
    try {
        // Create connection to MySQL server
        connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD
        });
        
        console.log('Connected to MySQL server');
        
        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Database ${process.env.DB_NAME} created or already exists`);
        
        // Use the database
        await connection.query(`USE ${process.env.DB_NAME}`);
        
        // Create users table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS users1 (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                role ENUM('admin', 'teacher', 'parent','student') NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('Users table created or already exists');
        
        // Create questions table
        await connection.query(`
            CREATE TABLE IF NOT EXISTS questions (
                id INT AUTO_INCREMENT PRIMARY KEY,
                question TEXT NOT NULL,
                optionA VARCHAR(255) NOT NULL,
                optionB VARCHAR(255) NOT NULL,
                optionC VARCHAR(255) NOT NULL,
                optionD VARCHAR(255) NOT NULL,
                answer VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('Questions table created or already exists');
        
        console.log('Database initialization complete');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        if (connection) {
            await connection.end();
            console.log('Database connection closed');
        }
    }
}

initializeDatabase();