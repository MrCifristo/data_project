'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthenticationRepository = require('../repositories/AuthenticationRepository'); // MongoDB Repository

const authenticationController = {
    async register(req, res) {
        try {
            const { email, password } = req.body;

            // Validación de datos de entrada
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
            }

            // Comprobar si el usuario ya existe
            const existingAuth = await AuthenticationRepository.findByEmail(email);
            if (existingAuth) {
                return res.status(400).json({ message: 'El email ya está registrado.' });
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el nuevo usuario en MongoDB
            const newAuth = await AuthenticationRepository.create({
                email,
                password_hash: hashedPassword,
            });

            // Respuesta exitosa
            res.status(201).json({ message: 'Registro exitoso.', auth: newAuth });
        } catch (error) {
            console.error('Error en /register:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;

            // Validación de datos de entrada
            if (!email || !password) {
                return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
            }

            // Buscar usuario por email
            const auth = await AuthenticationRepository.findByEmail(email);
            if (!auth) {
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, auth.password_hash);
            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Contraseña incorrecta.' });
            }

            // Generar token JWT
            const token = jwt.sign({ id: auth._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            // Respuesta exitosa
            res.status(200).json({ message: 'Inicio de sesión exitoso.', token });
        } catch (error) {
            console.error('Error en /login:', error);
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

module.exports = authenticationController;