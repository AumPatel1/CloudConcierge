const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const salesRoutes = require('./routes/sales');
const predictionRoute = require('./routes/predict_sales');
const app = express();
const fetch = require('node-fetch'); // npm install node-fetch if not already

// CORS configuration
const corsOptions = {
  origin: '*', // Allow all origins or specify frontend URL here for more security
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Include OPTIONS for preflight
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200, // For legacy browsers
};

// Use CORS middleware
app.use(cors(corsOptions));

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/predict', predictionRoute);

app.post('/proxy/predict', async (req, res) => {
  console.log('➡️ Proxy received:', req.body); // Log incoming data

  try {
    const response = await fetch('https://aumpatel-predictingmodel.hf.space/predict', {
      method: 'POST',
      headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"  // Optional but safe
  },
      body: JSON.stringify(req.body),
    });

    const text = await response.text(); // Read raw response
    console.log('⬅️ Response from model:', text); // Log what came back

    try {
      const data = JSON.parse(text);
      res.json(data); // Send response to frontend
    } catch (parseError) {
      console.error(' Failed to parse JSON from 8181:', text);
      res.status(500).json({ error: 'Invalid JSON from prediction server' });
    }
  } catch (error) {
    console.error(' Error forwarding to 8181/predict:', error);
    res.status(500).json({ error: 'Prediction server error' });
  }
});



// MongoDB connection
mongoose.connect('mongodb+srv://CloudConcierge:GeekSquad@cloudconcierge.tebviqc.mongodb.net/cloudconcierge?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
