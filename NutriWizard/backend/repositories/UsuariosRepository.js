const Usuario = require('../models/usuarios'); // Modelo de Usuario

class UsuariosRepository {
    /**
     * Crear un nuevo usuario.
     * @param {Object} data - Datos para crear el usuario.
     * @returns {Promise<Object>} Usuario creado.
     */
    static async create(data) {
        try {
            const newUser = new Usuario(data);
            return await newUser.save();
        } catch (error) {
            console.error("Error al crear usuario:", error.message);
            throw new Error('Error al crear usuario');
        }
    }

    /**
     * Buscar un usuario por su ID.
     * @param {String} id - ID del usuario.
     * @returns {Promise<Object|null>} Usuario encontrado o `null`.
     */
    static async findById(id) {
        try {
            return await Usuario.findById(id);
        } catch (error) {
            console.error("Error al buscar usuario por ID:", error.message);
            throw new Error('Error al buscar usuario por ID');
        }
    }

    /**
     * Buscar un usuario por su email.
     * @param {String} email - Email del usuario.
     * @returns {Promise<Object|null>} Usuario encontrado o `null`.
     */
    static async findByEmail(email) {
        try {
            return await Usuario.findOne({ email });
        } catch (error) {
            console.error("Error al buscar usuario por email:", error.message);
            throw new Error('Error al buscar usuario por email');
        }
    }
}

module.exports = UsuariosRepository;