// File: server.js

const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const logger = require('./config/logger'); // Importar logger
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;
const db = require('./models');

// Logging de inicio del servidor
logger.info('Iniciando servidor...');

(async () => {
    try {
        logger.info('Modelos cargados: ' + Object.keys(db).join(', '));

        const menus = await db.menu.findAll(); // Intenta consultar la tabla Menus
        logger.info(`Menus encontrados: ${JSON.stringify(menus)}`);
    } catch (error) {
        logger.error('Error interactuando con el modelo Menu:', error);
    }
})();

const syncDatabase = async () => {
    try {
        await sequelize.authenticate();
        logger.info('Conexión exitosa a la base de datos.');

        await sequelize.sync();
        logger.info('Sincronización de todas las tablas completada.');

        app.listen(port, '0.0.0.0', () => {
            logger.info(`Servidor ejecutándose en el puerto ${port}`);
        });
    } catch (error) {
        logger.error('Error al conectar o sincronizar con la base de datos:', error);
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
