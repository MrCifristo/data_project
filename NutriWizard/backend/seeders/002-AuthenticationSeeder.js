'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('authentication', [
            {
                id: 52, // Cambié el ID para evitar conflicto
                usuario_id: 50,
                email: 'goku.deidad@example.com',
                password_hash: '$2a$10$r894IvWY/3SEKGEJTKXuGemWKT4kell0zqkkz6Uoc4F3FFuMgsVgS',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 53, // Cambié el ID para evitar conflicto
                usuario_id: 51,
                email: 'shenron@example.com',
                password_hash: '$2a$10$nLBGuiqWWaB.R/qC9cgjqedTqv7uO0ux4X3OJB4xDM1gg5T19RQZ2',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('authentication', { id: [52, 53] }, {});
    }
};
