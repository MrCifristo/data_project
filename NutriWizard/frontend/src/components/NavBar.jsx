// src/components/NavBar.jsx

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Logo from './Logo.jsx';
import LogoutButton from './LogoutButton';

const NavBar = () => {
    const { user } = useAuth(); // Obtenemos el usuario desde el contexto
    const location = useLocation();

    // Determinar si la ruta actual es '/profile'
    const isProfilePage = location.pathname === '/profile';

    return (
        <nav className={`w-full flex justify-between items-center p-4 bg-indigo-500 text-white shadow-lg z-50`}>
            <div className="flex items-center space-x-3">
                <Logo src="https://flowbite.com/docs/images/logo.svg" alt="NutriWizard" className="w-8 h-8 mr-2" />
                <span className="text-xl font-bold">NutriWizard</span>
            </div>
            <div className="flex items-center space-x-4">
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline">Profile</Link>
                <Link to="/meals" className="hover:underline">Meals</Link>
                <Link to="/about" className="hover:underline">About Us</Link>

                {/* Mostrar LogoutButton solo en la página de perfil */}
                {user && isProfilePage && <LogoutButton />}

                {/* Mostrar el botón de login si no hay usuario */}
                {!user && (
                    <Link to="/" className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-700">
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default NavBar;
