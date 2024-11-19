import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, FireIcon, MoonIcon } from '@heroicons/react/24/outline';

const Profile = () => {
    const [profileData, setProfileData] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleAuthError = useCallback(() => {
        console.log('Authentication error. Redirecting to login.');
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        navigate('/');
    }, [navigate]);

    const fetchProfile = useCallback(async () => {
        console.log('Fetching user profile...');
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            console.warn('No token found. Redirecting to login.');
            handleAuthError();
            return;
        }

        try {
            const response = await fetch('http://localhost:5001/api/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Profile data fetched successfully:', data);
                setProfileData(data);
            } else {
                console.error('Failed to fetch profile. Status:', response.status);
                handleAuthError();
            }
        } catch (error) {
            console.error('Error while fetching profile:', error);
            setError('An error occurred while fetching profile data. Please try again later.');
        } finally {
            setLoading(false);
        }
    }, [handleAuthError]);

    const fetchUserMenu = useCallback(async () => {
        console.log('Fetching user menu...');
        if (!profileData?.id) {
            console.warn('No user ID found. Skipping menu fetch.');
            return;
        }

        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (!token) {
            console.warn('No token found. Redirecting to login.');
            handleAuthError();
            return;
        }

        try {
            const response = await fetch(`http://localhost:5001/api/menu/${profileData.id}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User menu fetched successfully:', data);
                setMenuItems(data);
            } else {
                console.error('Failed to fetch user menu. Status:', response.status);
            }
        } catch (error) {
            console.error('Error fetching user menu:', error);
        }
    }, [profileData?.id, handleAuthError]);

    useEffect(() => {
        console.log('Fetching profile data...');
        fetchProfile();
    }, [fetchProfile]);

    useEffect(() => {
        if (profileData) {
            console.log('Profile data available. Fetching menu...');
            fetchUserMenu();
        }
    }, [profileData, fetchUserMenu]);

    if (loading) {
        console.log('Loading profile page...');
        return <div className="text-center text-gray-700 dark:text-gray-200">Loading...</div>;
    }

    if (error) {
        console.error('Rendering error message:', error);
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
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white px-8 py-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                {/* Columna izquierda: Información del usuario */}
                <div>
                    <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100 flex items-center">
                        <UserIcon className="h-8 w-8 text-blue-600 mr-2" /> User Profile
                    </h1>
                    {profileData ? (
                        <>
                            <Section title="Personal Information" icon={<UserIcon className="h-6 w-6 text-blue-500" />}>
                                <ProfileDetail label="Full Name" value={profileData.nombre_completo} />
                                <ProfileDetail label="Age" value={profileData.edad} />
                                <ProfileDetail label="Sex" value={profileData.sexo?.trim()} />
                                <ProfileDetail label="Height" value={profileData.altura ? `${profileData.altura} cm` : null} />
                                <ProfileDetail label="Weight" value={profileData.peso ? `${profileData.peso} kg` : null} />
                            </Section>
                            <Section title="Health & Fitness" icon={<FireIcon className="h-6 w-6 text-red-500" />}>
                                <ProfileDetail label="Activity Level" value={profileData.nivel_actividad} />
                                <ProfileDetail label="Daily Caloric Intake" value={profileData.consumo_calorias_diario ? `${profileData.consumo_calorias_diario} kcal` : null} />
                                <ProfileDetail label="Water Consumption" value={profileData.consumo_agua_diario ? `${profileData.consumo_agua_diario} L` : null} />
                                <ProfileDetail label="Specific Condition" value={profileData.condicion_especifica} />
                            </Section>
                        </>
                    ) : (
                        <p className="text-gray-700 dark:text-gray-300">No profile data available.</p>
                    )}
                </div>

                {/* Columna derecha: Menú del usuario */}
                <div className="flex flex-col items-center justify-start bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Your Menu</h2>
                    {menuItems.length > 0 ? (
                        <ul className="space-y-2 w-full">
                            {menuItems.map((item) => (
                                <li
                                    key={item.id}
                                    className="flex justify-between bg-white dark:bg-gray-800 p-4 rounded shadow"
                                >
                                    <span className="text-gray-800 dark:text-gray-200">{item.name}</span>
                                    <span className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.calories} kcal
                                    </span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-400 dark:text-gray-500">No items in your menu.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

const Section = ({ title, icon, children }) => (
    <div className="mb-6">
        <div className="flex items-center mb-4">
            {icon && <div className="mr-2">{icon}</div>}
            <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{title}</h2>
        </div>
        <div className="space-y-4">{children}</div>
    </div>
);

const ProfileDetail = ({ label, value }) => (
    <div className="flex justify-between">
        <span className="font-medium text-gray-600 dark:text-gray-400">{label}</span>
        <span className="text-gray-800 dark:text-gray-200">{value || 'N/A'}</span>
    </div>
);

export default Profile;
