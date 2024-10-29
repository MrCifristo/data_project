// server.js
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario');
const Authentication = require('./models/Authentication');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5001;

// Model Associations
Usuario.hasOne(Authentication, { foreignKey: 'usuario_id', as: 'authentication' });
Authentication.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'usuario' });

// Root Route
app.get('/', (req, res) => {
    res.send('Welcome to the NutriWizard API');
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json({ id: usuario.id });
    } catch (error) {
        console.error('Error en /signup:', error);
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
});

// Register Authentication Endpoint
app.post('/register-auth', async (req, res) => {
    const { usuario_id, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
        const auth = await Authentication.create({
            usuario_id,
            email,
            password_hash: hashedPassword
        });
        res.status(201).json({ message: 'Autenticación creada exitosamente' });
    } catch (error) {
        console.error('Error en /register-auth:', error);
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

        // Check if JWT_SECRET is loaded
        if (!process.env.JWT_SECRET) {
            console.error('JWT_SECRET no está definido en el archivo .env');
            return res.status(500).json({ error: 'Error del servidor: JWT_SECRET no está configurado' });
        }

        const token = jwt.sign(
            { id: user.usuario_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        console.log('Token generado:', token); // Log token generado

        // Decodificación de prueba para ver si el token es válido justo después de crearlo
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log('Token verificado correctamente en /login:', decoded);
        } catch (verifyError) {
            console.error('Error al verificar el token justo después de generarlo:', verifyError);
        }

        res.json({
            data: {
                id: user.usuario_id,
                email: user.email,
                jwToken: token,
            },
            success: true
        });
    } catch (error) {
        console.error('Error en /login:', error);
        res.status(500).json({ error: 'Error en el inicio de sesión' });
    }
});

// Profile Endpoint
app.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    console.log('Token recibido en /profile:', token);

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
        console.log('Token decodificado en /profile:', decoded);

        const usuario = await Usuario.findOne({
            where: { id: decoded.id },
            include: [{ model: Authentication, as: 'authentication' }]
        });

        if (!usuario) {
            console.error('Usuario no encontrado para el ID:', decoded.id);
            return res.status(404).send('Usuario no encontrado');
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error verificando el token en /profile:', error);
        res.status(401).send('Token inválido');
    }
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en el puerto ${port}`);
});