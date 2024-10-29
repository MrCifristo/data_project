// LandingPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from "./LoginForm.jsx";
import SignUpForm from "./SignUpForm.jsx";

const LandingPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showSignUpForm, setShowSignUpForm] = useState(false);

    const handleLogin = (userData, rememberMe) => {
        onLogin(userData, rememberMe);
        navigate('/home');  // Navigate to home after successful login
    };

    const handleSignUp = (userData) => {
        onLogin(userData, true);  // Log in user after sign up
        navigate('/home');  // Navigate to home
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <h1 className="text-4xl font-bold text-center mb-6">Welcome to NutriWizard</h1>
            <button
                className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowLoginForm(!showLoginForm)}
            >
                {showLoginForm ? 'Hide Login' : 'Show Login'}
            </button>
            {showLoginForm && <LoginForm onLogin={handleLogin} onSwitchToSignUp={() => {
                setShowLoginForm(false);
                setShowSignUpForm(true);
            }} />}
            {showSignUpForm && <SignUpForm onSignUp={handleSignUp} onSwitchToLogin={() => {
                setShowSignUpForm(false);
                setShowLoginForm(true);
            }} />}
        </div>
    );
};

export default LandingPage;
