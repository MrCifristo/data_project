'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuarios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre_completo: {
        type: Sequelize.STRING
      },
      edad: {
        type: Sequelize.INTEGER
      },
      sexo: {
        type: Sequelize.STRING
      },
      altura: {
        type: Sequelize.FLOAT
      },
      peso: {
        type: Sequelize.FLOAT
      },
      nivel_actividad: {
        type: Sequelize.STRING
      },
      historial_medico: {
        type: Sequelize.STRING
      },
      alergias_alimentarias: {
        type: Sequelize.STRING
      },
      condicion_especifica: {
        type: Sequelize.STRING
      },
      objetivos_nutricionales: {
        type: Sequelize.STRING
      },
      dieta: {
        type: Sequelize.STRING
      },
      consumo_calorias_diario: {
        type: Sequelize.FLOAT
      },
      numero_comidas_bocadillos: {
        type: Sequelize.INTEGER
      },
      consumo_agua_diario: {
        type: Sequelize.FLOAT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('usuarios');
  }
};
