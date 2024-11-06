// File: src/pages/Meals.jsx

import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel.jsx';
import { Doughnut } from 'react-chartjs-2';
import Footer from '../components/Footer';
import LayoutForm from '../components/LayoutForm.jsx';
import { useAuth } from '../contexts/AuthContext';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Meals = () => {
    const { userProfile } = useAuth(); // Obtener userProfile desde el contexto
    const [combinedData, setCombinedData] = useState(null);
    const [userMeals, setUserMeals] = useState(null);
    const [showForm, setShowForm] = useState(false);

    // Función para obtener los datos de comidas del backend
    const fetchUserMeals = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/meals/user-meals');
            if (response.ok) {
                const data = await response.json();
                setUserMeals(data);
            } else {
                setUserMeals(null);
            }
        } catch (error) {
            setUserMeals(null);
            console.error("Error fetching user meals:", error);
        }
    };

    // Función que se llama después de crear una nueva receta
    const handleRecipeCreated = () => {
        fetchUserMeals(); // Actualiza la lista de recetas
        setShowForm(false); // Cierra el formulario
    };

    // Verificar si userProfile se ha cargado correctamente
    useEffect(() => {
        console.log('userProfile in Meals:', userProfile); // Verificar valor de userProfile
        if (userProfile) {
            const caloricIntake = userProfile.consumo_calorias_diario || 0;
            const waterConsumption = userProfile.consumo_agua_diario || 0;
            const weight = userProfile.peso || 0;

            setCombinedData({
                labels: ['Consumed Calories', 'Remaining Calories', 'Consumed Water', 'Remaining Water', 'Weight'],
                datasets: [
                    {
                        label: 'Daily Caloric Intake',
                        data: [caloricIntake, 2000 - caloricIntake],
                        backgroundColor: ['#4CAF50', '#C8E6C9'],
                        borderWidth: 1,
                        borderColor: '#fff',
                        hoverOffset: 4,
                    },
                    {
                        label: 'Daily Water Consumption',
                        data: [waterConsumption, 3 - waterConsumption],
                        backgroundColor: ['#36A2EB', '#BBDEFB'],
                        borderWidth: 1,
                        borderColor: '#fff',
                        hoverOffset: 4,
                    },
                    {
                        label: 'Weight',
                        data: [weight, 0],
                        backgroundColor: ['#FF6384', '#FFCDD2'],
                        borderWidth: 1,
                        borderColor: '#fff',
                        hoverOffset: 4,
                    },
                ],
            });
        }
    }, [userProfile]);

    // Llamar a fetchUserMeals cuando el componente se monte
    useEffect(() => {
        fetchUserMeals();
    }, []);

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    generateLabels: (chart) => {
                        const labels = chart.data.labels;
                        return labels.map((label) => {
                            let color;
                            switch (label) {
                                case 'Consumed Calories':
                                    color = '#4CAF50';
                                    break;
                                case 'Remaining Calories':
                                    color = '#C8E6C9';
                                    break;
                                case 'Consumed Water':
                                    color = '#36A2EB';
                                    break;
                                case 'Remaining Water':
                                    color = '#BBDEFB';
                                    break;
                                case 'Weight':
                                    color = '#FF6384';
                                    break;
                                default:
                                    color = '#000';
                            }
                            return {
                                text: label,
                                fillStyle: color,
                            };
                        });
                    },
                    usePointStyle: true,
                },
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed;
                        }
                        return label;
                    },
                },
            },
        },
    };

    // Renderizado condicional
    if (!userProfile) {
        return <p className="text-center text-red-500 mt-8">No user profile data available.</p>;
    }

    return (
        <div className="bg-gray-50 pt-2 pb-0 sm:py-4 min-h-screen flex flex-col">
            <div className="flex-grow">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <h2 className="text-center text-base font-semibold text-indigo-600 mt-2">Nutrition Overview</h2>
                    <p className="mx-auto mt-0 max-w-lg text-center text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl">
                        Your Daily Nutrition Metrics
                    </p>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
                        <div className="w-full max-w-md">
                            {combinedData ? (
                                <Doughnut data={combinedData} options={chartOptions} height={300} />
                            ) : (
                                <p className="text-center text-gray-500">No data available for chart.</p>
                            )}
                        </div>
                        <Carousel />
                    </div>
                    {/* Tabla de User Meals */}
                    <div className="mt-8 w-full max-w-4xl mx-auto">
                        <h3 className="text-2xl font-semibold text-gray-950 mb-6">Recommended Meal Plans</h3>
                        {userMeals && userMeals.length > 0 ? (
                            <table className="min-w-full bg-white border">
                                <thead>
                                <tr>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-900">Meal</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-900">Calories (cal)</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-900">Protein (g)</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-900">Fats (%)</th>
                                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm font-semibold text-gray-900">Carbs (g)</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userMeals.map((mealPlan, index) => (
                                    ['breakfastMeal', 'lunchMeal', 'dinnerMeal'].map((mealType) => (
                                        mealPlan[mealType] && (
                                            <tr key={`${index}-${mealType}`}>
                                                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900 capitalize">{mealType.replace('Meal', '')}</td>
                                                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">{mealPlan[mealType].name}</td>
                                                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">{mealPlan[mealType].calories} cal</td>
                                                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">{mealPlan[mealType].protein} g</td>
                                                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">{mealPlan[mealType].fats} %</td>
                                                <td className="px-6 py-4 border-b border-gray-300 text-sm text-gray-900">{mealPlan[mealType].carbs} g</td>
                                            </tr>
                                        )
                                    ))
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">No meal data available.</p>
                        )}
                    </div>
                    <div className="mt-8 w-full max-w-4xl mx-auto text-center">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Add New Meal
                        </button>
                    </div>
                    {showForm && (
                        <div className="mt-8 w-full max-w-4xl mx-auto">
                            <LayoutForm onRecipeCreated={handleRecipeCreated} />
                        </div>
                    )}
                </div>
            </div>
            <Footer className="w-full mt-auto" />
        </div>
    );
};

export default Meals;