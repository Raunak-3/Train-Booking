import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
    const navigate = useNavigate();
    const [trainName, setTrainName] = useState('');
    const [trainNumber, setTrainNumber] = useState('');
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [seatCapacity, setSeatCapacity] = useState('');
    const [seatsBooked, setSeatsBooked] = useState(0);
    const [arrivalTimeAtSource, setArrivalTimeAtSource] = useState('');
    const [arrivalTimeAtDestination, setArrivalTimeAtDestination] = useState('');
    const [trainId, setTrainId] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin') === 'true';
        if (!isAdmin) {
            navigate('/login');
        }
    }, [navigate]);

    const handleCreateTrain = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/trains/create', {
                train_name: trainName,
                train_number: trainNumber,
                source,
                destination,
                seat_capacity: seatCapacity,
                seats_booked: seatsBooked,
                arrival_time_at_source: arrivalTimeAtSource,
                arrival_time_at_destination: arrivalTimeAtDestination
            });

            console.log(response.data);
            setAlertMessage('Train created successfully!');
            setAlertType('success');
        } catch (error) {
            console.error('Error creating train:', error.response ? error.response.data : error.message);
            setAlertMessage('Failed to create train.');
            setAlertType('error');
        }
    };

    const handleUpdateTrain = async () => {
        try {
            const response = await axios.put('http://localhost:5000/api/trains/update', {
                train_id: trainId,
                train_name: trainName,
                train_number: trainNumber,
                source,
                destination,
                seat_capacity: seatCapacity,
                seats_booked: seatsBooked,
                arrival_time_at_source: arrivalTimeAtSource,
                arrival_time_at_destination: arrivalTimeAtDestination
            });

            console.log(response.data);
            setAlertMessage('Train updated successfully!');
            setAlertType('success');
        } catch (error) {
            console.error('Error updating train:', error.response ? error.response.data : error.message);
            setAlertMessage('Failed to update train.');
            setAlertType('error');
        }
    };

    const handleFetchTrain = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/trains/${trainId}`);
            const train = response.data;
            setTrainName(train.train_name);
            setTrainNumber(train.train_number);
            setSource(train.source);
            setDestination(train.destination);
            setSeatCapacity(train.seat_capacity);
            setSeatsBooked(train.seats_booked);
            setArrivalTimeAtSource(train.arrival_time_at_source);
            setArrivalTimeAtDestination(train.arrival_time_at_destination);
        } catch (error) {
            console.error('Error fetching train:', error.response ? error.response.data : error.message);
            setAlertMessage('Failed to fetch train details.');
            setAlertType('error');
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Admin Panel</h1>
            {alertMessage && (
                <div style={alertType === 'success' ? styles.alertSuccess : styles.alertError}>
                    {alertMessage}
                </div>
            )}
            <div style={styles.formGroup}>
                <input type="text" value={trainName} onChange={(e) => setTrainName(e.target.value)} placeholder="Train Name" style={styles.input} />
                <input type="number" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} placeholder="Train Number" style={styles.input} />
                <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" style={styles.input} />
                <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" style={styles.input} />
                <input type="number" value={seatCapacity} onChange={(e) => setSeatCapacity(e.target.value)} placeholder="Seat Capacity" style={styles.input} />
                <input type="number" value={seatsBooked} onChange={(e) => setSeatsBooked(e.target.value)} placeholder="Seats Booked" style={styles.input} />
                <input type="time" value={arrivalTimeAtSource} onChange={(e) => setArrivalTimeAtSource(e.target.value)} placeholder="Arrival Time at Source" style={styles.input} />
                <input type="time" value={arrivalTimeAtDestination} onChange={(e) => setArrivalTimeAtDestination(e.target.value)} placeholder="Arrival Time at Destination" style={styles.input} />
                <button onClick={handleCreateTrain} style={styles.button}>Create Train</button>
            </div>
            <h2 style={styles.subHeader}>Update Train</h2>
            <div style={styles.formGroup}>
                <input type="text" value={trainId} onChange={(e) => setTrainId(e.target.value)} placeholder="Train ID" style={styles.input} />
                <button onClick={handleFetchTrain} style={styles.button}>Fetch Train Details</button>
                <button onClick={handleUpdateTrain} style={styles.button}>Update Train</button>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'Black',
        padding: '20px',
        backgroundImage: 'url("/hamish-awMC2MBbYn8-unsplash.jpg")'
    },
    header: {
        fontSize: '2.5rem',
        color: '#378'
    },
    subHeader: {
        fontSize: '2rem',
        color: '#555',
        marginTop: '30px'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: '500px'
    },
    input: {
        width: '100%',
        padding: '10px',
        margin: '10px 0',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '1rem'
    },
    button: {
        padding: '10px 20px',
        marginTop: '20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        fontSize: '1rem',
        cursor: 'pointer'
    },
    alertSuccess: {
        color: 'green',
        marginBottom: '20px'
    },
    alertError: {
        color: 'red',
        marginBottom: '20px'
    }
};

export default Admin;
