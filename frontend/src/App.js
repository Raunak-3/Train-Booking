import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Navbar from './components/Navbar';
import BookingForm from './components/BookingForm.js';
import BookingDetails from './components/BookingDetails.js';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/booking" element={<BookingForm />} />
                <Route path="/booking-details" element={<BookingDetails />} />
            </Routes>
        </>
    );
}

export default App;
