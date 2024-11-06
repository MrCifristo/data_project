// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import Profile from './pages/Profile';
import Meals from './pages/Meals';
import About from './pages/About';
import NavBar from './components/NavBar';
import PrivateRoute from './components/PrivateRoute';
import { AuthContextProvider, useAuth } from './contexts/AuthContext';

const AppContent = () => {
    const { user } = useAuth();

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <Routes>
                {/* Ruta pública para LandingPage */}
                <Route path="/" element={<LandingPage />} />

                {/* Rutas protegidas */}
                <Route
                    element={user ? (
                        <>
                            <NavBar />  {/* Renderizar NavBar solo si el usuario está autenticado */}
                            <PrivateRoute />
                        </>
                    ) : (
                        <LandingPage />
                    )}
                >
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/meals" element={<Meals />} />
                    <Route path="/about" element={<About />} />
                </Route>
            </Routes>
        </div>
    );
};

const App = () => (
    <AuthContextProvider>
        <Router>
            <AppContent />
        </Router>
    </AuthContextProvider>
);

export default App;
