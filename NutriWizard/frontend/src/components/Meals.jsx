// src/components/Meals.jsx
import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';
import { Doughnut } from 'react-chartjs-2';
import Footer from './Footer';

const Meals = ({ userProfile }) => {
    const [caloriesData, setCaloriesData] = useState(null);

    useEffect(() => {
        if (userProfile) {
            console.log("Received userProfile in Meals component:", userProfile);
            setCaloriesData({
                labels: ['Daily Caloric Intake (kcal)', 'Water Consumption (L)', 'Weight (kg)'],
                datasets: [
                    {
                        label: 'Daily Caloric Intake (kcal)',
                        data: [userProfile.consumo_calorias_diario || 0],
                        backgroundColor: ['#4CAF50'],
                        borderWidth: 1,
                    },
                    {
                        label: 'Water Consumption (L)',
                        data: [userProfile.consumo_agua_diario || 0],
                        backgroundColor: ['#36A2EB'],
                        borderWidth: 1,
                    },
                    {
                        label: 'Weight (kg)',
                        data: [userProfile.peso || 0],
                        backgroundColor: ['#FF6384'],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [userProfile]);

    if (!userProfile) {
        return <p className="text-center text-red-500 mt-16">No user profile data available.</p>;
    } else {
        return (
            <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col mt-16">
                <div className="flex justify-center items-center flex-col">
                    <div className="w-full mb-12">
                        <Carousel />
                    </div>

                    <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold mb-4">Nutrition Breakdown</h2>
                            {caloriesData && (
                                <Doughnut
                                    data={caloriesData}
                                    options={{
                                        responsive: true,
                                        cutout: '50%',
                                        plugins: {
                                            legend: {
                                                position: 'bottom',
                                                labels: {
                                                    color: '#333',
                                                    usePointStyle: true,
                                                },
                                            },
                                        },
                                        rotation: -90,
                                        circumference: 360,
                                    }}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
};

export default Meals;