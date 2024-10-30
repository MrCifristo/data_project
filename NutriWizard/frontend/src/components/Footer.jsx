// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white text-center p-2 mt-8">
            <p className="mb-2">Contact us at: contact@nutriwizard.com</p>
            <p>&copy; 2024 NutriWizard. All rights reserved.</p>
            <Link to="/about" className="text-blue-400 hover:underline">About Us</Link>
        </footer>
    );
};

export default Footer;