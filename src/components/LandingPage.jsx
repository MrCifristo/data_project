import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(true); // Mostrar login por defecto
    const [showForm, setShowForm] = useState(false);
    const navigate = useNavigate(); // Hook para redirigir

    const toggleLoginForm = () => {
        setShowForm(!showForm);
    };

    const switchToSignUp = () => {
        setShowLogin(false);
    };

    const switchToLogin = () => {
        setShowLogin(true);
    };

    const handleLogin = (email, password) => {
        console.log('Login attempt with:', email, password);
        // Lógica para manejar el login (puedes agregar autenticación aquí)
        navigate('/home'); // Redirige a Home.jsx después de iniciar sesión
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center transition-colors duration-500">
            <button
                onClick={toggleLoginForm}
                className="text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 fixed top-4 right-4 z-10"
            >
                {showForm ? 'Close' : 'Sign In'}
            </button>
            <h1 className="text-4xl font-bold mb-8 text-center z-10 text-gray-900 dark:text-white">Welcome to Our Site</h1>
            <div className={`relative z-10 w-full flex justify-center transition-opacity duration-500 ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {showForm && (
                    showLogin ? (
                        <LoginForm onLogin={handleLogin} onSwitchToSignUp={switchToSignUp} />
                    ) : (
                        <SignUpForm onSignUp={(email, password) => {
                            console.log('SignUp attempt with:', email, password);
                            switchToLogin(); // Volver al login después del registro
                        }} onSwitchToLogin={switchToLogin} />
                    )
                )}
            </div>
        </div>
    );
};

export default LandingPage;
