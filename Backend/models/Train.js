const mongoose = require('mongoose');

const trainSchema = new mongoose.Schema({
    train_name: { type: String, required: true },
    train_number:{type:Number, required:true},
    source: { type: String, required: true },
    destination: { type: String, required: true },
    seat_capacity: { type: Number, required: true },
    seats_booked: { type: Number, default: 0 },
    arrival_time_at_source: { type: String, required: true },
    arrival_time_at_destination: { type: String, required: true }
},{collection: 'trainData'});

const Train = mongoose.model('Train', trainSchema, 'trainData');
module.exports = Train;


