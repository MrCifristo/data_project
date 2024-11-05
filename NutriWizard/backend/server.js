// File: server.js

const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario');
const Authentication = require('./models/Authentication');
const UserMeal = require('./models/userMeal');
const Meal = require('./models/meal');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

// Sincroniza los modelos con la base de datos solo si la base de datos aún no tiene las tablas
sequelize.authenticate()
    .then(() => {
        console.log("Conexión exitosa a la base de datos.");
        return sequelize.sync({ alter: true }); // Usa { alter: true } en lugar de { force: false } para actualizar la estructura sin eliminar datos
    })
    .then(() => {
        console.log("Sincronización de modelos exitosa.");
        // Iniciar el servidor después de sincronizar los modelos
        app.listen(port, '0.0.0.0', () => {
            console.log(`Servidor ejecutándose en el puerto ${port}`);
            console.log('Hora actual del servidor:', new Date().toISOString());
        });
    })
    .catch((error) => {
        console.error("Error al conectar o sincronizar con la base de datos:", error);
    });

// Model Associations
Usuario.hasOne(Authentication, { foreignKey: 'usuario_id', as: 'authentication' });
Authentication.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

Usuario.hasMany(UserMeal, { foreignKey: 'userId', as: 'userMeals' });
UserMeal.belongsTo(Meal, { foreignKey: 'breakfast', as: 'breakfastMeal' });
UserMeal.belongsTo(Meal, { foreignKey: 'lunch', as: 'lunchMeal' });
UserMeal.belongsTo(Meal, { foreignKey: 'dinner', as: 'dinnerMeal' });

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the NutriWizard API');
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        console.log('Usuario creado:', usuario);
        res.status(201).json({ id: usuario.id });
    } catch (error) {
        console.error('Error en /signup:', error.message);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Register Authentication Endpoint
app.post('/register-auth', async (req, res) => {
    const { usuario_id, email, password } = req.body;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const auth = await Authentication.create({
            usuario_id,
            email,
            password_hash: hashedPassword
        });
        console.log('Autenticación creada:', auth);
        res.status(201).json({ message: 'Autenticación creada exitosamente' });
    } catch (error) {
        console.error('Error en /register-auth:', error.message);
        res.status(500).json({ error: 'Error al registrar la autenticación' });
    }
});

// Login Endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Authentication.findOne({ where: { email } });

        if (!user) {
            console.error('Usuario no encontrado:', email);
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            console.error('Contraseña incorrecta para el usuario:', email);
            return res.status(401).json({ error: 'Email o contraseña incorrectos' });
        }

        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET no está definido en el archivo .env');
            return res.status(500).json({ error: 'Error del servidor: JWT_SECRET no está configurado' });
        }

        const token = jwt.sign(
            { id: user.usuario_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Token generado para el usuario:', user.usuario_id);
        res.json({
            data: {
                id: user.usuario_id,
                email: user.email,
                jwToken: token,
            },
            success: true
        });
    } catch (error) {
        console.error('Error en /login:', error.message);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
});

// Profile Endpoint
app.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        console.error('No se proporcionó un token en la cabecera Authorization');
        return res.status(401).send('No se proporcionó un token');
    }

    try {
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET no está definido en el archivo .env');
            return res.status(500).json({ error: 'Error del servidor: JWT_SECRET no está configurado' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);

        const usuario = await Usuario.findOne({
            where: { id: decoded.id },
            attributes: [
                'id', 'nombre_completo', 'edad', 'sexo', 'altura', 'peso',
                'nivel_actividad', 'consumo_calorias_diario', 'consumo_agua_diario',
                'dieta', 'alergias_alimentarias', 'historial_medico',
                'numero_comidas_bocadillos', 'objetivos_nutricionales'
            ]
        });

        if (!usuario) {
            console.error('Usuario no encontrado para el ID:', decoded.id);
            return res.status(404).send('Usuario no encontrado');
        }

        console.log('Datos del usuario encontrados:', usuario);
        res.json(usuario);
    } catch (error) {
        console.error('Error verificando el token en /profile:', error.message);
        res.status(401).send('Token inválido');
    }
});

// User Meals Endpoint
app.get('/user-meals', async (req, res) => {
    try {
        const userMeals = await UserMeal.findAll({
            include: [
                { model: Meal, as: 'breakfastMeal' },
                { model: Meal, as: 'lunchMeal' },
                { model: Meal, as: 'dinnerMeal' }
            ]
        });

        if (!userMeals || userMeals.length === 0) {
            return res.status(404).json({ error: 'User meals not found' });
        }

        res.json(userMeals);
    } catch (error) {
        console.error('Error en /user-meals:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Create Meal Endpoint
app.post('/meals', async (req, res) => {
    try {
        const meal = await Meal.create(req.body);
        console.log('Comida creada:', meal);
        res.status(201).json(meal);
    } catch (error) {
        console.error('Error en /meals:', error.message);
        res.status(500).json({ error: 'Error al crear la comida' });
    }
});

// Update Meal Endpoint
app.put('/meals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Meal.update(req.body, { where: { id } });

        if (updated) {
            const updatedMeal = await Meal.findOne({ where: { id } });
            console.log('Comida actualizada:', updatedMeal);
            res.status(200).json(updatedMeal);
        } else {
            res.status(404).json({ error: 'Comida no encontrada' });
        }
    } catch (error) {
        console.error('Error en /meals/:id:', error.message);
        res.status(500).json({ error: 'Error al actualizar la comida' });
    }
});

// Delete Meal Endpoint
app.delete('/meals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Meal.destroy({ where: { id } });

        if (deleted) {
            console.log('Comida eliminada con ID:', id);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Comida no encontrada' });
        }
    } catch (error) {
        console.error('Error en /meals/:id:', error.message);
        res.status(500).json({ error: 'Error al eliminar la comida' });
    }
});
