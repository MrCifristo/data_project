// File: server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const mealRoutes = require('./routes/mealRoutes');
const userRoutes = require('./routes/userRoutes');
const menuRoutes = require('./routes/menuRoutes');
const logger = require('./config/logger'); // Importar logger
require('dotenv').config();

const Authentication = require('./models/authentication');
const Meals = require('./models/meals');
const Menu = require('./models/menu');
const UserMeals = require('./models/user_meals');
const Usuario = require('./models/usuarios');

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

// Logging de inicio del servidor
logger.info('Iniciando servidor...');

// Conexión a MongoDB con autenticación
const connectToMongoDB = async () => {
    try {
        logger.info('Intentando conectar a MongoDB...');
        const mongoUri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin', // Cambiar si usas otro authSource
        });

        logger.info('Conexión exitosa a MongoDB.');

        // Sembrar la base de datos con datos iniciales
        await seedDatabase();

        // Iniciar el servidor después de una conexión exitosa a la base de datos
        app.listen(port, '0.0.0.0', () => {
            logger.info(`Servidor ejecutándose en el puerto ${port}`);
        });
    } catch (error) {
        logger.error('Error al conectar a MongoDB:', error.message);
        logger.error('Stacktrace:', error.stack);
        process.exit(1); // Salir de la aplicación si no se puede conectar a la base de datos
    }
};

// Función para insertar datos iniciales
const seedDatabase = async () => {
    try {
        logger.info('Iniciando la inserción de datos iniciales...');

        // Verifica si ya existe un usuario con el nombre "Test User"
        const existingUser = await Usuario.findOne({ nombre_completo: 'Test User' });
        if (existingUser) {
            logger.info('Datos iniciales ya existen. Saltando la inserción.');
            return;
        }

        const userId = new mongoose.Types.ObjectId();
        const mealId = new mongoose.Types.ObjectId();

        logger.info('Insertando datos en Authentication...');
        await Authentication.create({
            usuario_id: userId,
            email: 'test@example.com',
            password_hash: 'hashedPassword',
        });

        logger.info('Insertando datos en Meals...');
        const meal = await Meals.create({
            _id: mealId,
            name: 'Test Meal',
            calories: 500,
            protein: 20,
            fats: 10,
            carbs: 50,
            mealType: 'lunch',
        });

        logger.info('Insertando datos en Menu...');
        await Menu.create({
            userId,
            mealId,
            name: meal.name,
            calories: meal.calories,
            protein: meal.protein,
            fats: meal.fats,
            carbs: meal.carbs,
            mealType: meal.mealType,
        });

        logger.info('Insertando datos en UserMeals...');
        await UserMeals.create({
            userId,
            breakfast: meal._id,
            lunch: null,
            dinner: null,
        });

        logger.info('Insertando datos en Usuario...');
        await Usuario.create({
            _id: userId,
            nombre_completo: 'Test User',
            edad: 25,
            sexo: 'masculino',
            altura: 180,
            peso: 75,
            nivel_actividad: 'moderado',
            historial_medico: 'N/A',
            alergias_alimentarias: 'N/A',
            condicion_especifica: 'N/A',
            objetivos_nutricionales: 'Mantener peso',
            dieta: 'balanceada',
            consumo_calorias_diario: 2000,
            numero_comidas_bocadillos: 3,
            consumo_agua_diario: 2,
        });

        logger.info('Datos iniciales insertados correctamente.');
    } catch (error) {
        logger.error('Error al insertar datos iniciales:', error.message);
        logger.error('Stacktrace:', error.stack);
    }
};

// Llamar a la función de conexión
connectToMongoDB();

// Ruta raíz
app.get('/', (req, res) => {
    res.send('Welcome to the NutriWizard API');
});

// Rutas API
app.use('/api/meals', mealRoutes);
app.use('/api/users', userRoutes);
app.use('/api/menu', menuRoutes);

module.exports = app;