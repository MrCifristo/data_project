const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Authentication = sequelize.define('Authentication', {
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios', // Este es el nombre de la tabla tal como Sequelize lo espera
            key: 'id'
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'authentication', // Asegúrate de que el nombre de la tabla es correcto
    timestamps: true, // Habilitar la gestión automática de timestamps
    createdAt: 'created_at', // Mapear 'createdAt' a la columna 'created_at'
    updatedAt: 'updated_at' // Mapear 'updatedAt' a la columna 'updated_at'
});

module.exports = Authentication;
