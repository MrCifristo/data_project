'use strict';

const mongoose = require('mongoose');

const modelName = 'menu';

if (!mongoose.models[modelName]) {
    // Definir el esquema para el menú
    const menuSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'usuarios', // Relación con la colección 'usuarios'
                required: true,
            },
            mealId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'meals', // Relación con la colección 'meals'
                required: true,
            },
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

    mongoose.model(modelName, menuSchema);
}

module.exports = mongoose.models[modelName];