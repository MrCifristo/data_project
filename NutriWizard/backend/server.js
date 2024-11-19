// File: server.js
console.log('Iniciando servidor...'); // Agregar esto al inicio de server.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());//

const port = process.env.PORT || 5001;
const db = require('./models');

(async () => {
    try {
        console.log('Modelos cargados:', Object.keys(db)); // Verifica modelos cargados

        const menus = await db.menu.findAll(); // Intenta consultar la tabla Menus
        console.log('Menus encontrados:', menus);
    } catch (error) {
        console.error('Error interactuando con el modelo Menu:', error);
    }
})();

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos.");

        await sequelize.sync();
        console.log("Sincronizacion de todas las tablas completada")

        //limpiar tabla meals
        //await meals.destroy({ where: {} });
        //console.log("Eliminamos lo que esta en meals");

        // Sincronizar el modelo de meal primero para que existan las claves necesarias
        // await meals.sync({ alter: true });
        // console.log("Sincronización de 'meal' completa.");


        // Desactivar restricciones de clave foránea temporalmente
        // await sequelize.query('SET session_replication_role = replica');

        // **Eliminar esta línea para evitar limpiar la tabla 'user_meals'**
        //await user_meal.destroy({ where: {} });
        //console.log("Sincronización de 'user_meal' sin limpieza.");

        // Sincronizar user_meal
        // await user_meals.sync({ alter: true });
        // console.log("Sincronización de 'user_meal' completa.");

        // Reactivar restricciones de clave foránea
        // await sequelize.query('SET session_replication_role = DEFAULT');
        // console.log("Restricciones de clave foránea reactivadas.");

        app.listen(port, '0.0.0.0', () => {
            console.log(`Servidor ejecutándose en el puerto ${port}`);
        });

    } catch (error) {
        console.error("Error al conectar o sincronizar con la base de datos:", error);
    }
};

// Inicia la sincronización de la base de datos
syncDatabase();

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Welcome to the NutriWizard API');
});

// Rutas API
app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);

module.exports = app;