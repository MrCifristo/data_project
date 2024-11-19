'use strict';

module.exports = (sequelize, DataTypes) => {
    const Meals = sequelize.define('meals', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        calories: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        protein: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fats: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        carbs: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mealType: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'unknown',
        },
    }, {
        tableName: 'meals', // Nombre exacto de la tabla en la base de datos
        timestamps: true,   // Para createdAt y updatedAt
    });

    return Meals;
};
