// File: seeders/004-user_mealsSeeder.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Eliminar todos los registros de 'user_meals' antes de poblar la tabla
        await queryInterface.bulkDelete('user_meals', null, {});

        await queryInterface.bulkInsert('user_meals', [
            { id: 1, userId: 1, breakfast: 1, lunch: 2, dinner: 3, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, userId: 2, breakfast: 2, lunch: 3, dinner: 4, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, userId: 3, breakfast: 3, lunch: 4, dinner: 5, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, userId: 4, breakfast: 4, lunch: 5, dinner: 6, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, userId: 5, breakfast: 5, lunch: 6, dinner: 7, createdAt: new Date(), updatedAt: new Date() },
            { id: 6, userId: 6, breakfast: 6, lunch: 7, dinner: 8, createdAt: new Date(), updatedAt: new Date() },
            { id: 7, userId: 7, breakfast: 7, lunch: 8, dinner: 9, createdAt: new Date(), updatedAt: new Date() },
            { id: 8, userId: 8, breakfast: 8, lunch: 9, dinner: 10, createdAt: new Date(), updatedAt: new Date() },
            { id: 9, userId: 9, breakfast: 9, lunch: 10, dinner: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 10, userId: 10, breakfast: 10, lunch: 1, dinner: 2, createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_meals', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, {});
    }
};