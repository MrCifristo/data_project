// src/components/LayoutForm.jsx

import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function LayoutForm({ onRecipeCreated }) {
    const { user } = useAuth(); // Obtener el userId del contexto de autenticación
    const [formData, setFormData] = useState({
        name: '',
        calories: '',
        protein: '',
        fats: '',
        carbs: '',
        mealType: '', // Campo para seleccionar el tipo de comida
    });

    const [error, setError] = useState(null); // Estado para manejar errores

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5001/api/meals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, userId: user?.id }), // Incluir userId en la solicitud
            });

            if (response.ok) {
                const newMeal = await response.json();
                onRecipeCreated(newMeal); // Llamar a la función para actualizar la lista en Meals.jsx
                setFormData({ name: '', calories: '', protein: '', fats: '', carbs: '', mealType: '' }); // Limpiar el formulario
                setError(null); // Limpiar errores si se creó exitosamente
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Error creating recipe'); // Manejar error del backend
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border-b border-gray-900/10 pb-8">
                <h2 className="text-lg font-semibold text-gray-700">Add New Recipe</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Provide the details of the recipe. This information will be displayed in your meal plan.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="calories" className="block text-sm font-medium text-gray-900">
                            Calories (cal)
                        </label>
                        <input
                            type="number"
                            name="calories"
                            id="calories"
                            value={formData.calories}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="protein" className="block text-sm font-medium text-gray-900">
                            Protein (g)
                        </label>
                        <input
                            type="number"
                            name="protein"
                            id="protein"
                            value={formData.protein}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="fats" className="block text-sm font-medium text-gray-900">
                            Fats (%)
                        </label>
                        <input
                            type="number"
                            name="fats"
                            id="fats"
                            value={formData.fats}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="carbs" className="block text-sm font-medium text-gray-900">
                            Carbs (g)
                        </label>
                        <input
                            type="number"
                            name="carbs"
                            id="carbs"
                            value={formData.carbs}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        />
                    </div>

                    <div className="sm:col-span-2">
                        <label htmlFor="mealType" className="block text-sm font-medium text-gray-900">
                            Meal Type
                        </label>
                        <select
                            name="mealType"
                            id="mealType"
                            value={formData.mealType}
                            onChange={handleChange}
                            required
                            className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                        >
                            <option value="">Select</option>
                            <option value="breakfast">Breakfast</option>
                            <option value="lunch">Lunch</option>
                            <option value="dinner">Dinner</option>
                        </select>
                    </div>
                </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>} {/* Mostrar mensaje de error si existe */}

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="text-sm font-semibold text-gray-900"
                    onClick={() => setFormData({ name: '', calories: '', protein: '', fats: '', carbs: '', mealType: '' })}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save Recipe
                </button>
            </div>
        </form>
    );
}