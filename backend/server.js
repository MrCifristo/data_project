const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 5001;

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Opcional: Configuración manual de los encabezados CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(bodyParser.json());

// Configurar la conexión a la base de datos PostgreSQL
const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'first_db',
    password: 'root',
    port: 5432,
});

// Endpoint para registrar un usuario
app.post('/signup', async (req, res) => {
    const {
        nombre_completo, edad, sexo, altura, peso, nivel_actividad, historial_medico,
        alergias_alimentarias, condicion_especifica, objetivos_nutricionales,
        dieta, consumo_calorias_diario, numero_comidas_bocadillos, consumo_agua_diario
    } = req.body;

    try {
        // Asegúrate de que los valores de array estén en el formato correcto
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


// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
