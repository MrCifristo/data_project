const Authentication = require('../models/authentication');

class AuthenticationRepository {
    /**
     * Crear un nuevo registro de autenticación.
     * @param {Object} data - Datos del usuario.
     * @returns {Promise<Object>} Registro creado.
     */
    static async create(data) {
        const newAuth = new Authentication(data);
        return newAuth.save();
    }

    /**
     * Buscar un usuario por su correo electrónico.
     * @param {String} email - Correo electrónico del usuario.
     * @returns {Promise<Object>} Registro encontrado.
     */
    static async findByEmail(email) {
        return Authentication.findOne({ email });
    }

    /**
     * Buscar un usuario por su ID.
     * @param {String} id - ID del usuario.
     * @returns {Promise<Object>} Registro encontrado.
     */
    static async findById(id) {
        return Authentication.findById(id);
    }
}

module.exports = AuthenticationRepository;