// File: repositories/UsuariosRepository.js
const { usuario } = require('../models');

class UsuariosRepository {
    static async create(data) {
        return usuario.create(data);
    }

    static async findById(id) {
        return usuario.findByPk(id);
    }

    static async findByEmail(email) {
        return usuario.findOne({ where: { email } });
    }
}

module.exports = UsuariosRepository;