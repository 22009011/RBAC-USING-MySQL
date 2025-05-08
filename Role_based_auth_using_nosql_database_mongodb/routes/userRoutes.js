// const express = require('express');
// const router = express.Router();
// const verifyToken = require('../middleware/authMiddleware');
// const authorizeRole = require('../middleware/roleMiddleware');

// router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
//     res.json({ message: 'Welcome Admin' });
// });

// router.get('/manager', verifyToken, authorizeRole('admin', 'teacher'), (req, res) => {
//     res.json({ message: 'Welcome teacher' });
// });

// router.get('/user', verifyToken, authorizeRole('admin', 'parent', 'student','teacher'), (req, res) => {
//     res.json({ message: 'Welcome User' });
// });

// module.exports = router;





const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// Route for admin dashboard 
router.get('/admin', verifyToken, authorizeRole('admin'), (req, res) => {
    res.json({
        success: true,
        role: 'admin',
        redirectUrl: '/admin-dashboard'
    });
});

// Route for manager/teacher dashboard 
router.get('/manager', verifyToken, authorizeRole('admin', 'teacher'), (req, res) => {
    res.json({
        success: true,
        role: 'teacher',
        redirectUrl: '/teacher-dashboard'
    });
});

// Route for general user dashboard - will determine role from token
router.get('/user', verifyToken, authorizeRole('admin', 'parent', 'student', 'teacher'), (req, res) => {
    // Get user's role from the JWT token (assuming it's passed in req.user)
    const userRole = req.user.role;
    let redirectUrl;
    
    // Determine redirect URL based on role
    switch(userRole) {
        case 'admin':
            redirectUrl = '/admin-dashboard';
            break;
        case 'teacher':
            redirectUrl = '/teacher-dashboard';
            break;
        case 'parent':
            redirectUrl = '/parent-dashboard';
            break;
        case 'student':
            redirectUrl = '/student-dashboard';
            break;
        default:
            redirectUrl = '/dashboard'; // Default dashboard
    }
    
    res.json({
        success: true,
        role: userRole,
        redirectUrl: redirectUrl
    });
});

module.exports = router;