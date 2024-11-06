// AuthContext.js
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);
    const [loadingProfile, setLoadingProfile] = useState(false);

    // Define logout primero
    const logout = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
        setUserProfile(null);
    }, []);

    // Define fetchUserProfile después de logout
    const fetchUserProfile = useCallback(async (token) => {
        try {
            setLoadingProfile(true);
            const response = await fetch('http://localhost:5001/api/users/profile', {
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
                logout();
            }
        } catch (error) {
            setUserProfile(null);
            logout();
        } finally {
            setLoadingProfile(false);
        }
    }, [logout]);

    useEffect(() => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            setUser({ token });
            fetchUserProfile(token);
        }
    }, [fetchUserProfile]);

    const login = (token, rememberMe) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', token);
        setUser({ token });
        fetchUserProfile(token);
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loadingProfile, login, logout, fetchUserProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    return useContext(AuthContext);
};
