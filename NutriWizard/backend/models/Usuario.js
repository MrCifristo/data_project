// backend/models/Usuario.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize.js');

const Usuario = sequelize.define('Usuario', {
    nombre_completo: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    sexo: DataTypes.STRING,
    altura: DataTypes.FLOAT,
    peso: DataTypes.FLOAT,
    nivel_actividad: DataTypes.STRING,
    historial_medico: DataTypes.STRING,  // Cambiado a STRING
    alergias_alimentarias: DataTypes.STRING,
    condicion_especifica: DataTypes.STRING,  // Cambiado a STRING
    objetivos_nutricionales: DataTypes.STRING,  // Cambiado a STRING
    dieta: DataTypes.STRING,
    consumo_calorias_diario: DataTypes.FLOAT,
    numero_comidas_bocadillos: DataTypes.INTEGER,
    consumo_agua_diario: DataTypes.FLOAT,
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;
