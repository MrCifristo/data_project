// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Importar PropTypes

const Profile = ({ onLogout }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('token') || sessionStorage.getItem('token');
            if (!token) {
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
                if (response.ok) {
                    const data = await response.json();
                    setProfileData(data);
                } else {
                    onLogout(); // Llama al logout si la respuesta no es autorizada
                }
            } catch (error) {
                setError('An error occurred while fetching profile data.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [navigate, onLogout]);

    if (loading) return <div className="text-center text-gray-700 dark:text-gray-200">Loading...</div>;
    if (error) return <div className="text-center text-red-500">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
                {profileData && (
                    <div className="space-y-4">
                        <p><strong>Full Name:</strong> {profileData.nombre_completo || 'N/A'}</p>
                        <p><strong>Age:</strong> {profileData.edad || 'N/A'}</p>
                        <p><strong>Sex:</strong> {profileData.sexo?.trim() || 'N/A'}</p>
                        <p><strong>Height:</strong> {profileData.altura ? `${profileData.altura} cm` : 'N/A'}</p>
                        <p><strong>Weight:</strong> {profileData.peso ? `${profileData.peso} kg` : 'N/A'}</p>
                        <p><strong>Activity Level:</strong> {profileData.nivel_actividad || 'N/A'}</p>
                        <p><strong>Daily Caloric Intake:</strong> {profileData.consumo_calorias_diario ? `${profileData.consumo_calorias_diario} kcal` : 'N/A'}</p>
                        <p><strong>Water Consumption:</strong> {profileData.consumo_agua_diario ? `${profileData.consumo_agua_diario} L` : 'N/A'}</p>
                        <p><strong>Specific Condition:</strong> {profileData.condicion_especifica || 'N/A'}</p>
                        <p><strong>Diet:</strong> {profileData.dieta || 'N/A'}</p>
                        <p><strong>Allergies:</strong> {profileData.alergias_alimentarias || 'N/A'}</p>
                        <p><strong>Health History:</strong> {profileData.historial_medico || 'N/A'}</p>
                        <p><strong>Number of Snacks/Meals:</strong> {profileData.numero_comidas_bocadillos || 'N/A'}</p>
                        <p><strong>Nutritional Goals:</strong> {profileData.objetivos_nutricionales || 'N/A'}</p>
                    </div>
                )}
            </div>
        </div>
    );

};

Profile.propTypes = {
    onLogout: PropTypes.func.isRequired,
};

export default Profile;