'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

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
            const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

            if (!model.name) {
                console.warn(`El archivo ${file} no exporta un modelo válido.`);
            } else {
                console.log(`Modelo cargado: ${model.name}`);
                db[model.name] = model;
            }
        } catch (error) {
            console.error(`Error cargando modelo desde archivo: ${file}`);
            console.error(error);
        }
    });

// Configurar asociaciones (associations) para cada modelo cargado
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        try {
            console.log(`Estableciendo asociaciones para el modelo: ${modelName}`);
            db[modelName].associate(db);
        } catch (error) {
            console.error(`Error al establecer asociaciones para el modelo: ${modelName}`);
            console.error(error);
        }
    }
});

// Validar que todos los modelos requeridos están registrados
console.log('Modelos registrados:', Object.keys(db));

// Agregar la instancia de Sequelize al objeto db
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;