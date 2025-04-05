const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const salesRoutes = require('./routes/sales');
const app = express();

// CORS configuration
const corsOptions = {
  origin: '*', // Allow frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/sales', salesRoutes); // Sales routes

// MongoDB connection
mongoose.connect('mongodb+srv://CloudConcierge:GeekSquad@cloudconcierge.tebviqc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB:', err));

// Start the server
app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
