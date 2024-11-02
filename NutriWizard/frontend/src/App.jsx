// src/App.jsx

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from './components/Home.jsx';
import LandingPage from './components/LandingPage.jsx';
import Profile from './components/Profile.jsx';
import Meals from './components/Meals.jsx';
import About from './components/About.jsx';
import NavBar from './components/NavBar.jsx';

const App = () => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(true);

    // Reiniciar el estado del usuario al iniciar la aplicación
    useEffect(() => {
        // Limpiar tokens almacenados
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // Reiniciar estados
        setUser(null);
        setUserProfile(null);
        setLoadingProfile(false);
    }, []);

    // Función para obtener el perfil
    const fetchUserProfile = async (token) => {
        try {
            setLoadingProfile(true);
            // Eliminados los console.log innecesarios
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
                // Manejo de errores sin asignar errorData
                setUserProfile(null);
                setUser(null);
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
            }
        } catch (error) {
            // Manejo de errores sin asignar errorData
            setUserProfile(null);
            setUser(null);
        } finally {
            setLoadingProfile(false);
        }
    };

    // Manejo de login
    const handleLogin = (userData, rememberMe) => {
        // Extraer el token desde userData.data.jwToken
        const token = userData.data.jwToken;
        const email = userData.data.email;
        const id = userData.data.id;

        // Establecer el estado del usuario con información relevante
        setUser({ id, email, token });

        // Almacenar el token en el almacenamiento adecuado
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', token);

        // Obtener el perfil del usuario
        fetchUserProfile(token);
    };

    // Manejo de logout
    const handleLogout = () => {
        // Limpiar tokens almacenados
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');

        // Reiniciar estados
        setUser(null);
        setUserProfile(null);
        setLoadingProfile(false);

        // Forzar redireccionamiento y recarga completa
        setTimeout(() => {
            window.location.href = '/';
        }, 0);
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