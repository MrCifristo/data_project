const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');

const csvWriter = createCsvWriter({
    path: path.join(__dirname, 'usuarios.csv'),  // Cambia aquí
    header: [
        {id: 'nombre_completo', title: 'NOMBRE_COMPLETO'},
        {id: 'edad', title: 'EDAD'},
        {id: 'sexo', title: 'SEXO'},
        {id: 'altura', title: 'ALTURA'},
        {id: 'peso', title: 'PESO'},
        {id: 'nivel_actividad', title: 'NIVEL_ACTIVIDAD'},
        {id: 'historial_medico', title: 'HISTORIAL_MEDICO'},
        {id: 'alergias_alimentarias', title: 'ALERGIAS_ALIMENTARIAS'},
        {id: 'condicion_especifica', title: 'CONDICION_ESPECIFICA'},
        {id: 'objetivos_nutricionales', title: 'OBJETIVOS_NUTRICIONALES'},
        {id: 'dieta', title: 'DIETA'},
        {id: 'consumo_calorias_diario', title: 'CONSUMO_CALORIAS_DIARIO'},
        {id: 'numero_comidas_bocadillos', title: 'NUMERO_COMIDAS_BOCADILLOS'},
        {id: 'consumo_agua_diario', title: 'CONSUMO_AGUA_DIARIO'}
    ]
});


const data = Array.from({ length: 50 }, () => ({
    nombre_completo: 'Nombre Aleatorio', // Deberías generar nombres aleatorios o específicos aquí
    edad: Math.floor(Math.random() * (65 - 18 + 1) + 18),
    sexo: ['Masculino', 'Femenino', 'Otro'][Math.floor(Math.random() * 3)],
    altura: (Math.random() * (190 - 150) + 150).toFixed(1),
    peso: (Math.random() * (90 - 50) + 50).toFixed(1),
    nivel_actividad: ['Sedentario', 'Moderado', 'Activo', 'Muy activo'][Math.floor(Math.random() * 4)],
    historial_medico: 'Ninguna', // Personaliza según necesidad
    alergias_alimentarias: 'Ninguna', // Personaliza según necesidad
    condicion_especifica: 'Ninguna', // Personaliza según necesidad
    objetivos_nutricionales: 'Pérdida de peso', // Personaliza según necesidad
    dieta: ['Omnívoro', 'Vegetariano', 'Vegano'][Math.floor(Math.random() * 3)],
    consumo_calorias_diario: Math.floor(Math.random() * (3000 - 1800 + 1) + 1800),
    numero_comidas_bocadillos: Math.floor(Math.random() * (6 - 3 + 1) + 3),
    consumo_agua_diario: (Math.random() * (3.5 - 1.5) + 1.5).toFixed(1)
}));

csvWriter.writeRecords(data)
    .then(() => {
        console.log('El archivo CSV fue creado exitosamente y guardado en el directorio backend.');
    })
    .catch(err => {
        console.error('Hubo un error al escribir el archivo CSV:', err);
    });
