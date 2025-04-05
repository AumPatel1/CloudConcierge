const express = require('express');
const Sales = require('../models/Sales');
const verifyToken = require('../middlewares/verifyToken'); // Middleware to verify JWT token
const router = express.Router();

// POST route to save sales data (protected)
router.post('/', verifyToken, async (req, res) => {
    try {
        const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;
        
        // Create new sales record in the database
        const newSales = new Sales({
            userId: req.user.userId, // User ID from the JWT token
            monday, tuesday, wednesday, thursday, friday, saturday, sunday
        });

        await newSales.save();
        res.status(200).json({ message: 'Sales data submitted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving sales data', error });
    }
});

module.exports = router;
