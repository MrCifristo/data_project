const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('./models/Usuario');
const Authentication = require('./models/Authentication');
const Comida = require('./models/comidas');  // Asegúrate de importar correctamente el modelo Comida
require('dotenv').config(); // Asegura que el archivo .env esté configurado correctamente

const app = express();
app.use(express.json());
app.use(cors()); // Configuración básica de CORS

const port = 5001;

// Asociaciones de modelos
Usuario.hasOne(Authentication, {
    foreignKey: 'usuario_id',
    as: 'authentication'
});

Authentication.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuario'
});

//ENDPOINT para obtener las comidas de la base de datos
app.get('/api/comidas', async (req, res) => {
    try {
        const comidas = await Comida.findAll(); // Recuperar todos los registros de la tabla comidas
        res.json(comidas);
    } catch (error) {
        console.error('Error al obtener las comidas:', error);
        res.status(500).json({ error: 'Error al obtener los datos de las comidas' });
    }
});

// Otros endpoints previamente existentes...

// Endpoint para registro de usuarios
app.post('/signup', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json({ id: usuario.id });
    } catch (error) {
        console.error('Error during /signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para registro de autenticación
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
        res.status(201).json({ message: 'Authentication created successfully' });
    } catch (error) {
        console.error('Error during /register-auth:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint de login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Authentication.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ error: 'Email or password is incorrect' });
        }

        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({ error: 'Email or password is incorrect' });
        }

        // Verificación de la clave secreta antes de usarla
        if (!process.env.SECRET_KEY) {
            console.error('SECRET_KEY is not defined in your environment variables');
            return res.status(500).json({ error: 'Server configuration error' });
        }

        const token = jwt.sign(
            { id: user.usuario_id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.json({
            data: {
                id: user.usuario_id,
                email: user.email,
                jwToken: token,
            },
            success: true
        });
    } catch (error) {
        console.error('Error during /login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para obtener el perfil de un usuario
app.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    console.log("Token received:", token); // Debugging

    if (!token) {
        return res.status(401).send('No token provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const usuario = await Usuario.findOne({
            where: { id: decoded.id },
            include: [{
                model: Authentication,
                as: 'authentication'
            }]
        });

        if (!usuario) {
            return res.status(404).send('User not found');
        }

        res.json(usuario);
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).send('Invalid token');
    }
});

app._router.stack.forEach(function(r){
    if (r.route && r.route.path){
        console.log(r.route.path)
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});