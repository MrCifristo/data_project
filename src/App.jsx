import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import LandingPage from './components/LandingPage';
import Profile from './components/Profile';
import AboutUs from './components/AboutUs'; // Importa el nuevo componente

const App = () => {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/about-us" element={<AboutUs />} /> {/* Nueva ruta */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;