const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Authentication = require('../models/Authentication'); // Modelo de autenticación
require('dotenv').config();

const router = express.Router();

// Registro de autenticación
router.post('/register', async (req, res) => {
    const { usuario_id, email, password } = req.body;

    try {
        if (!usuario_id || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Verificar si el email ya existe
        const existingUser = await Authentication.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Hashear la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear una nueva autenticación
        const auth = new Authentication({
            usuario_id,
            email,
            password_hash: hashedPassword,
        });
        await auth.save();

        res.status(201).json({ message: 'Autenticación registrada', auth });
    } catch (error) {
        console.error('Error en /register:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        // Buscar el usuario por email
        const user = await Authentication.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign(
            { id: user.usuario_id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        console.error('Error en /login:', error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

module.exports = router;