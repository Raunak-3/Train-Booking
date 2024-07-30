import React from 'react';
import { useLocation } from 'react-router-dom';
import './BookingDetails.css';

const BookingDetails = () => {
    const location = useLocation();
    const { booking } = location.state;

    return (
        <div className="booking-details-container">
            <div className="booking-details-box">
                <h1>Booking Details</h1>
                <p>Booking ID: {booking.booking_id}</p>
                <p>Train Name: {booking.train_name}</p>
                <p>Number of Seats: {booking.no_of_seats}</p>
                <p>Seat Numbers: {booking.seat_numbers.join(', ')}</p>
                <p>Arrival Time at Source: {booking.arrival_time_at_source}</p>
                <p>Arrival Time at Destination: {booking.arrival_time_at_destination}</p>
            </div>
        </div>
    );
};

export default BookingDetails;
