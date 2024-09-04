import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

// Credenciales quemadas para simular la autenticación
const loginData = {
    email: "georgealbadr11@gmail.com",
    password: "test1234"
};

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
        // Comparar los datos ingresados con los datos quemados
        if (email === loginData.email && password === loginData.password) {
            console.log('Login successful');
            localStorage.setItem('token', 'sample-token'); // Guardar token para simular autenticación
            navigate('/home'); // Redirige a Home.jsx después de iniciar sesión
        } else {
            console.log('Login failed. Invalid credentials');
        }
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-900">
            {/* Botón Sign In */}
            <button
                onClick={toggleLoginForm}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 fixed top-4 right-4 z-10"
            >
                {showForm ? 'Close' : 'Sign In'}
            </button>

            <h1 className="text-4xl font-bold mb-8 text-center z-10 text-gray-900 dark:text-white">Welcome to Our Site</h1>

            {/* Mostrar el formulario de inicio de sesión */}
            <div className={`relative z-10 w-full max-w-md mx-auto transition-opacity duration-500 ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
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