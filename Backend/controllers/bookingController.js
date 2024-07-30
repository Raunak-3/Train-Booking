const Booking = require('../models/Booking');
const Train = require('../models/Train');

exports.bookSeats = async (req, res) => {
    const { user_id, no_of_seats } = req.body;
    const { train_id } = req.params;

    try {
        const train = await Train.findById(train_id);
        if (!train) {
            return res.status(404).json({ message: 'Train not found' });
        }

        if (train.seat_capacity - train.seats_booked < no_of_seats) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }

        const seatNumbers = [];
        for (let i = 0; i < no_of_seats; i++) {
            seatNumbers.push(train.seats_booked + i + 1);
        }
        train.seats_booked += no_of_seats;
        await train.save();

        const newBooking = new Booking({
            user_id,
            train_id,
            train_number: train.train_number,
            train_name: train.train_name,
            no_of_seats,
            seat_numbers,
            arrival_time_at_source: train.arrival_time_at_source,
            arrival_time_at_destination: train.arrival_time_at_destination
        });

        await newBooking.save();
        res.status(200).json({ message: 'Seat booked successfully', booking_id: newBooking._id, seat_numbers });
    } catch (error) {
        console.error('Error booking seat:', error);
        res.status(400).json({ message: 'Error booking seat', error });
    }
};



exports.confirmBooking = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const { train_id, no_of_seats, seat_numbers, arrival_time_at_source, arrival_time_at_destination } = req.body;

        if (!train_id || !no_of_seats || !seat_numbers || !arrival_time_at_source || !arrival_time_at_destination) {
            return res.status(400).json({ error: 'Required fields are missing' });
        }

        const train = await Train.findById(train_id);
        if (!train) {
            return res.status(404).json({ error: 'Train not found' });
        }

        if (train.seat_capacity - train.seats_booked < no_of_seats) {
            return res.status(400).json({ error: 'Not enough seats available' });
        }

        const booking = new Booking({
            user_id: req.user._id,
            train_id,
            train_number: train.train_number,
            train_name: train.train_name,
            no_of_seats,
            seat_numbers,
            arrival_time_at_source: new Date(arrival_time_at_source),
            arrival_time_at_destination: new Date(arrival_time_at_destination)
        });

        await booking.save();

        train.seats_booked += no_of_seats;
        await train.save();

        res.status(201).json({ message: 'Booking confirmed', booking });

    } catch (error) {
        console.error('Error confirming booking:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};





