// File: migrations/20241105002416-create-meals.js
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('meals', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
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
    await queryInterface.dropTable('meals');
  }
};