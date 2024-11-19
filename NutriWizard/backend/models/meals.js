'use strict';

const mongoose = require('mongoose');

const modelName = 'meals';

if (!mongoose.models[modelName]) {
    // Definir el esquema de meals
    const mealsSchema = new mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
                trim: true,
            },
            calories: {
                type: Number,
                required: true,
            },
            protein: {
                type: Number,
                required: true,
            },
            fats: {
                type: Number,
                required: true,
            },
            carbs: {
                type: Number,
                required: true,
            },
            mealType: {
                type: String,
                required: true,
                default: 'unknown',
                enum: ['breakfast', 'lunch', 'dinner', 'snack', 'unknown'], // Valores válidos
            },
        },
        {
            timestamps: true, // Agrega automáticamente createdAt y updatedAt
        }
    );

    mongoose.model(modelName, mealsSchema);
}

module.exports = mongoose.models[modelName];