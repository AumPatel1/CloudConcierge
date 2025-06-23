const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const multer = require('multer');
const Sales = require('../models/Sales');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// Multer setup for CSV upload
const upload = multer({ dest: 'uploads/' });

// POST: Save weekly sales
router.post('/', verifyToken, async (req, res) => {
  try {
    const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = req.body;

    const newSales = new Sales({
      userId: req.user.userId,
      monday, tuesday, wednesday, thursday, friday, saturday, sunday
    });

    await newSales.save();
    res.status(200).json({ message: 'Sales data submitted successfully!' });
  } catch (error) {
    console.error("Error saving sales:", error);
    res.status(500).json({ message: 'Error saving sales data', error });
  }
});

// GET: Fetch latest weekly sales
router.get('/', verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const latestSales = await Sales.find({ userId }).sort({ createdAt: -1 }).limit(1);
    if (!latestSales.length) {
      return res.status(404).json({ message: 'No sales data found for this user.' });
    }
    res.json(latestSales[0]);
  } catch (error) {
    console.error("Error fetching sales:", error);
    res.status(500).json({ message: 'Server error fetching sales data' });
  }
});

// POST: Upload a CSV file and save sales data
router.post('/upload-csv', verifyToken, upload.single('file'), async (req, res) => {
  try {
    const userId = req.user.userId;
    const filePath = req.file.path;
    const rows = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => rows.push(data))
      .on('end', async () => {
        const promises = rows.map(row => {
          const record = new Sales({
            userId,
            monday: parseInt(row.monday),
            tuesday: parseInt(row.tuesday),
            wednesday: parseInt(row.wednesday),
            thursday: parseInt(row.thursday),
            friday: parseInt(row.friday),
            saturday: parseInt(row.saturday),
            sunday: parseInt(row.sunday),
          });
          return record.save();
        });

        await Promise.all(promises);
        fs.unlinkSync(filePath); // Clean up uploaded file
        res.status(200).json({ message: 'CSV uploaded and sales saved successfully.' });
      });
  } catch (error) {
    console.error("CSV Upload Failed:", error);
    res.status(500).json({ message: 'Failed to upload CSV and save sales data.' });
  }
});

module.exports = router;
