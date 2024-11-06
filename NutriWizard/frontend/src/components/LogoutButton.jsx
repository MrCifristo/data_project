// src/components/LogoutButton.jsx

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoginButton from './LoginButton.jsx';

const LogoutButton = () => {
    const { logout } = useAuth(); // Obtenemos la función logout del contexto

    return (
        <div>
            <LoginButton
                label="Logout"
                onClick={logout} // Llamamos directamente a logout desde el contexto
            />
        </div>
    );
};

export default LogoutButton;
