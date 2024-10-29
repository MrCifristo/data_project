import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage.jsx';
import Profile from './components/Profile.jsx';
import Meals from './components/Meals.jsx';

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            setUser({ token });
        } else {
            setUser(null);
        }
    }, []);

    const handleLogin = (userData, rememberMe) => {
        setUser(userData);
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', userData.token);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
    };

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
                <Routes>
                    <Route path="/" element={<LandingPage onLogin={handleLogin} />} />
                    <Route path="/home" element={user ? <Home onLogout={handleLogout} /> : <Navigate to="/" />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/meals" element={user ? <Meals /> : <Navigate to="/" />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
