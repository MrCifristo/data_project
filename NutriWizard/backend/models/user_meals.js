'use strict';

module.exports = (sequelize, DataTypes) => {
    const UserMeals = sequelize.define('user_meals', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', // Debe coincidir con el nombre de la tabla usuarios
                key: 'id',
            },
        },
        breakfast: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'meals', // Nombre en minúsculas
                key: 'id',
            },
        },
        lunch: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'meals', // Nombre en minúsculas
                key: 'id',
            },
        },
        dinner: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'meals', // Nombre en minúsculas
                key: 'id',
            },
        },
    }, {
        tableName: 'user_meals',
        timestamps: true,
    });

    // Asociaciones
    UserMeals.associate = (models) => {
        UserMeals.belongsTo(models.meals, { foreignKey: 'breakfast', as: 'breakfastMeal', onDelete: 'CASCADE' });
        UserMeals.belongsTo(models.meals, { foreignKey: 'lunch', as: 'lunchMeal', onDelete: 'CASCADE' });
        UserMeals.belongsTo(models.meals, { foreignKey: 'dinner', as: 'dinnerMeal', onDelete: 'CASCADE' });
    };

    return UserMeals;
};