
'use strict';

module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('usuario', {
        nombre_completo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        edad: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        sexo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        altura: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        peso: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        nivel_actividad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        historial_medico: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        alergias_alimentarias: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        condicion_especifica: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        objetivos_nutricionales: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dieta: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        consumo_calorias_diario: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        numero_comidas_bocadillos: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        consumo_agua_diario: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    }, {
        tableName: 'usuarios',
        timestamps: false,
    });

    return Usuario;
};