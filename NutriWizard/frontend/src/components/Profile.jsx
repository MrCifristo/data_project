import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

// Datos de perfil simulados
const simulatedProfileData = {
    nombre_completo: 'George Albadr',
    edad: 30,
    sexo: 'Male',
    altura: 175,
    peso: 70,
    nivel_actividad: 'Moderate',
    historial_medico: ['No known issues'],
    alergias_alimentarias: 'None',
    condicion_especifica: 'None',
    objetivos_nutricionales: ['Maintain weight'],
    dieta: 'Balanced',
    consumo_calorias_diario: 2500,
    numero_comidas_bocadillos: 3,
    consumo_agua_diario: 2.5
};

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulamos la obtención de los datos de perfil directamente en el frontend
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        // Simular la carga de los datos de perfil
        setProfileData(simulatedProfileData);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    if (!profileData) {
        return <div className="text-center text-gray-700 dark:text-gray-200">Loading...</div>;
    }

    return (
        <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
            <LogoutButton
                onLogout={handleLogout}
                className="absolute top-4 right-4"
            />
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Profile Page</h1>
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
            </div>
        </div>
    );
};

export default Profile;