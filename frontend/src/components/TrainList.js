import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTrainAvailability } from '../services/api';
import './Trainlist.css';

const TrainList = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [seats, setSeats] = useState({});
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleSearch = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await getTrainAvailability(source, destination);
            console.log('Train Availability Response:', response.data);
            setTrains(response.data);
        } catch (error) {
            setError("Failed to fetch train data. Please try again.");
            console.error("Error fetching train availability:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = (train_id, train_name, train_number) => {
        if (!isLoggedIn) {
            alert('User is not authenticated. Please login.');
            navigate('/login');
            return;
        }

        navigate('/booking', {
            state: {
                train_id,
                train_name,
                train_number,
                no_of_seats: seats[train_id] // Default to 1 if no input
            }
        });
    };

    const handleSeatsChange = (train_id, value) => {
        console.log(`Changing seats for train ${train_id} to ${value}`); // Debug log
        setSeats(prevSeats => ({
            ...prevSeats,
            [train_id]: parseInt(value) // Default to 1 if NaN
        }));
    };

    return (
        <div className="trainlist-container">
            <div className="trainlist-box">
                <h1>Train Search</h1>
                <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Source"
                />
                <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Destination"
                />
                <button onClick={handleSearch} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {trains.length === 0 && !loading && <p>No trains found.</p>}
                <ul>
                    {trains.map(train => (
                        <li key={train.train_id}>
                            Train Number: {train.train_number} - Train Name: {train.train_name} - Available Seats: {train.available_seats}
                            {isLoggedIn && (
                                <>
                                    <p style={{ display: 'flex', alignItems: 'center' }}>
                                        Total Seats to Book: 
                                        <input
                                            type="number"
                                            value={seats[train.train_id] || ''}
                                            onChange={(e) => handleSeatsChange(train.train_id, e.target.value)}
                                            min="1"
                                            max={train.available_seats}
                                            placeholder="Seats"
                                            style={{ marginLeft: '10px' }}
                                        />
                                    </p>
                                    <button onClick={() => handleBooking(train.train_id, train.train_name, train.train_number)}>Book</button>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default TrainList;
