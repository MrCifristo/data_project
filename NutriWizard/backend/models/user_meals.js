// File: models/user_meals.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario'); // Asegúrate de tener Usuario definido correctamente
const Meals = require('./meals');

const User_meals = sequelize.define('user_meals', {
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
            model: Meals,
            key: 'id',
        },
    },
    lunch: {
        type: DataTypes.INTEGER,
        references: {
            model: Meals,
            key: 'id',
        },
    },
    dinner: {
        type: DataTypes.INTEGER,
        references: {
            model: Meals,
            key: 'id',
        },
    },
}, {
    tableName: 'user_meals',
    timestamps: true,
});

// Asociaciones con alias específicos
User_meals.belongsTo(Meals, { foreignKey: 'breakfast', as: 'breakfastMeal' });
User_meals.belongsTo(Meals, { foreignKey: 'lunch', as: 'lunchMeal' });
User_meals.belongsTo(Meals, { foreignKey: 'dinner', as: 'dinnerMeal' });

module.exports = User_meals;