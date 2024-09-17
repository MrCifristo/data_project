// Importa los modelos de Sequelize
const Usuario = require('./models/Usuario');
const Authentication = require('./models/Authentication');

// Endpoint para el registro de usuarios con Sequelize
app.post('/signup', async (req, res) => {
    try {
        const usuario = await Usuario.create(req.body);
        res.status(201).json({ id: usuario.id });
    } catch (error) {
        console.error('Error during /signup:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para el registro de autenticación con Sequelize
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

// Endpoint /login para autenticación de usuarios con Sequelize
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
    } catch (error) {
        console.error('Error during /login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
