// backend/models/Authentication.js

const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Authentication = sequelize.define('Authentication', {
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
}, {
    tableName: 'authentication',
    timestamps: true
});

module.exports = Authentication;
