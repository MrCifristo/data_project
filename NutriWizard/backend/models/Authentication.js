'use strict';

const mongoose = require('mongoose');

const modelName = 'Authentication';

if (!mongoose.models[modelName]) {
    const AuthenticationSchema = new mongoose.Schema(
        {
            usuario_id: {
                type: mongoose.Schema.Types.ObjectId, // Referencia a la colección de usuarios
                required: true,
                ref: 'Usuario',
            },
            email: {
                type: String,
                required: true,
                unique: true,
                trim: true,
                lowercase: true,
            },
            password_hash: {
                type: String,
                required: true,
            },
        },
        {
            timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }, // Habilitar timestamps
        }
    );

    mongoose.model(modelName, AuthenticationSchema);
}

module.exports = mongoose.models[modelName];