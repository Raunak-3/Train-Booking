import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import './Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login({ email, password });
            console.log('Login response:', response);
            if (response.status === 200) {
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('userEmail', email); // Store the email
                if (email === 'raunak3@gmail.com' && password === 'raunak3') {
                    localStorage.setItem('isAdmin', 'true');
                    navigate('/admin') 
                }
                else
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1>Login</h1>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
};

export default Login;
