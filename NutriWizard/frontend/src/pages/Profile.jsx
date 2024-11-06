// File: src/components/Profile.jsx

import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Maneja el error de autenticación limpiando el token y redirigiendo
    const handleAuthError = useCallback(() => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/');
    }, [navigate]);

    // Función para obtener datos del perfil
    const fetchProfile = useCallback(async () => {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            handleAuthError(); // Redirige al inicio si no hay token
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setProfileData(data);
            } else {
                handleAuthError();
            }
        } catch (error) {
            setError('An error occurred while fetching profile data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [handleAuthError]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    if (loading) {
        return <div className="text-center text-gray-700 dark:text-gray-200">Loading...</div>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={handleAuthError}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
                {profileData && (
                    <div className="space-y-4">
                        <ProfileDetail label="Full Name" value={profileData.nombre_completo} />
                        <ProfileDetail label="Age" value={profileData.edad} />
                        <ProfileDetail label="Sex" value={profileData.sexo?.trim()} />
                        <ProfileDetail label="Height" value={profileData.altura ? `${profileData.altura} cm` : null} />
                        <ProfileDetail label="Weight" value={profileData.peso ? `${profileData.peso} kg` : null} />
                        <ProfileDetail label="Activity Level" value={profileData.nivel_actividad} />
                        <ProfileDetail label="Daily Caloric Intake" value={profileData.consumo_calorias_diario ? `${profileData.consumo_calorias_diario} kcal` : null} />
                        <ProfileDetail label="Water Consumption" value={profileData.consumo_agua_diario ? `${profileData.consumo_agua_diario} L` : null} />
                        <ProfileDetail label="Specific Condition" value={profileData.condicion_especifica} />
                        <ProfileDetail label="Diet" value={profileData.dieta} />
                        <ProfileDetail label="Allergies" value={profileData.alergias_alimentarias} />
                        <ProfileDetail label="Health History" value={profileData.historial_medico} />
                        <ProfileDetail label="Number of Snacks/Meals" value={profileData.numero_comidas_bocadillos} />
                        <ProfileDetail label="Nutritional Goals" value={profileData.objetivos_nutricionales} />
                    </div>
                )}
            </div>
        </div>
    );
};

// Componente para mostrar cada detalle del perfil
const ProfileDetail = ({ label, value }) => (
    <p><strong>{label}:</strong> {value || 'N/A'}</p>
);

export default Profile;
