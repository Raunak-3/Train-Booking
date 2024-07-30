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
            const token = localStorage.getItem('authToken');
            const response = await axios.post('/api/trains/create', {
                train_name: trainName,
                train_number: trainNumber,
                source,
                destination,
                seat_capacity: seatCapacity,
                arrival_time_at_source: arrivalTimeAtSource,
                arrival_time_at_destination: arrivalTimeAtDestination
            }, {
                headers: {
                    'auth-token': token
                }
            });
    
            console.log(response.data);
            setAlertMessage('Train created successfully!');
            setAlertType('success');
        } catch (error) {
            console.error('Error creating train:', error.response ? error.response.data : error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            setAlertMessage('Failed to create train.');
            setAlertType('error');
        }
    };
    
    const handleUpdateTrain = async () => {
        try {
            const token = localStorage.getItem('authToken');
            const response = await axios.put('/api/trains/update', {
                train_id: trainId,
                train_name: trainName,
                train_number: trainNumber,
                source,
                destination,
                seat_capacity: seatCapacity,
                arrival_time_at_source: arrivalTimeAtSource,
                arrival_time_at_destination: arrivalTimeAtDestination
            }, {
                headers: {
                    'auth-token': token
                }
            });
    
            console.log(response.data);
            setAlertMessage('Train updated successfully!');
            setAlertType('success');
        } catch (error) {
            console.error('Error updating train:', error.response ? error.response.data : error.message);
            if (error.response) {
                console.error('Response data:', error.response.data);
                console.error('Response status:', error.response.status);
                console.error('Response headers:', error.response.headers);
            }
            setAlertMessage('Failed to update train.');
            setAlertType('error');
        }
    };
    

    return (
        <div>
            <h1>Admin Panel</h1>
            {alertMessage && (
                <div className={`alert ${alertType === 'success' ? 'alert-success' : 'alert-error'}`}>
                    {alertMessage}
                </div>
            )}
            <input type="text" value={trainName} onChange={(e) => setTrainName(e.target.value)} placeholder="Train Name" />
            <input type="number" value={trainNumber} onChange={(e) => setTrainNumber(e.target.value)} placeholder="Train Number" />
            <input type="text" value={source} onChange={(e) => setSource(e.target.value)} placeholder="Source" />
            <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
            <input type="number" value={seatCapacity} onChange={(e) => setSeatCapacity(e.target.value)} placeholder="Seat Capacity" />
            <input type="time" value={arrivalTimeAtSource} onChange={(e) => setArrivalTimeAtSource(e.target.value)} placeholder="Arrival Time at Source" />
            <input type="time" value={arrivalTimeAtDestination} onChange={(e) => setArrivalTimeAtDestination(e.target.value)} placeholder="Arrival Time at Destination" />
            <button onClick={handleCreateTrain}>Create Train</button>
            <h2>Update Train</h2>
            <input type="text" value={trainId} onChange={(e) => setTrainId(e.target.value)} placeholder="Train ID" />
            <button onClick={handleUpdateTrain}>Update Train</button>
            
        </div>
    );
};

export default Admin;
