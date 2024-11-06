// File: server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const meals = require('./models/meals'); // Cambiado a minúsculas
const user_meals = require('./models/user_meals'); // Cambiado a minúsculas
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos.");

        //limpiar tabla meals
        //await meals.destroy({ where: {} });
        //console.log("Eliminamos lo que esta en meals");

        // Sincronizar el modelo de meal primero para que existan las claves necesarias
        await meals.sync({ alter: true });
        console.log("Sincronización de 'meal' completa.");


        // Desactivar restricciones de clave foránea temporalmente
        await sequelize.query('SET session_replication_role = replica');

        // **Eliminar esta línea para evitar limpiar la tabla 'user_meals'**
        //await user_meal.destroy({ where: {} });
        //console.log("Sincronización de 'user_meal' sin limpieza.");

        // Sincronizar user_meal
        await user_meals.sync({ alter: true });
        console.log("Sincronización de 'user_meal' completa.");

        // Reactivar restricciones de clave foránea
        await sequelize.query('SET session_replication_role = DEFAULT');
        console.log("Restricciones de clave foránea reactivadas.");

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

module.exports = app;