// backend/server.js

const express = require('express');
const app = express();
const port = 5001;
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const cors = require('cors');

// Configura CORS para permitir solicitudes desde el frontend
app.use(cors({
    origin: 'http://localhost:5173', // Reemplaza con la URL del frontend
}));

// Conexión a la base de datos
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'first_db',
    password: 'root',
    port: 5432,
});

app.use(express.json());

// Ruta para registrar un nuevo usuario
app.post('/signup', async (req, res) => {
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
    } = req.body;

    try {
        const result = await pool.query(
            `INSERT INTO usuarios (
                nombre_completo, edad, sexo, altura, peso, nivel_actividad, 
                historial_medico, alergias_alimentarias, condicion_especifica, 
                objetivos_nutricionales, dieta, consumo_calorias_diario, 
                numero_comidas_bocadillos, consumo_agua_diario
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) 
            RETURNING id`,
            [
                nombre_completo,
                edad,
                sexo,
                altura,
                peso,
                nivel_actividad,
                `{${historial_medico}}`,  // Convertir string a array
                alergias_alimentarias,
                `{${condicion_especifica}}`,  // Convertir string a array
                `{${objetivos_nutricionales}}`,  // Convertir string a array
                dieta,
                consumo_calorias_diario,
                numero_comidas_bocadillos,
                consumo_agua_diario,
            ]
        );
        const newUserId = result.rows[0].id;
        res.status(201).json({ id: newUserId });
    } catch (err) {
        console.error('Error during /signup:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Ruta para registrar las credenciales de autenticación
app.post('/register-auth', async (req, res) => {
    const { usuario_id, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.query(
            `INSERT INTO authentication (usuario_id, email, password_hash) 
            VALUES ($1, $2, $3)`,
            [usuario_id, email, hashedPassword]
        );
        res.status(201).json({ success: true });
    } catch (err) {
        console.error('Error during /register-auth:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
