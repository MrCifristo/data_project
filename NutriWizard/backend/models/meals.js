// File: models/meals.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meals = sequelize.define('meals', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    calories: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    protein: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fats: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    carbs: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mealType: {
        type: DataTypes.STRING,
        allowNull: true, // Temporalmente permitir valores NULL
        defaultValue: 'unknown' // Valor por defecto temporal
    }
}, {
    tableName: 'meals', // Nombre en minúsculas de la tabla
    timestamps: true
});

module.exports = Meals;