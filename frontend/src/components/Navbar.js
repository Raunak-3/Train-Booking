// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const isAdmin = localStorage.getItem('isAdmin') === 'true'; // Retrieve admin status from local storage

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('isAdmin');
        navigate('/login');
    };

    return (
        <nav>
            {!isAdmin && <Link to="/">Home</Link>}
            {!isAdmin && <Link to="/signup">Signup</Link>}
            {!isAdmin && <Link to="/login">Login</Link>}
            {isAdmin && <Link to="/admin">Admin</Link>}
            {isAdmin && <button onClick={handleLogout}>Logout</button>}
        </nav>
    );
};

export default Navbar;
