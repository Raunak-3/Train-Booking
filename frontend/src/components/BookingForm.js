import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmBooking } from '../services/api';
import './BookingForm.css';

const BookingForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { train_id, train_name, train_number, no_of_seats } = location.state || {};
    const [name, setName] = useState('');

    useEffect(() => {
        console.log('Location state:', location.state);
    }, [location.state]);

    if (!location.state) {
        return <div>Error: No booking information provided.</div>;
    }

    const handleConfirmBooking = async () => {
        try {
            const response = await confirmBooking({
                train_id,
                train_name,
                train_number,
                no_of_seats,
                name
            });
            if (response.status === 201) {
                alert('Booking confirmed!');
                navigate('/');
            }
        } catch (error) {
            console.error('Error confirming booking:', error);
            alert('Error confirming booking');
            navigate('/');
        }
    };

    return (
        <div className="booking-form-container">
            <div className="booking-form-box">
                <h1>Booking Form</h1>
                <p>Train ID: {train_id}</p>
                <p>Train Name: {train_name}</p>
                <p>Train Number: {train_number}</p>
                <p>Number of Seats: {no_of_seats}</p>
                <input type="text" value={train_id} readOnly placeholder="Train ID" />
                <input type="text" value={train_name} readOnly placeholder="Train Name" />
                <input type="text" value={train_number} readOnly placeholder="Train Number" />
                <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input type="number" value={no_of_seats} readOnly placeholder="Number of Seats" />
                <button onClick={handleConfirmBooking}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default BookingForm;
