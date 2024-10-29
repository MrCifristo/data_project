import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton.jsx';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            console.log('Token retrieved from storage in Profile:', token);

            if (!token) {
                console.log('No token available, redirecting to home...');
                navigate('/');
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

                console.log('Profile fetch response status:', response.status);
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                    console.log("Profile data received:", data);
                } else {
                    setError('Unauthorized access');
                    localStorage.removeItem('token');
                    sessionStorage.removeItem('token');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error fetching profile data:', error);
                setError('An error occurred while fetching profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    if (loading) return <div className="text-center text-gray-700 dark:text-gray-200">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <LogoutButton onLogout={() => { localStorage.removeItem('token'); sessionStorage.removeItem('token'); navigate('/'); }} className="absolute top-4 right-4" />
                <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
                {profileData && (
                    <div className="space-y-4">
                        <p><strong>Full Name:</strong> {profileData.nombre_completo}</p>
                        <p><strong>Age:</strong> {profileData.edad}</p>
                        <p><strong>Sex:</strong> {profileData.sexo.trim()}</p>
                        <p><strong>Height:</strong> {profileData.altura} cm</p>
                        <p><strong>Weight:</strong> {profileData.peso} kg</p>
                        <p><strong>Activity Level:</strong> {profileData.nivel_actividad}</p>
                        <p><strong>Daily Caloric Intake:</strong> {profileData.consumo_calorias_diario} kcal</p>
                        <p><strong>Water Consumption:</strong> {profileData.consumo_agua_diario} L</p>
                        <p><strong>Specific Condition:</strong> {profileData.condicion_especifica}</p>
                        <p><strong>Diet:</strong> {profileData.dieta}</p>
                        <p><strong>Allergies:</strong> {profileData.alergias_alimentarias}</p>
                        <p><strong>Health History:</strong> {profileData.historial_medico}</p>
                        <p><strong>Number of Snacks/Meals:</strong> {profileData.numero_comidas_bocadillos}</p>
                        <p><strong>Nutritional Goals:</strong> {profileData.objetivos_nutricionales}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;