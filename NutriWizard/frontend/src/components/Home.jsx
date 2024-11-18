import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import Carousel from './Carousel';

const Home = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div>
            <nav className="bg-white border-gray-200 dark:bg-gray-900 relative z-50">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        {/* Centrar y ajustar el logo */}
                        <Logo src="https://your-logo-link-here.com/logo.png" alt="NutriWizard" />
                    </div>
                    <div className="flex md:order-2 relative z-50">
                        {/* Botón de barra de tres líneas */}
                        <button
                            onClick={toggleMenu}
                            className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
                        >
                            <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                            <span className="sr-only">Open menu</span>
                        </button>

                        {/* Menú desplegable */}
                        {isMenuOpen && (
                            <div className="absolute top-12 right-0 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                                <ul className="flex flex-col p-4 text-sm">
                                    <li className="py-1">
                                        <Link to="/profile" className="text-gray-900 dark:text-white">Profile</Link>
                                    </li>
                                    <li className="py-1">
                                        <Link to="/about-us" className="text-gray-900 dark:text-white">About Us</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Carrusel, ajustado para no sobreponer el menú */}
            <div className="mt-8 relative z-0">
                <Carousel />
            </div>
        </div>
    );
};

export default Home;