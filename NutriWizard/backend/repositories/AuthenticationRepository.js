// File: repositories/AuthenticationRepository.js
const { Authentication } = require('../models');

class AuthenticationRepository {
    static async create(data) {
        return Authentication.create(data);
    }

    static async findByEmail(email) {
        return Authentication.findOne({ where: { email } });
    }

    static async findById(id) {
        return Authentication.findByPk(id);
    }
}

module.exports = AuthenticationRepository;