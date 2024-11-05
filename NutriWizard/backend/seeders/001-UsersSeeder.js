'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('usuarios', [
            {
                id: 2, // Nuevo usuario para evitar conflicto con FK
                nombre_completo: 'Piccolo Daimao',
                edad: 65,
                sexo: 'male',
                altura: 200,
                peso: 90,
                nivel_actividad: 'Moderado',
                historial_medico: 'Ninguno',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Ninguna',
                objetivos_nutricionales: 'Pérdida de peso',
                dieta: 'Vegetariana',
                consumo_calorias_diario: 1800,
                numero_comidas_bocadillos: 4,
                consumo_agua_diario: 3
            },
            {
                id: 60, // Cambié el ID para evitar conflicto
                nombre_completo: 'Goku Deidad',
                edad: 50,
                sexo: 'male',
                altura: 187,
                peso: 105,
                nivel_actividad: 'Muy intenso',
                historial_medico: 'Ninguno',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Intolerancia al gluten',
                objetivos_nutricionales: 'Ganancia de masa muscular',
                dieta: 'Omnívora',
                consumo_calorias_diario: 3500,
                numero_comidas_bocadillos: 6,
                consumo_agua_diario: 4
            },
            {
                id: 61, // Cambié el ID para evitar conflicto
                nombre_completo: 'Shenron',
                edad: 88,
                sexo: 'male',
                altura: 180,
                peso: 65,
                nivel_actividad: 'Sedentario',
                historial_medico: 'Hipertensión',
                alergias_alimentarias: 'Ninguna',
                condicion_especifica: 'Otra',
                objetivos_nutricionales: 'Salud general y bienestar',
                dieta: 'Vegana',
                consumo_calorias_diario: 2000,
                numero_comidas_bocadillos: 3,
                consumo_agua_diario: 2
            }
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('usuarios', { id: [2, 60, 61] }, {});
    }
};
