// src/components/NavBar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo.jsx';

const NavBar = ({ showLogout, onLogout }) => {
    const location = useLocation();

    const handleLogoutClick = () => {
        console.log("Logout button clicked");
        onLogout();
    };

    // Determinar si la ruta actual es '/about'
    const isAboutPage = location.pathname === '/about';

    return (
        <nav className={`${isAboutPage ? 'fixed top-0' : 'relative'} w-full flex justify-between items-center p-4 bg-indigo-500 text-white shadow-lg z-50`}>
            <div className="flex items-center space-x-3">
                <Logo src="https://flowbite.com/docs/images/logo.svg" alt="NutriWizard" className="w-8 h-8 mr-2" />
                <span className="text-xl font-bold">NutriWizard</span>
            </div>
            <div className="space-x-4">
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
                <Link to="/meals" className="hover:underline">Meals</Link>
                <Link to="/about" className="hover:underline">About Us</Link>
            </div>
            {showLogout && location.pathname === '/profile' && (
                <button onClick={handleLogoutClick} className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                    Logout
                </button>
            )}
        </nav>
    );
};

export default NavBar;