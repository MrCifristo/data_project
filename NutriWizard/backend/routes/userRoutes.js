const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usuarios, Authentication } = require('../models'); // Importar modelos
const authMiddleware = require('../middleware/authMiddleware'); // Importar middleware
require('dotenv').config();

const router = express.Router();

// Mapas para normalizar valores
const sexoMap = {
    male: 'masculino',
    female: 'femenino',
    other: 'otro',
};

const nivelActividadMap = {
    Sedentario: 'sedentario',
    Ligero: 'ligero',
    Moderado: 'moderado',
    Intenso: 'intenso',
};

// Endpoint para registrarse
router.post('/signup', async (req, res) => {
    try {
        console.log('Datos recibidos en /signup:', req.body);

        const {
            nombre_completo,
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
            email,
            password,
        } = req.body;

        // Validar datos requeridos
        if (!nombre_completo || !email || !password) {
            console.log('Faltan campos obligatorios: nombre_completo, email o password');
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Normalizar valores de sexo y nivel de actividad
        const normalizedSexo = sexoMap[sexo] || sexo;
        const normalizedNivelActividad = nivelActividadMap[nivel_actividad] || nivel_actividad;

        console.log('Verificando si el email ya existe en la tabla Authentication');
        const existingAuth = await Authentication.findOne({ email });
        if (existingAuth) {
            console.log(`El correo ya está registrado: ${email}`);
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        console.log('Hashing la contraseña');
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Creando registro en la tabla usuarios');
        const newUser = await usuarios.create({
            nombre_completo,
            edad: edad ? parseInt(edad, 10) : null,
            sexo: normalizedSexo,
            altura: altura ? parseFloat(altura) : null,
            peso: peso ? parseFloat(peso) : null,
            nivel_actividad: normalizedNivelActividad,
            historial_medico,
            alergias_alimentarias,
            condicion_especifica,
            objetivos_nutricionales,
            dieta,
            consumo_calorias_diario: consumo_calorias_diario ? parseFloat(consumo_calorias_diario) : null,
            numero_comidas_bocadillos: numero_comidas_bocadillos ? parseInt(numero_comidas_bocadillos, 10) : null,
            consumo_agua_diario: consumo_agua_diario ? parseFloat(consumo_agua_diario) : null,
        });

        console.log('Usuario creado en la tabla usuarios:', newUser);

        console.log('Creando registro en la tabla Authentication');
        const newAuth = await Authentication.create({
            usuario_id: newUser.id,
            email,
            password_hash: hashedPassword,
        });

        console.log('Registro creado en la tabla Authentication:', newAuth);

        console.log('Generando token JWT');
        const token = jwt.sign({ id: newAuth.usuario_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Registro y autenticación completados con éxito');
        res.status(201).json({
            message: 'Registro exitoso',
            user: {
                id: newUser.id,
                nombre_completo: newUser.nombre_completo,
                email,
            },
            token,
        });
    } catch (error) {
        console.error('Error en /signup:', error.message);
        res.status(500).json({ error: 'Error al registrar el usuario', details: error.message });
    }
});

// Endpoint para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        console.log('Datos recibidos en /login:', req.body);

        const { email, password } = req.body;

        if (!email || !password) {
            console.log('Faltan campos obligatorios: email o password');
            return res.status(400).json({ message: 'Email y contraseña son requeridos' });
        }

        console.log(`Buscando usuario en la tabla Authentication con email: ${email}`);
        const userAuth = await Authentication.findOne({ email });

        if (!userAuth) {
            console.log('Usuario no encontrado con el email proporcionado');
            return res.status(404).json({ message: 'Credenciales inválidas' });
        }

        console.log('Usuario encontrado, verificando contraseña');
        const passwordMatch = await bcrypt.compare(password, userAuth.password_hash);

        if (!passwordMatch) {
            console.log('La contraseña no coincide');
            return res.status(401).json({ message: 'Credenciales inválidas' });
        }

        console.log('Contraseña validada, generando token JWT');
        const token = jwt.sign({ id: userAuth.usuario_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        console.log('Inicio de sesión exitoso');
        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
            user: {
                id: userAuth.usuario_id,
                email: userAuth.email,
            },
        });
    } catch (error) {
        console.error('Error en /login:', error.message);
        res.status(500).json({ error: 'Error al iniciar sesión', details: error.message });
    }
});

// Endpoint para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
    try {
        console.log('Obteniendo perfil del usuario con ID:', req.user.id);

        // Cambiar la consulta para buscar por _id
        const user = await usuarios.findById(req.user.id).select('-__v -createdAt -updatedAt');

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log('Perfil del usuario obtenido con éxito');
        res.status(200).json(user);
    } catch (error) {
        console.error('Error en /profile:', error.message);
        res.status(500).json({ error: 'Error al obtener el perfil del usuario', details: error.message });
    }
});

module.exports = router;