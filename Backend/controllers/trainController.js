// controllers/trainController.js
const Train = require('../models/Train');

// const Train = require('../models/Train');

exports.createTrain = async (req, res) => {
    try {
        const { train_name, train_number, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination } = req.body;
        const newTrain = new Train({
            train_name,
            train_number,
            source,
            destination,
            seat_capacity,
            arrival_time_at_source,
            arrival_time_at_destination
        });
        const savedTrain = await newTrain.save();
        res.status(201).json(savedTrain);
    } catch (err) {
        res.status(500).json({ message: 'Error creating train', error: err });
    }
};

exports.updateTrain = async (req, res) => {
    try {
        const { train_id, train_name, train_number, source, destination, seat_capacity, arrival_time_at_source, arrival_time_at_destination } = req.body;
        const updatedTrain = await Train.findByIdAndUpdate(train_id, {
            train_name,
            train_number,
            source,
            destination,
            seat_capacity,
            arrival_time_at_source,
            arrival_time_at_destination
        }, { new: true });
        res.status(200).json(updatedTrain);
    } catch (err) {
        res.status(500).json({ message: 'Error updating train', error: err });
    }
};


exports.getTrainAvailability = async (req, res) => {
    const { source, destination } = req.query;

    try {
        const trains = await Train.find({ source, destination });
        if (trains.length === 0) {
            return res.status(404).json({ message: 'No trains found for this route' });
        }

        const availableTrains = trains.map(train => ({
            train_id: train._id,
            train_number: train.train_number,
            train_name: train.train_name,
            available_seats: train.seat_capacity - train.seats_booked
        }));

        res.status(200).json(availableTrains);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
