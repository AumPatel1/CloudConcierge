const express = require('express');
const axios = require('axios');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const Sales = require('../models/Sales');

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

router.get('/predict-sales', verifyToken, async (req, res) => {
  try {
    const latitude = 45.4215;
    const longitude = -75.6972;
    const userId = req.user.userId; // From JWT

    // Calculate last week's Monday to Sunday
    const today = new Date();
    const dayOfWeek = today.getDay();
    const diffToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    today.setDate(today.getDate() - diffToMonday - 7);
    const start = new Date(today);
    const end = new Date(today);
    end.setDate(end.getDate() + 6);
    const formatDate = (d) => d.toISOString().split("T")[0];

    // Fetch weather data
    const weatherUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${formatDate(start)}&end_date=${formatDate(end)}&daily=temperature_2m_mean&timezone=auto`;
    const weatherRes = await axios.get(weatherUrl);
    const temps = weatherRes.data.daily.temperature_2m_mean;

    // Fetch user sales data
    const userSales = await Sales.findOne({ userId });
    let weeklySalesAvg = {
      Monday: 0, Tuesday: 0, Wednesday: 0, Thursday: 0, Friday: 0, Saturday: 0, Sunday: 0
    };

    if (userSales) {
      weeklySalesAvg = {
        Monday: userSales.monday,
        Tuesday: userSales.tuesday,
        Wednesday: userSales.wednesday,
        Thursday: userSales.thursday,
        Friday: userSales.friday,
        Saturday: userSales.saturday,
        Sunday: userSales.sunday
      };
    }

    // Generate predictions
    const results = [];
    for (let i = 0; i < 7; i++) {
      const modelRes = await axios.post('https://aumpatel-predictingmodel.hf.space/predict', {
        day: days[i],
        temperature: temps[i]
      });

      const modelPrediction = modelRes.data.prediction;
      const salesValue = weeklySalesAvg[days[i]] || 0;
      const finalPrediction = Math.round((modelPrediction + salesValue) / 2);
      const rushLevel = finalPrediction >= 100 ? 'High' : finalPrediction >= 60 ? 'Medium' : 'Low';

      results.push({
        day: days[i],
        expectedGuests: finalPrediction,
        rushLevel,
        peakTime: '6:30 PM - 8:00 PM'
      });
    }

    res.json({
      lastUpdated: new Date().toLocaleString(),
      days: results
    });

  } catch (err) {
    console.error('Prediction failed:', err.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

module.exports = router;
