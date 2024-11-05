// src/App.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './pages/Home.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Profile from './pages/Profile.jsx';
import Meals from './pages/Meals.jsx';
import About from './pages/About.jsx';
import NavBar from './components/NavBar.jsx';

const App = () => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    useEffect(() => {
        // Limpieza de tokens y reinicio de estados al montar el componente
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
        setUserProfile(null);
        setLoadingProfile(false);
    }, []);

    const fetchUserProfile = async (token) => {
        try {
            setLoadingProfile(true);
            const response = await fetch('http://localhost:5001/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUserProfile(data);
            } else {
                setUserProfile(null);
                setUser(null);
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
            }
        } catch (error) {
            setUserProfile(null);
            setUser(null);
        } finally {
            setLoadingProfile(false);
        }
    };

    const handleLogout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
        setUserProfile(null);
        setLoadingProfile(false);

        setTimeout(() => {
            window.location.href = '/';
        }, 0);
    }, []);

    const handleLogin = (userData, rememberMe) => {
        const token = userData.data.jwToken;
        const email = userData.data.email;
        const id = userData.data.id;

        setUser({ id, email, token });

        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', token);

        fetchUserProfile(token);
    };

    const AuthenticatedLayout = () => (
        <>
            <NavBar showLogout={!!user} onLogout={handleLogout} />
            <div className="flex-1">
                <Outlet />
            </div>
        </>
    );

    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
                <Routes>
                    {/* Ruta para LandingPage */}
                    <Route path="/" element={<LandingPage onLogin={handleLogin} />} />

                    {/* Rutas protegidas */}
                    <Route element={user ? <AuthenticatedLayout /> : <Navigate to="/" />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile onLogout={handleLogout} />} />
                        <Route
                            path="/meals"
                            element={
                                loadingProfile ? (
                                    <div className="text-center text-gray-500">Loading...</div>
                                ) : userProfile ? (
                                    <Meals userProfile={userProfile} />
                                ) : (
                                    <Navigate to="/" />
                                )
                            }
                        />
                        <Route path="/about" element={<About />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
};

export default App;