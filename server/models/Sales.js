const mongoose = require('mongoose');

const salesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    monday: { type: Number, required: true },
    tuesday: { type: Number, required: true },
    wednesday: { type: Number, required: true },
    thursday: { type: Number, required: true },
    friday: { type: Number, required: true },
    saturday: { type: Number, required: true },
    sunday: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Sales', salesSchema);
