import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrainList from '../components/TrainList.js';
import './logoutButton.css'

const Home = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <div>
            {isLoggedIn && <button className='logout-button' onClick={handleLogout}>Logout</button>}
            <TrainList />
        </div>
    );
};

export default Home;
