'use strict';

const mongoose = require('mongoose');

const modelName = 'usuarios';

if (!mongoose.models[modelName]) {
    // Definir el esquema para usuarios
    const usuarioSchema = new mongoose.Schema(
        {
            nombre_completo: {
                type: String,
                required: true,
                trim: true, // Elimina espacios al inicio y al final
            },
            edad: {
                type: Number,
                required: true,
            },
            sexo: {
                type: String,
                required: true,
                enum: ['masculino', 'femenino', 'otro'], // Valores permitidos
            },
            altura: {
                type: Number,
                required: true, // Altura en cm
            },
            peso: {
                type: Number,
                required: true, // Peso en kg
            },
            nivel_actividad: {
                type: String,
                required: true,
                enum: ['sedentario', 'ligero', 'moderado', 'intenso'], // Opciones predefinidas
            },
            historial_medico: {
                type: String,
                required: true,
            },
            alergias_alimentarias: {
                type: String,
                required: true,
            },
            condicion_especifica: {
                type: String,
                required: true,
            },
            objetivos_nutricionales: {
                type: String,
                required: true,
            },
            dieta: {
                type: String,
                required: true,
            },
            consumo_calorias_diario: {
                type: Number,
                required: true, // Calorías consumidas por día
            },
            numero_comidas_bocadillos: {
                type: Number,
                required: true, // Número de comidas/snacks por día
            },
            consumo_agua_diario: {
                type: Number,
                required: true, // Litros de agua consumidos por día
            },
        },
        {
            timestamps: true, // Agrega createdAt y updatedAt automáticamente
            collection: 'usuarios', // Nombre exacto de la colección en la base de datos
        }
    );

    mongoose.model(modelName, usuarioSchema);
}

module.exports = mongoose.models[modelName];