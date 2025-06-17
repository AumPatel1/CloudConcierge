// server/routes/prediction.js
const express = require('express');
const router = express.Router();
const Sales = require('../models/Sales');
const axios = require('axios');

function calculatePrediction(salesData, temperature) {
  const avg = salesData.reduce((sum, val) => sum + val, 0) / salesData.length;
  const adjustment = temperature > 20 ? 1.1 : 0.9; // example adjustment
  return Math.round(avg * adjustment);
}

router.get('/predict-sales', async (req, res) => {
  try {
    const recentSales = await Sales.find().sort({ createdAt: -1 }).limit(2);
    if (recentSales.length < 2) return res.status(400).json({ error: 'Not enough data' });

    const allValues = recentSales.flatMap(week =>
      ['monday','tuesday','wednesday','thursday','friday','saturday','sunday'].map(day => week[day])
    );

    const weatherRes = await axios.get('https://api.open-meteo.com/v1/forecast?latitude=45.4215&longitude=-75.6996&current_weather=true');
    const temperature = weatherRes.data.current_weather.temperature;

    const predictionPerDay = Array.from({ length: 7 }, (_, i) => ({
      day: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][i],
      rushLevel: 'Medium', // placeholder
      expectedGuests: calculatePrediction(allValues, temperature),
      peakTime: '6:30 PM - 8:00 PM'
    }));

    res.json({
      lastUpdated: new Date().toLocaleString(),
      days: predictionPerDay
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Prediction failed' });
  }
});

module.exports = router;
