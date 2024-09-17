// backend/sequelize.js

const { Sequelize } = require('sequelize');

// Configuración de la conexión a la base de datos
const sequelize = new Sequelize('first_db', 'root', 'root', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false  // Puedes habilitar los logs de SQL pasando console.log
});

module.exports = sequelize;
