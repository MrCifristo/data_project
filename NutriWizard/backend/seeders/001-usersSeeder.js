// File: seeders/001-usersSeeder.js
'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Eliminar todos los registros de 'usuarios' antes de poblar la tabla
        await queryInterface.bulkDelete('authentication', null, {});
        await queryInterface.bulkDelete('usuarios', null, {});

        await queryInterface.bulkInsert('usuarios', [
            {
                id: 1,
                nombre_completo: 'Ana López',
                edad: 29,
                sexo: 'female',
                altura: 165,
                peso: 60,
                nivel_actividad: 'Moderado',
                historial_medico: 'Asma',
                alergias_alimentarias: 'Lácteos',
                condicion_especifica: 'Bajo peso',
                objetivos_nutricionales: 'Aumento de peso',
                dieta: 'Vegetariana',
                consumo_calorias_diario: 2200,
                numero_comidas_bocadillos: 3,
                consumo_agua_diario: 2
            },
            {
                id: 2,
                nombre_completo: 'Carlos Méndez',
                edad: 35,
                sexo: 'male',
                altura: 178,
                peso: 85,
                nivel_actividad: 'Alto',
                historial_medico: 'Ninguno',
                alergias_alimentarias: 'Gluten',
                condicion_especifica: 'Ninguna',
                objetivos_nutricionales: 'Ganancia muscular',
                dieta: 'Omnívora',
                consumo_calorias_diario: 3000,
                numero_comidas_bocadillos: 5,
                consumo_agua_diario: 3
            },
            {
                id: 3,
                nombre_completo: 'Beatriz Fernández',
                edad: 42,
                sexo: 'female',
                altura: 160,
                peso: 68,
                nivel_actividad: 'Bajo',
                historial_medico: 'Diabetes',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Obesidad',
                objetivos_nutricionales: 'Pérdida de peso',
                dieta: 'Vegana',
                consumo_calorias_diario: 1800,
                numero_comidas_bocadillos: 3,
                consumo_agua_diario: 2
            },
            {
                id: 4,
                nombre_completo: 'Diego Vargas',
                edad: 25,
                sexo: 'male',
                altura: 170,
                peso: 70,
                nivel_actividad: 'Bajo',
                historial_medico: 'Ninguno',
                alergias_alimentarias: 'Frutos secos',
                condicion_especifica: 'Sobrepeso',
                objetivos_nutricionales: 'Pérdida de peso',
                dieta: 'Omnívora',
                consumo_calorias_diario: 2500,
                numero_comidas_bocadillos: 4,
                consumo_agua_diario: 3
            },
            {
                id: 5,
                nombre_completo: 'Elena Sánchez',
                edad: 30,
                sexo: 'female',
                altura: 160,
                peso: 60,
                nivel_actividad: 'Moderado',
                historial_medico: 'Hipotiroidismo',
                alergias_alimentarias: 'Mariscos',
                condicion_especifica: 'Ninguna',
                objetivos_nutricionales: 'Mantenimiento',
                dieta: 'Paleo',
                consumo_calorias_diario: 2100,
                numero_comidas_bocadillos: 3,
                consumo_agua_diario: 2
            },
            {
                id: 6,
                nombre_completo: 'Fernanda Ortiz',
                edad: 27,
                sexo: 'female',
                altura: 155,
                peso: 55,
                nivel_actividad: 'Moderado',
                historial_medico: 'Anemia',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Bajo peso',
                objetivos_nutricionales: 'Aumento de peso',
                dieta: 'Vegetariana',
                consumo_calorias_diario: 2200,
                numero_comidas_bocadillos: 4,
                consumo_agua_diario: 2.5
            },
            {
                id: 7,
                nombre_completo: 'Gabriel Espinoza',
                edad: 32,
                sexo: 'male',
                altura: 185,
                peso: 90,
                nivel_actividad: 'Alto',
                historial_medico: 'Asma',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Ninguna',
                objetivos_nutricionales: 'Ganancia muscular',
                dieta: 'Omnívora',
                consumo_calorias_diario: 2800,
                numero_comidas_bocadillos: 5,
                consumo_agua_diario: 3
            },
            {
                id: 8,
                nombre_completo: 'Héctor Ruiz',
                edad: 40,
                sexo: 'male',
                altura: 180,
                peso: 100,
                nivel_actividad: 'Bajo',
                historial_medico: 'Hipertensión',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Obesidad',
                objetivos_nutricionales: 'Pérdida de peso',
                dieta: 'Vegana',
                consumo_calorias_diario: 1800,
                numero_comidas_bocadillos: 3,
                consumo_agua_diario: 2.5
            },
            {
                id: 9,
                nombre_completo: 'Isabel Romero',
                edad: 45,
                sexo: 'female',
                altura: 170,
                peso: 75,
                nivel_actividad: 'Moderado',
                historial_medico: 'Diabetes',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Ninguna',
                objetivos_nutricionales: 'Control de glucosa',
                dieta: 'Mediterránea',
                consumo_calorias_diario: 2000,
                numero_comidas_bocadillos: 4,
                consumo_agua_diario: 2
            },
            {
                id: 10,
                nombre_completo: 'Jorge Pérez',
                edad: 50,
                sexo: 'male',
                altura: 178,
                peso: 92,
                nivel_actividad: 'Moderado',
                historial_medico: 'Cardiopatía',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Sobrepeso',
                objetivos_nutricionales: 'Pérdida de peso',
                dieta: 'Vegetariana',
                consumo_calorias_diario: 1900,
                numero_comidas_bocadillos: 3,
                consumo_agua_diario: 2
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('usuarios', { id: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }, {});
    }
};