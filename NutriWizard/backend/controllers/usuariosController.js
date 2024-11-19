'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { usuario } = require('../models');

const usuariosController = {
    /**
     * Maneja la creación de nuevos usuarios.
     */
    async signup(req, res) {
        try {
            console.log('Datos recibidos en /signup:', req.body); // Log para verificar datos recibidos

            const {
                nombre_completo,
                email,
                password,
                edad,
                sexo,
                altura,
                peso,
                nivel_actividad,
                historial_medico,
                alergias_alimentarias,
                condicion_especifica,
                objetivos_nutricionales,
                dieta,
                consumo_calorias_diario,
                numero_comidas_bocadillos,
                consumo_agua_diario,
            } = req.body;

            // Verifica que los campos obligatorios estén presentes
            if (!nombre_completo || !email || !password) {
                console.log('Datos faltantes en /signup:', { nombre_completo, email, password }); // Log para detectar campos faltantes
                return res.status(400).json({ message: 'Nombre, email y contraseña son requeridos.' });
            }

            // Verifica si el correo ya existe
            const existingUser = await usuario.findOne({ where: { email } });
            if (existingUser) {
                console.log('Correo ya registrado en /signup:', email); // Log cuando el correo ya existe
                return res.status(400).json({ message: 'El correo ya está registrado.' });
            }

            // Hashea la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Contraseña hasheada correctamente en /signup.'); // Log tras hash exitoso

            // Crea el nuevo usuario
            const newUser = await usuario.create({
                nombre_completo,
                email,
                password_hash: hashedPassword,
                edad,
                sexo,
                altura,
                peso,
                nivel_actividad,
                historial_medico,
                alergias_alimentarias,
                condicion_especifica,
                objetivos_nutricionales,
                dieta,
                consumo_calorias_diario,
                numero_comidas_bocadillos,
                consumo_agua_diario,
            });

            console.log('Usuario creado exitosamente en /signup:', newUser); // Log del nuevo usuario creado

            // Genera un token JWT
            const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            console.log('Token generado exitosamente en /signup:', token); // Log del token generado

            res.status(201).json({ user: newUser, token });
        } catch (error) {
            console.error('Error en /signup:', error); // Log detallado del error
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },

    /**
     * Devuelve el perfil del usuario autenticado.
     */
    async getProfile(req, res) {
        try {
            console.log('Solicitando perfil con ID:', req.user.id); // Log para verificar ID de usuario

            const userId = req.user.id;

            const user = await usuario.findByPk(userId, {
                attributes: { exclude: ['password_hash'] }, // Excluye el hash de la contraseña
            });

            if (!user) {
                console.log('Usuario no encontrado para el ID:', userId); // Log cuando no se encuentra el usuario
                return res.status(404).json({ message: 'Usuario no encontrado.' });
            }

            console.log('Perfil encontrado:', user); // Log del perfil encontrado
            res.status(200).json(user);
        } catch (error) {
            console.error('Error en /profile:', error); // Log detallado del error
            res.status(500).json({ message: 'Error interno del servidor.' });
        }
    },
};

module.exports = usuariosController;