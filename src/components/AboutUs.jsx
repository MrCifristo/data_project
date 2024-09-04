import React from 'react';

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">About Us</h1>
                <p className="text-lg">
                    We are a company dedicated to helping individuals achieve their ideal weight and health goals through personalized nutrition plans.
                    Our team of experts analyzes your body’s needs and helps create tailored meal plans that fit your lifestyle. Whether you're looking to
                    lose weight, gain muscle, or maintain your current health, we’re here to guide you every step of the way.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;