// src/pages/LandingPage.jsx

import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignUpForm from '../components/SignUpForm';

const LandingPage = () => {
    const [showLogin, setShowLogin] = useState(true);
    const [showForm, setShowForm] = useState(false);

    const toggleLoginForm = () => {
        setShowForm(!showForm);
    };

    const switchToSignUp = () => {
        setShowLogin(false);
    };

    const switchToLogin = () => {
        setShowLogin(true);
    };

    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-900">
            <button
                onClick={toggleLoginForm}
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 fixed top-4 right-4 z-10"
            >
                {showForm ? 'Close' : 'Sign In'}
            </button>

            <h1 className="text-4xl font-bold mb-8 text-center z-10 text-gray-900 dark:text-white">Welcome to NutriWizard</h1>

            <div className={`relative z-10 w-full max-w-md mx-auto transition-opacity duration-500 ${showForm ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                {showForm && (
                    showLogin ? (
                        <LoginForm onSwitchToSignUp={switchToSignUp} />
                    ) : (
                        <SignUpForm onSwitchToLogin={switchToLogin} />
                    )
                )}
            </div>
        </div>
    );
};

export default LandingPage;
