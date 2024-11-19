'use strict';

const mongoose = require('mongoose');

const modelName = 'user_meals';

if (!mongoose.models[modelName]) {
    // Definir el esquema para user_meals
    const userMealsSchema = new mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'usuarios', // Relación con la colección 'usuarios'
                required: true,
            },
            breakfast: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'meals', // Relación con la colección 'meals' para desayuno
                default: null,
            },
            lunch: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'meals', // Relación con la colección 'meals' para almuerzo
                default: null,
            },
            dinner: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'meals', // Relación con la colección 'meals' para cena
                default: null,
            },
        },
        {
            timestamps: true, // Agrega automáticamente createdAt y updatedAt
        }
    );

    mongoose.model(modelName, userMealsSchema);
}

module.exports = mongoose.models[modelName];