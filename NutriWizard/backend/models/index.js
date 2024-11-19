'use strict';

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const basename = path.basename(__filename);
const db = {};

// Conectar a MongoDB
const connectMongoDB = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/NutriWizard';
        console.log(`Conectando a MongoDB en: ${mongoUri}`);
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a MongoDB');
    } catch (error) {
        console.error('Error al conectar a MongoDB:', error.message);
        process.exit(1); // Salir si no se puede conectar
    }
};

// Leer y cargar todos los modelos en la carpeta 'models'
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (
            file.indexOf('.') !== 0 && // Excluir archivos ocultos
            file !== basename && // Excluir este archivo (index.js)
            file.slice(-3) === '.js' && // Solo incluir archivos .js
            file.indexOf('.test.js') === -1 // Excluir archivos de prueba
        );
    })
    .forEach(file => {
        try {
            console.log(`Intentando cargar modelo desde archivo: ${file}`);
            const modelPath = path.join(__dirname, file);

            // Verificar si el modelo ya fue registrado
            const model = require(modelPath);
            const modelName = model.modelName || file.replace('.js', '');

            if (mongoose.models[modelName]) {
                console.warn(`Modelo ${modelName} ya está registrado. Saltando registro.`);
                db[modelName] = mongoose.models[modelName];
            } else if (!model.modelName) {
                console.warn(`El archivo ${file} no exporta un modelo válido.`);
            } else {
                console.log(`Modelo cargado: ${modelName}`);
                db[modelName] = model;
            }
        } catch (error) {
            console.error(`Error cargando modelo desde archivo: ${file}`);
            console.error(error);
        }
    });

// Exportar la conexión y los modelos
db.connectMongoDB = connectMongoDB;
module.exports = db;