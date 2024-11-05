'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('user_meals', [
            { id: 1, userId: 1, breakfast: 1, lunch: 2, dinner: 3, createdAt: new Date(), updatedAt: new Date() },
            { id: 2, userId: 34, breakfast: 4, lunch: 5, dinner: 6, createdAt: new Date(), updatedAt: new Date() },
            { id: 3, userId: 35, breakfast: 7, lunch: 8, dinner: 9, createdAt: new Date(), updatedAt: new Date() },
            { id: 4, userId: 36, breakfast: 10, lunch: 11, dinner: 12, createdAt: new Date(), updatedAt: new Date() },
            { id: 5, userId: 37, breakfast: 13, lunch: 14, dinner: 15, createdAt: new Date(), updatedAt: new Date() },
            { id: 6, userId: 38, breakfast: 16, lunch: 17, dinner: 18, createdAt: new Date(), updatedAt: new Date() },
            { id: 7, userId: 39, breakfast: 19, lunch: 20, dinner: 1, createdAt: new Date(), updatedAt: new Date() },
            { id: 8, userId: 40, breakfast: 2, lunch: 3, dinner: 4, createdAt: new Date(), updatedAt: new Date() },
            { id: 9, userId: 41, breakfast: 5, lunch: 6, dinner: 7, createdAt: new Date(), updatedAt: new Date() },
            { id: 10, userId: 2, breakfast: 8, lunch: 9, dinner: 10, createdAt: new Date(), updatedAt: new Date() }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('user_meals', null, {});
    }
};
