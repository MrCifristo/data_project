// src/components/LoginForm.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import InputField from './InputField';
import LoginButton from './LoginButton';

const LoginForm = ({ onLogin, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow dark:border dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                {/*Aca se cambia la informacion del logo*/}
                <Logo src="https://media.tenor.com/BIn4gjem0LQAAAAj/naruto-hungry.gif" alt="Company Name" />
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                    Sign in to your account
                </h1>
                <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                    <InputField
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <InputField
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                            </div>
                        </div>
                        <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                    </div>
                    <LoginButton label="Sign in" onClick={handleLogin} />
                    {/*<p className="text-sm font-light text-gray-500 dark:text-gray-400">*/}
                    {/*    Don’t have an account yet? <a href="#" onClick={onSwitchToSignUp} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>*/}
                    {/*</p>*/}
                </form>
            </div>
        </div>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onSwitchToSignUp: PropTypes.func.isRequired,
};

export default LoginForm;
