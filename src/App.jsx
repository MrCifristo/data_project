// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile'; // Asegúrate de tener el componente Profile creado

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;