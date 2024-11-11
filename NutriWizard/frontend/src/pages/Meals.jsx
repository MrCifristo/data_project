// src/pages/Meals.jsx
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
    const { userProfile } = useAuth();
    const [combinedData, setCombinedData] = useState(null);
    const [userMeals, setUserMeals] = useState([]);
    const [highlightedMeal, setHighlightedMeal] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAllMeals = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/meals');
            if (response.ok) {
                const data = await response.json();
                const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                setUserMeals(sortedData);
            } else {
                console.error('Failed to fetch all meals');
            }
        } catch (error) {
            console.error("Error fetching all meals:", error);
        }
    };

    const handleSearch = () => {
        const foundMeal = userMeals.find(meal =>
            meal.name.toLowerCase() === searchTerm.toLowerCase().trim()
        );
        setHighlightedMeal(foundMeal || null);
    };

    const handleRecipeCreated = () => {
        fetchAllMeals();
        setShowForm(false);
        setSearchTerm('');
        setHighlightedMeal(null);
    };

    const handleDeleteMeal = async (id) => {
        try {
            const response = await fetch(`http://localhost:5001/api/meals/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchAllMeals();
            } else {
                console.error(`Failed to delete meal with ID ${id}`);
            }
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    useEffect(() => {
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
                        borderColor: '#0c0c0c',
                        hoverOffset: 4,
                    },
                    {
                        label: 'Daily Water Consumption',
                        data: [waterConsumption, 3 - waterConsumption],
                        backgroundColor: ['#36A2EB', '#BBDEFB'],
                        borderWidth: 1,
                        borderColor: '#0c0c0c',
                        hoverOffset: 4,
                    },
                    {
                        label: 'Weight',
                        data: [weight, 0],
                        backgroundColor: ['#FF6384', '#FFCDD2'],
                        borderWidth: 1,
                        borderColor: '#0c0c0c',
                        hoverOffset: 4,
                    },
                ],
            });
        }
    }, [userProfile]);

    useEffect(() => {
        fetchAllMeals();
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

                    {/* Search bar */}
                    <div className="mt-8 w-full max-w-4xl mx-auto flex items-center gap-4">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for a meal..."
                            className="block w-full px-4 py-2 border rounded-md text-gray-700 focus:ring-2 focus:ring-indigo-600"
                        />
                        <button
                            onClick={handleSearch}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Search
                        </button>
                    </div>

                    {/* Highlighted Meal */}
                    {highlightedMeal && (
                        <div className="mt-8 w-full max-w-4xl mx-auto bg-yellow-100 p-4 rounded-lg shadow-lg">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">Search Result</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border">
                                    <thead>
                                    <tr>
                                        <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Name</th>
                                        <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Calories</th>
                                        <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Protein</th>
                                        <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Fats</th>
                                        <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Carbs</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{highlightedMeal.name}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{highlightedMeal.calories}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{highlightedMeal.protein}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{highlightedMeal.fats}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{highlightedMeal.carbs}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Meal Table */}
                    <div className="mt-8 w-full max-w-4xl mx-auto">
                        <h3 className="text-2xl font-semibold text-gray-950 mb-6">All Meal Plans</h3>
                        {userMeals.length ? (
                            <table className="min-w-full bg-white border">
                                <thead>
                                <tr>
                                    <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Name</th>
                                    <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Calories</th>
                                    <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Protein</th>
                                    <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Fats</th>
                                    <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Carbs</th>
                                    <th className="px-4 py-3 border-b text-left text-xs font-semibold text-gray-900">Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {userMeals.map(meal => (
                                    <tr key={meal.id}>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{meal.name}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{meal.calories}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{meal.protein}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{meal.fats}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900">{meal.carbs}</td>
                                        <td className="px-4 py-3 border-b text-xs text-gray-900 space-x-1">
                                            <button
                                                onClick={() => handleDeleteMeal(meal.id)}
                                                className="bg-red-500 text-white px-2 py-1 text-xs rounded hover:bg-red-600"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        ) : (
                            <p className="text-center text-gray-500">No meal data available.</p>
                        )}
                    </div>

                    {/* Add & Refresh Buttons */}
                    <div className="mt-8 w-full max-w-4xl mx-auto text-center">
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
                        >
                            Add New Meal
                        </button>
                        <button
                            onClick={fetchAllMeals}
                            className="ml-4 rounded-md bg-gray-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-400"
                        >
                            Refresh
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