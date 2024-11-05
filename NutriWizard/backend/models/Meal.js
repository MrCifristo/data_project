// File: models/Meal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Meal = sequelize.define('Meal', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    calories: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    protein: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    fats: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    carbs: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
}, {
    tableName: 'meals',
    timestamps: true,
});

module.exports = Meal;
