// File: migrations/20241105002416-create-menu.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Menus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'usuarios', // FK con la tabla usuarios
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      mealId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'meals', // FK con la tabla meals
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      // Datos adicionales de la comida, extraídos del modelo `Meals`
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      calories: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      protein: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      fats: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      carbs: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      mealType: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'unknown'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Menus');
  }
};