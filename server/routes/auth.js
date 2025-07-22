const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken'); // ✅ Make sure this is imported

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
    const { email, password, restaurantName, restaurantTypes, postalCode } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashed = await bcrypt.hash(password, 10);
        const newUser = new User({
            email,
            password: hashed,
            restaurantName,
            restaurantTypes,
            postalCode,
        });

        await newUser.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: newUser._id },
            'YOUR_SECRET_KEY',  // Use your actual secret key here, same as verifyToken.js
            { expiresIn: '1h' }
        );

        // Prepare user data to send (exclude password)
        const userData = {
            _id: newUser._id,
            email: newUser.email,
            restaurantName: newUser.restaurantName,
            restaurantTypes: newUser.restaurantTypes,
            postalCode: newUser.postalCode,
        };

        // Return success message, token, and user data
        res.status(201).json({
            message: 'User created successfully!',
            token,
            user: userData
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Login
// Login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id },
            'YOUR_SECRET_KEY',  // same secret key as signup and verifyToken middleware
            { expiresIn: '1h' }
        );

        // Prepare user data to send (exclude password)
        const userData = {
            _id: user._id,
            email: user.email,
            restaurantName: user.restaurantName,
            restaurantTypes: user.restaurantTypes,
            postalCode: user.postalCode,
        };

        // Return success message, token, and user data
        res.json({
            message: 'Login successful',
            token,
            user: userData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});



module.exports = router;
