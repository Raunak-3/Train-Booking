import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const signup = (userData) => {
    return axios.post(`${API_URL}/users/signup`, userData);
};

export const login = (userData) => {
    return axios.post(`${API_URL}/users/login`, userData);
};

export const createTrain = (trainData) => {
    return axios.post('/api/trains/create', trainData, {
        headers: {
            'auth-token': localStorage.getItem('authToken') // Include token for authentication
        }
    });
};


export const updateTrain = (trainData) => {
    return axios.put('/api/trains/update', trainData, {
        
    });
};

export const getTrainAvailability = async (source, destination) => {
    return await axios.get(`${API_URL}/trains/availability`, {
        params: { source, destination },
        
    });
};

export const bookSeats = async (train_id, bookingData, token) => {
    return await axios.post(`${API_URL}/bookings/${train_id}/book`, bookingData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
};

// services/api.js
// import axios from 'axios';

export const confirmBooking = (bookingData) => {
    return axios.post('http://localhost:5000/api/bookings/confirm', bookingData);
};





export const createBooking = (bookingData) => {
    const token = localStorage.getItem('authToken');
    return axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};

export const getBookingDetails = (bookingId, token) => {
    return axios.get(`${API_URL}/bookings/${bookingId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
};
