// File: models/UserMeal.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Meal = require('./Meal');

const UserMeal = sequelize.define('UserMeal', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id',
        },
    },
    breakfast: {
        type: DataTypes.INTEGER,
        references: {
            model: Meal,
            key: 'id',
        },
    },
    lunch: {
        type: DataTypes.INTEGER,
        references: {
            model: Meal,
            key: 'id',
        },
    },
    dinner: {
        type: DataTypes.INTEGER,
        references: {
            model: Meal,
            key: 'id',
        },
    },
}, {
    tableName: 'user_meals',
    timestamps: true,
});

module.exports = UserMeal;
