// components/Signup.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/api';
import './Signup.css';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await signup({ username, password, email });
            if (response.status === 201) {
                navigate('/login');
            } else {
                console.error('Unexpected response status:', response.status);
            }
        } catch (error) {
            console.error('Signup error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-box">
                <h1>Sign Up</h1>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <button onClick={handleSignup}>Sign Up</button>
                <p>Already a user? <button onClick={() => navigate('/login')}>Login</button></p>
            </div>
        </div>
    );
};

export default Signup;
