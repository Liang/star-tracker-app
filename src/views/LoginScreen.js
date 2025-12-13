// src/views/LoginScreen.js

import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, signup } = useAuth(); // Access login/signup functions

    // Handle Login submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await login(email, password);
            // Success: AppContent will switch to Dashboard
        } catch (err) {
            setError('Login Failed. Check email/password.');
        }
    };

    // Handle Sign Up submission
    const handleSignUp = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await signup(email, password);
            // Success: User created, now automatically logged in
            // NOTE: In a real app, you would create the initial Firestore Household data here.
        } catch (err) {
            setError('Sign up Failed: ' + err.message);
        }
    };

    return (
        <div className="login-container">
            <h2>Parent Login / Setup</h2>
            <form onSubmit={handleLogin} className="login-form">
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                
                {error && <p className="error-message">{error}</p>}
                
                <button type="submit" className="login-btn">Log In</button>
                <button type="button" onClick={handleSignUp} className="signup-btn">
                    Create New Parent Account (Sign Up)
                </button>
            </form>
        </div>
    );
};

export default LoginScreen;
