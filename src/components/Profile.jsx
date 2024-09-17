import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token');
            console.log('Token from storage:', token);  // Debug to check the token retrieval

            if (!token) {
                console.log('No token available, redirecting to home...');
                navigate('/');  // Redirect to home if no token is available
                return;
            }

            try {
                const response = await fetch('http://localhost:5001/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setProfileData(data);
                    setLoading(false);
                    console.log("Profile data received:", data);  // Log the data received
                } else {
                    setError('Access Denied. Invalid token or token expired.');
                    console.log("Failed with status:", response.status, data);  // Log error details
                    navigate('/');  // Redirect to home if unauthorized
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('An error occurred while fetching profile data.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) {
        return <div className="text-center text-gray-700 dark:text-gray-200">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
            <LogoutButton onLogout={() => { localStorage.removeItem('token'); navigate('/'); }} className="absolute top-4 right-4" />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
                {profileData && (
                    <>
                        <p className="text-lg"><span className="font-semibold">Full Name:</span> {profileData.nombre_completo}</p>
                        <p className="text-lg"><span className="font-semibold">Age:</span> {profileData.edad}</p>
                        <p className="text-lg"><span className="font-semibold">Sex:</span> {profileData.sexo}</p>
                        <p className="text-lg"><span className="font-semibold">Height:</span> {profileData.altura} cm</p>
                        <p className="text-lg"><span className="font-semibold">Weight:</span> {profileData.peso} kg</p>
                        <p className="text-lg"><span className="font-semibold">Activity Level:</span> {profileData.nivel_actividad}</p>
                        <p className="text-lg"><span className="font-semibold">Medical History:</span> {Array.isArray(profileData.historial_medico) ? profileData.historial_medico.join(', ') : profileData.historial_medico}</p>
                        <p className="text-lg"><span className="font-semibold">Food Allergies:</span> {profileData.alergias_alimentarias}</p>
                        <p className="text-lg"><span className="font-semibold">Specific Conditions:</span> {Array.isArray(profileData.condicion_especifica) ? profileData.condicion_especifica.join(', ') : profileData.condicion_especifica}</p>
                        <p className="text-lg"><span className="font-semibold">Nutritional Goals:</span> {Array.isArray(profileData.objetivos_nutricionales) ? profileData.objetivos_nutricionales.join(', ') : profileData.objetivos_nutricionales}</p>
                        <p className="text-lg"><span className="font-semibold">Diet:</span> {profileData.dieta}</p>
                        <p className="text-lg"><span className="font-semibold">Daily Calorie Intake:</span> {profileData.consumo_calorias_diario} kcal</p>
                        <p className="text-lg"><span className="font-semibold">Meals and Snacks per Day:</span> {profileData.numero_comidas_bocadillos}</p>
                        <p className="text-lg"><span className="font-semibold">Daily Water Intake:</span> {profileData.consumo_agua_diario} L</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default Profile;
