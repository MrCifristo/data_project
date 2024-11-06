// File: routes/userRoutes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Authentication = require('../models/Authentication');
require('dotenv').config();

const router = express.Router();

// Signup Endpoint
router.post('/signup', async (req, res) => {
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
router.post('/register-auth', async (req, res) => {
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
router.post('/login', async (req, res) => {
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
router.get('/profile', async (req, res) => {
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

module.exports = router;