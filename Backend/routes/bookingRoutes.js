// routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

router.post('/confirm', async (req, res) => {
    const { train_id, train_name, train_number, no_of_seats, name } = req.body;

    if (!train_id || !train_name || !train_number || !no_of_seats || !name) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newBooking = new Booking({
        train_id,
        train_name,
        train_number,
        no_of_seats,
        name
    });

    try {
        const booking = await newBooking.save();
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ error: 'Error saving booking' });
    }
});

module.exports = router;
