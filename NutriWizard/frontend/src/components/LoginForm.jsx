// src/components/LoginForm.jsx

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo.jsx';
import InputField from './InputField.jsx';
import LoginButton from './LoginButton.jsx';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                // const token = data.data.jwToken; // Eliminado porque no se usa

                // Delegar el manejo del token a App.jsx
                onLogin(data, rememberMe);

                // Redirigir después del login exitoso
                navigate('/profile');
            } else {
                const errorResponse = await response.json();
                setError(errorResponse.error || 'Login failed. Please check your email and password.');
            }
        } catch (error) {
            console.error('Error durante el login:', error);
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
            <div className="p-6 flex items-center space-x-4 md:space-x-6 sm:p-8">
                {/* Ajuste del tamaño del logo usando Tailwind CSS */}
                <Logo
                    src="https://media.tenor.com/BIn4gjem0LQAAAAj/naruto-hungry.gif"
                    alt="Company Name"
                    className="w-12 h-12" // Tamaño reducido
                />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h1>
            </div>
            <form className="p-6 space-y-4 md:space-y-6" onSubmit={handleLogin}>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                                id="remember"
                                type="checkbox"
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                            />
                        </div>
                        <label htmlFor="remember" className="ml-3 text-sm text-gray-500 dark:text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="button"
                        onClick={() => alert("Forgot password?")}
                        className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                    >
                        Forgot password?
                    </button>
                </div>
                {error && <p className="text-sm text-red-500">{error}</p>}
                <LoginButton label="Sign in" />
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <button type="button" onClick={onSwitchToSignUp} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</button>
                </p>
            </form>
        </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onSwitchToSignUp: PropTypes.func.isRequired,
};

export default LoginForm;