const express = require('express');
const router = express.Router();
const { 
    addQuestion, 
    updateQuestion, 
    getAllQuestions, 
    getQuestionById, 
    deleteQuestion 
} = require('../controllers/questionController');
const verifyToken = require('../middleware/authMiddleware');
const authorizeRole = require('../middleware/roleMiddleware');

// Get all questions (accessible to all authenticated users)
router.get('/', verifyToken, getAllQuestions);

// Get a single question by ID (accessible to all authenticated users)
router.get('/:id', verifyToken, getQuestionById);

// Add a question (Admin only)
router.post('/', verifyToken, authorizeRole('admin'), addQuestion);

// Update a question (Admin only)
router.put('/:id', verifyToken, authorizeRole('admin'), updateQuestion);

// Delete a question (Admin only)
router.delete('/:id', verifyToken, authorizeRole('admin'), deleteQuestion);

// Test route
router.get('/test', (req, res) => {
    res.status(200).json({ message: "Questions route is working!" });
});

module.exports = router;