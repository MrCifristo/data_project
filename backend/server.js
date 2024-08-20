// backend/server.js

const express = require('express');
const app = express();
const port = 5001;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: 'http://localhost:5173',
}));

// Configuración de la base de datos
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'first_db',
    password: 'root',
    port: 5432,
});

app.use(express.json());

// Clave secreta para firmar los tokens JWT
const SECRET_KEY = 'your_secret_key';

// Middleware para verificar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Endpoint para el registro de usuarios
app.post('/signup', async (req, res) => {
    const {
        nombre_completo, edad, sexo, altura, peso, nivel_actividad,
        historial_medico, alergias_alimentarias, condicion_especifica,
        objetivos_nutricionales, dieta, consumo_calorias_diario,
        numero_comidas_bocadillos, consumo_agua_diario
    } = req.body;

    try {
        // Inserción en la tabla usuarios
        const result = await pool.query(
            `INSERT INTO usuarios (
                nombre_completo, edad, sexo, altura, peso, nivel_actividad,
                historial_medico, alergias_alimentarias, condicion_especifica,
                objetivos_nutricionales, dieta, consumo_calorias_diario,
                numero_comidas_bocadillos, consumo_agua_diario
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING id`,
            [
                nombre_completo, edad, sexo, altura, peso, nivel_actividad,
                `{${historial_medico}}`, alergias_alimentarias, `{${condicion_especifica}}`,
                `{${objetivos_nutricionales}}`, dieta, consumo_calorias_diario,
                numero_comidas_bocadillos, consumo_agua_diario
            ]
        );

        const usuarioId = result.rows[0].id;

        res.status(201).json({ id: usuarioId });
    } catch (err) {
        console.error('Error during /signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para el registro de autenticación
app.post('/register-auth', async (req, res) => {
    const { usuario_id, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        await pool.query(
            `INSERT INTO authentication (usuario_id, email, password_hash) VALUES ($1, $2, $3)`,
            [usuario_id, email, hashedPassword]
        );

        res.status(201).json({ message: 'Authentication created successfully' });
    } catch (err) {
        console.error('Error during /register-auth:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint /login para autenticación de usuarios
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const userResult = await pool.query('SELECT * FROM authentication WHERE email = $1', [email]);

        if (userResult.rows.length === 0) {
            return res.status(401).json({ error: 'Email or password is incorrect' });
        }

        const user = userResult.rows[0];

        if (!user.password_hash) {
            return res.status(500).json({ error: 'Password not found for this user' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Email or password is incorrect' });
        }

        const token = jwt.sign(
            { id: user.usuario_id, email: user.email },
            SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            data: {
                id: user.usuario_id,
                email: user.email,
                jwToken: token,
            },
            success: true,
            errors: null
        });

    } catch (err) {
        console.error('Error during /login:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint /profile para obtener los datos del usuario autenticado
app.get('/profile', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const userResult = await pool.query('SELECT * FROM usuarios WHERE id = $1', [userId]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userProfile = userResult.rows[0];

        res.json({
            data: userProfile,
            success: true,
            errors: null
        });
    } catch (err) {
        console.error('Error during /profile:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
