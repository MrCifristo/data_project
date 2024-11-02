// src/components/Meals.jsx
import React, { useEffect, useState } from 'react';
import Carousel from './Carousel.jsx';
import { Doughnut } from 'react-chartjs-2';
import Footer from './Footer';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los elementos necesarios para Chart.js
Chart.register(ArcElement, Tooltip, Legend);

const Meals = ({ userProfile }) => {
    const [caloriesData, setCaloriesData] = useState(null);
    const [waterData, setWaterData] = useState(null);
    const [weightData, setWeightData] = useState(null);

    useEffect(() => {
        if (userProfile) {
            console.log("Received userProfile in Meals component:", userProfile);

            // Datos para Consumo de Calorías
            setCaloriesData({
                labels: ['Consumed', 'Remaining'],
                datasets: [
                    {
                        data: [userProfile.consumo_calorias_diario || 0, 2000 - (userProfile.consumo_calorias_diario || 0)], // Asumiendo una meta diaria de 2000 kcal
                        backgroundColor: ['#4CAF50', '#C8E6C9'],
                        borderWidth: 1,
                    },
                ],
            });

            // Datos para Consumo de Agua
            setWaterData({
                labels: ['Consumed', 'Remaining'],
                datasets: [
                    {
                        data: [userProfile.consumo_agua_diario || 0, 3 - (userProfile.consumo_agua_diario || 0)], // Asumiendo una meta diaria de 3 litros
                        backgroundColor: ['#36A2EB', '#BBDEFB'],
                        borderWidth: 1,
                    },
                ],
            });

            // Datos para Peso
            setWeightData({
                labels: ['Current Weight', ''],
                datasets: [
                    {
                        data: [userProfile.peso || 0, 0], // No hay una "remaining", solo muestra el peso actual
                        backgroundColor: ['#FF6384', '#FFCDD2'],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [userProfile]);

    console.log("Rendering Meals component with userProfile:", userProfile);

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
                        {/* Gráfico de Consumo de Calorías */}
                        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Daily Caloric Intake</h2>
                            {caloriesData ? (
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
                                    }}
                                />
                            ) : (
                                <p>No data available for calories.</p>
                            )}
                        </div>

                        {/* Gráfico de Consumo de Agua */}
                        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Daily Water Consumption</h2>
                            {waterData ? (
                                <Doughnut
                                    data={waterData}
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
                                    }}
                                />
                            ) : (
                                <p>No data available for water consumption.</p>
                            )}
                        </div>

                        {/* Gráfico de Peso */}
                        <div className="w-full md:w-1/3 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-bold mb-4">Weight</h2>
                            {weightData ? (
                                <Doughnut
                                    data={weightData}
                                    options={{
                                        responsive: true,
                                        cutout: '50%',
                                        plugins: {
                                            legend: {
                                                display: false, // No mostrar leyenda para el peso
                                            },
                                        },
                                    }}
                                />
                            ) : (
                                <p>No data available for weight.</p>
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