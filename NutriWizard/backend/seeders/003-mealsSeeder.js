// File: seeders/003-mealsSeeder.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Eliminar todos los registros de 'meals' antes de poblar la tabla
        await queryInterface.bulkDelete('meals', null, {});

        await queryInterface.bulkInsert('meals', [
            { id: 1, name: 'Breakfast Burrito', calories: 300, protein: 12, fats: 15, carbs: 30, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, name: 'Grilled Chicken Salad', calories: 400, protein: 35, fats: 18, carbs: 10, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, name: 'Pasta Primavera', calories: 500, protein: 15, fats: 20, carbs: 60, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, name: 'Vegetable Stir Fry', calories: 350, protein: 10, fats: 10, carbs: 50, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, name: 'Chicken Caesar Wrap', calories: 450, protein: 30, fats: 25, carbs: 35, createdAt: new Date(), updatedAt: new Date() },
            { id: 6, name: 'Avocado Toast', calories: 250, protein: 6, fats: 14, carbs: 20, createdAt: new Date(), updatedAt: new Date() },
            { id: 7, name: 'Turkey Sandwich', calories: 320, protein: 25, fats: 10, carbs: 40, createdAt: new Date(), updatedAt: new Date() },
            { id: 8, name: 'Beef Tacos', calories: 500, protein: 20, fats: 30, carbs: 45, createdAt: new Date(), updatedAt: new Date() },
            { id: 9, name: 'Quinoa Salad', calories: 400, protein: 15, fats: 18, carbs: 50, createdAt: new Date(), updatedAt: new Date() },
            { id: 10, name: 'Chicken Alfredo', calories: 600, protein: 35, fats: 25, carbs: 60, createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('meals', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, {});
    }
};