// controllers/questionController.js
const { getPool } = require('../config/dbconnection');

// Add Question
const addQuestion = async (req, res) => {
    try {
        const { question, optionA, optionB, optionC, optionD, answer } = req.body;
        const pool = getPool();

        // Validate input
        if (!question || !optionA || !optionB || !optionC || !optionD || !answer) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new question using raw SQL
        const [result] = await pool.execute(
            'INSERT INTO questions (question, optionA, optionB, optionC, optionD, answer) VALUES (?, ?, ?, ?, ?, ?)',
            [question, optionA, optionB, optionC, optionD, answer]
        );

        // Get the newly created question
        const [newQuestion] = await pool.execute(
            'SELECT * FROM questions WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({ 
            message: 'Question added successfully', 
            question: newQuestion[0] 
        });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Update a question
const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from the URL
        const { question, optionA, optionB, optionC, optionD, answer } = req.body;
        const pool = getPool();

        // Validate input
        if (!question || !optionA || !optionB || !optionC || !optionD || !answer) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if question exists
        const [existingQuestion] = await pool.execute(
            'SELECT id FROM questions WHERE id = ?',
            [id]
        );

        if (existingQuestion.length === 0) {
            return res.status(404).json({ message: "Question not found" });
        }

        // Update the question
        await pool.execute(
            'UPDATE questions SET question = ?, optionA = ?, optionB = ?, optionC = ?, optionD = ?, answer = ? WHERE id = ?',
            [question, optionA, optionB, optionC, optionD, answer, id]
        );

        // Get the updated question
        const [updatedQuestion] = await pool.execute(
            'SELECT * FROM questions WHERE id = ?',
            [id]
        );

        res.status(200).json({ 
            message: "Question updated successfully", 
            question: updatedQuestion[0] 
        });
    } catch (err) {
        console.error('Error updating question:', err);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all questions
const getAllQuestions = async (req, res) => {
    try {
        const pool = getPool();
        
        const [questions] = await pool.execute('SELECT * FROM questions');
        
        res.status(200).json({ questions });
    } catch (error) {
        console.error('Error getting questions:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Get a single question by ID
const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();
        
        const [question] = await pool.execute(
            'SELECT * FROM questions WHERE id = ?',
            [id]
        );
        
        if (question.length === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        res.status(200).json({ question: question[0] });
    } catch (error) {
        console.error('Error getting question:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Delete a question
const deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = getPool();
        
        // Check if question exists
        const [existingQuestion] = await pool.execute(
            'SELECT id FROM questions WHERE id = ?',
            [id]
        );
        
        if (existingQuestion.length === 0) {
            return res.status(404).json({ message: 'Question not found' });
        }
        
        // Delete the question
        await pool.execute('DELETE FROM questions WHERE id = ?', [id]);
        
        res.status(200).json({ message: 'Question deleted successfully' });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { 
    addQuestion, 
    updateQuestion,
    getAllQuestions,
    getQuestionById,
    deleteQuestion
};