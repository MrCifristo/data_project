const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Comida = sequelize.define('Comida', {
    nombre_platillo: DataTypes.STRING,
    calorias: DataTypes.FLOAT,
    proteinas: DataTypes.FLOAT,
    carbohidratos: DataTypes.FLOAT,
    grasas: DataTypes.FLOAT,
    tipo_dieta: DataTypes.STRING,  // Ej: Vegano, Vegetariano, Omnívoro
    restricciones_alimentarias: DataTypes.ARRAY(DataTypes.STRING),  // Ej: Sin gluten, Sin lactosa
    nivel_actividad_recomendado: DataTypes.STRING,  // Ej: Sedentario, Moderado, Muy activo
    condicion_medica_recomendada: DataTypes.ARRAY(DataTypes.STRING),  // Ej: Hipertensión, Diabetes
    objetivos_nutricionales_recomendados: DataTypes.ARRAY(DataTypes.STRING),  // Ej: Pérdida de peso, Ganancia muscular
}, {
    tableName: 'comidas',
    timestamps: false
});

module.exports = Comida;