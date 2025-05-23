// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return next();
    }
    
    let token;
    const authHeader = req.headers['authorization'];
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    
    if (!token) {
        return res.status(401).json({ message: "No Token, Authorization Denied" });
    }
    
    try {
        // Try decoding the token first for debugging purposes
        const decoded = jwt.decode(token); 
        if (!decoded) {
            return res.status(400).json({ message: "Malformed token" });
        }
        
        // Verify the token using the JWT_SECRET
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log("Decoded User:", req.user);
        
        next(); // Continue to the next middleware/route handler
    } catch (err) {
        console.error("JWT Verification Error:", err.message);
        
        // Handle specific errors more gracefully
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired, please log in again" });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(400).json({ message: "Invalid token" });
        } else if (err.name === 'NotBeforeError') {
            return res.status(400).json({ message: "Token not active yet" });
        }
        
        return res.status(500).json({ message: "Token verification failed" });
    }
};

module.exports = verifyToken;

