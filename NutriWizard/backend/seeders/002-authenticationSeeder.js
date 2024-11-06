// File: seeders/002-authenticationSeeder.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Eliminar todos los registros de 'authentication' antes de poblar la tabla
        await queryInterface.bulkDelete('authentication', null, {});

        await queryInterface.bulkInsert('authentication', [
            {
                id: 1,
                usuario_id: 1,
                email: 'ana.lopez@example.com',
                password_hash: '$2a$10$examplepasswordhash1',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 2,
                usuario_id: 2,
                email: 'carlos.mendez@example.com',
                password_hash: '$2a$10$examplepasswordhash2',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 3,
                usuario_id: 3,
                email: 'beatriz.fernandez@example.com',
                password_hash: '$2a$10$examplepasswordhash3',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 4,
                usuario_id: 4,
                email: 'diego.vargas@example.com',
                password_hash: '$2a$10$examplepasswordhash4',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 5,
                usuario_id: 5,
                email: 'elena.sanchez@example.com',
                password_hash: '$2a$10$examplepasswordhash5',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 6,
                usuario_id: 6,
                email: 'fernanda.ortiz@example.com',
                password_hash: '$2a$10$examplepasswordhash6',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 7,
                usuario_id: 7,
                email: 'gabriel.espinoza@example.com',
                password_hash: '$2a$10$examplepasswordhash7',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 8,
                usuario_id: 8,
                email: 'hector.ruiz@example.com',
                password_hash: '$2a$10$examplepasswordhash8',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 9,
                usuario_id: 9,
                email: 'isabel.romero@example.com',
                password_hash: '$2a$10$examplepasswordhash9',
                created_at: new Date(),
                updated_at: new Date()
            },
            {
                id: 10,
                usuario_id: 10,
                email: 'jorge.perez@example.com',
                password_hash: '$2a$10$examplepasswordhash10',
                created_at: new Date(),
                updated_at: new Date()
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('authentication', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, {});
    }
};