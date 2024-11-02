const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false
});

// Sincroniza los modelos con la base de datos solo si la base de datos aún no tiene las tablas
sequelize.authenticate()
    .then(() => {
        console.log("Conexión exitosa a la base de datos.");
        return sequelize.sync({ alter: true }); // Usa { alter: true } en lugar de { force: false } para actualizar la estructura sin eliminar datos
    })
    .then(() => {
        console.log("Sincronización de modelos exitosa.");
    })
    .catch((error) => {
        console.error("Error al conectar o sincronizar con la base de datos:", error);
    });

module.exports = sequelize;
