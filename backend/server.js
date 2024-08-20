// server.js
// Este archivo configura el servidor Express y maneja las solicitudes de registro y autenticación

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = 5001;
const JWT_SECRET = 'your_jwt_secret_key';  // Cambia esto por una clave segura

// Configurar CORS para permitir solicitudes desde el frontend
app.use(cors());
app.options('*', cors());

app.use(bodyParser.json());

// Configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'first_db',
    password: 'root',
    port: 5432,
});

// Endpoint para registrar un nuevo usuario en la tabla `usuarios`
app.post('/signup', async (req, res) => {
    const {
        nombre_completo, edad, sexo, altura, peso, nivel_actividad, historial_medico,
        alergias_alimentarias, condicion_especifica, objetivos_nutricionales,
        dieta, consumo_calorias_diario, numero_comidas_bocadillos, consumo_agua_diario
    } = req.body;

    try {
        // Asegurarse de que los valores de array estén en el formato correcto
        const formattedHistorialMedico = `{${historial_medico}}`;  // Encierra en llaves
        const formattedCondicionEspecifica = `{${condicion_especifica}}`;
        const formattedObjetivosNutricionales = `{${objetivos_nutricionales}}`;

        const result = await pool.query(
            `INSERT INTO usuarios (nombre_completo, edad, sexo, altura, peso, nivel_actividad, historial_medico, alergias_alimentarias, condicion_especifica, objetivos_nutricionales, dieta, consumo_calorias_diario, numero_comidas_bocadillos, consumo_agua_diario)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`,
            [
                nombre_completo, edad, sexo, altura, peso, nivel_actividad, formattedHistorialMedico,
                alergias_alimentarias, formattedCondicionEspecifica, formattedObjetivosNutricionales,
                dieta, consumo_calorias_diario, numero_comidas_bocadillos, consumo_agua_diario
            ]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error('Error during /signup:', err);
        res.status(500).json({ error: 'Database error' });
    }
});


// Endpoint para registrar credenciales de autenticación en la tabla `authentication`
app.post('/register-auth', async (req, res) => {
    const { usuario_id, email, password } = req.body;

    try {
        // Encripta la contraseña antes de almacenarla en la base de datos
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Inserta las credenciales en la tabla `authentication`
        const result = await pool.query(
            `INSERT INTO authentication (usuario_id, email, password_hash) VALUES ($1, $2, $3) RETURNING *`,
            [usuario_id, email, hashedPassword]
        );

        res.status(201).json(result.rows[0]); // Devuelve los datos de autenticación registrados
    } catch (err) {
        console.error('Error during /register-auth:', err);
        res.status(500).json({ error: 'Database error' }); // Maneja errores de la base de datos
    }
});

// Endpoint para autenticar al usuario y generar un token JWT
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Busca al usuario por correo electrónico en la tabla `authentication`
        const result = await pool.query('SELECT * FROM authentication WHERE email = $1', [email]);

        if (result.rows.length === 0) {
            return res.status(400).json({ success: false, errors: 'Invalid email or password' });
        }

        const user = result.rows[0];

        // Verifica la contraseña usando bcrypt
        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) {
            return res.status(400).json({ success: false, errors: 'Invalid email or password' });
        }

        // Genera el JWT
        const token = jwt.sign(
            {
                id: user.usuario_id,
                email: user.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }  // El token expira en 1 hora
        );

        // Obtén la información adicional del usuario desde la tabla `usuarios`
        const userInfo = await pool.query('SELECT * FROM usuarios WHERE id = $1', [user.usuario_id]);
        const userInfoData = userInfo.rows[0];

        // Construye y devuelve la respuesta JSON
        const responseData = {
            data: {
                id: userInfoData.id,
                userName: userInfoData.nombre_completo,
                email: user.email,
                roles: [],  // Puedes agregar roles si los gestionas
                isVerified: true,
                jwToken: token
            },
            success: true,
            errors: null
        };

        res.status(200).json(responseData);
    } catch (err) {
        console.error('Error during /login:', err);
        res.status(500).json({ success: false, errors: 'Internal server error' });
    }
});

// Inicia el servidor y escucha en el puerto especificado
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
