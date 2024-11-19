'use strict';

module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('menu', {
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'usuarios', // Nombre de la tabla referenciada
                key: 'id',
            },
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'meals', // Nombre de la tabla referenciada
                key: 'id',
            },
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
        tableName: 'Menus', // Nombre exacto de la tabla en la base de datos
        timestamps: true,
    });

    // Asociaciones
    Menu.associate = (models) => {
        Menu.belongsTo(models.usuario, { foreignKey: 'userId', as: 'user' });
        Menu.belongsTo(models.meals, { foreignKey: 'mealId', as: 'meal' });
    };

    return Menu;
};