// models/Booking.js
const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    train_id: {
        type: String,
        required: true
    },
    train_name: {
        type: String,
        required: true
    },
    train_number: {
        type: String,
        required: true
    },
    no_of_seats: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    booking_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Booking', BookingSchema);
