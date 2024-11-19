const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization; // Obtener encabezado de autorización
        const token = authHeader && authHeader.split(' ')[1]; // Extraer el token

        if (!token) {
            console.log('Token no proporcionado');
            return res.status(401).json({ message: 'Token requerido' });
        }

        console.log('Verificando token JWT');
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verificar token

        console.log('Token JWT válido:', decoded);
        req.user = decoded; // Agregar información del usuario al objeto req
        next(); // Continuar al siguiente middleware o endpoint
    } catch (error) {
        console.error('Error en autenticación:', error.message);
        res.status(401).json({ message: 'Token inválido o expirado' });
    }
};

module.exports = authMiddleware;