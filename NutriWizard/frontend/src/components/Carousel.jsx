// src/components/Meals.jsx
import React, { useState, useEffect } from 'react';
import Carousel from './Carousel.jsx';
import { Pie } from 'react-chartjs-2';
import Footer from './Footer';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Meals = ({ userProfile }) => {
    const [caloriesData, setCaloriesData] = useState(null);

    useEffect(() => {
        if (userProfile) {
            console.log("User Profile Data:", userProfile);
            const caloricIntake = userProfile.consumo_calorias_diario || 0;
            const waterConsumption = userProfile.consumo_agua_diario || 0;
            const snacksMeals = userProfile.numero_comidas_bocadillos || 0;

            // Verificar si los datos son correctos
            if (caloricIntake > 0 || waterConsumption > 0 || snacksMeals > 0) {
                setCaloriesData({
                    labels: ['Daily Caloric Intake (kcal)', 'Water Consumption (L)', 'Number of Meals/Snacks'],
                    datasets: [
                        {
                            label: 'User Consumption',
                            data: [caloricIntake, waterConsumption, snacksMeals],
                            backgroundColor: ['#4CAF50', '#36A2EB', '#FF6384'],
                            hoverBackgroundColor: ['#66BB6A', '#42A5F5', '#FF7394']
                        },
                    ],
                });
            } else {
                console.warn("Los valores de entrada son cero, el gráfico puede no mostrarse correctamente.");
            }
        }
    }, [userProfile]);

    if (!userProfile) {
        return <p className="text-center text-red-500">No user profile data available.</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
            <div className="flex justify-center items-center flex-col">
                <div className="w-full mb-12">
                    <Carousel />
                </div>

                <div className="w-full max-w-6xl px-4 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-bold mb-4">Nutrition Breakdown</h2>
                        {caloriesData ? (
                            <Pie
                                data={caloriesData}
                                options={{
                                    responsive: true,
                                    plugins: {
                                        legend: {
                                            position: 'bottom',
                                        },
                                    },
                                }}
                            />
                        ) : (
                            <p className="text-center text-gray-500">No data available for chart.</p>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Meals;