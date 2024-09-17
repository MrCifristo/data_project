// src/components/admin/AdminPanel.jsx
import React from 'react';
import Carousel from './Carousel';
import DisplayCSVData from './DisplayCSVData.jsx'


const Meals = () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="w-full mb-12">
                <Carousel />
            </div>

            <div className="w-full max-w-6xl">
                <DisplayCSVData />
            </div>
        </div>
    );
};

export default Meals;
