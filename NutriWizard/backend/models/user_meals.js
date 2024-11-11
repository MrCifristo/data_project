// File: models/user_meals.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
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
        allowNull: true,
        references: {
            model: Meals,
            key: 'id',
        },
    },
    lunch: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Meals,
            key: 'id',
        },
    },
    dinner: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
User_meals.belongsTo(Meals, { foreignKey: 'breakfast', as: 'breakfastMeal', onDelete: 'CASCADE' });
User_meals.belongsTo(Meals, { foreignKey: 'lunch', as: 'lunchMeal', onDelete: 'CASCADE' });
User_meals.belongsTo(Meals, { foreignKey: 'dinner', as: 'dinnerMeal', onDelete: 'CASCADE' });

module.exports = User_meals;