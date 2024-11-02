const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const path = require('path');
const faker = require('faker');

// Enums
const nivelActividadEnum = ['Sedentario', 'Moderado', 'Activo', 'Muy intenso'];
const historialMedicoEnum = ['Ninguna', 'Diabetes', 'Hipertensión', 'Otra'];
const dietaEnum = ['Omnívoro', 'Vegetariano', 'Vegano', 'Keto', 'Paleo'];
const objetivosNutricionalesEnum = ['Pérdida de peso', 'Ganancia de masa muscular', 'Salud general y bienestar', 'Mantenimiento'];
const sexoEnum = ['Masculino', 'Femenino', 'Otro'];
const alergiasAlimentariasEnum = ['None', 'Ninguna', 'Polen', 'Nueces', 'Gluten', 'Lácteos', 'Mariscos'];
const condicionEspecificaEnum = ['Ninguna', 'Asma', 'Celiaquía', 'Trastornos digestivos', 'Hipertensión', 'Colesterol alto', 'Otra'];

// Configuración del CSV
const csvWriter = createCsvWriter({
    path: path.join(__dirname, 'usuarios.csv'),
    header: [
        { id: 'nombre_completo', title: 'NOMBRE_COMPLETO' },
        { id: 'edad', title: 'EDAD' },
        { id: 'sexo', title: 'SEXO' },
        { id: 'altura', title: 'ALTURA' },
        { id: 'peso', title: 'PESO' },
        { id: 'nivel_actividad', title: 'NIVEL_ACTIVIDAD' },
        { id: 'historial_medico', title: 'HISTORIAL_MEDICO' },
        { id: 'alergias_alimentarias', title: 'ALERGIAS_ALIMENTARIAS' },
        { id: 'condicion_especifica', title: 'CONDICION_ESPECIFICA' },
        { id: 'objetivos_nutricionales', title: 'OBJETIVOS_NUTRICIONALES' },
        { id: 'dieta', title: 'DIETA' },
        { id: 'consumo_calorias_diario', title: 'CONSUMO_CALORIAS_DIARIO' },
        { id: 'numero_comidas_bocadillos', title: 'NUMERO_COMIDAS_BOCADILLOS' },
        { id: 'consumo_agua_diario', title: 'CONSUMO_AGUA_DIARIO' }
    ]
});

// Función para generar arrays en el formato correcto
function formatArray(values) {
    return `{"${values.join('","')}"}`;
}

// Generar datos aleatorios
const data = Array.from({ length: 50 }, () => ({
    nombre_completo: `${faker.name.firstName()} ${faker.name.lastName()}`,
    edad: Math.floor(Math.random() * (65 - 18 + 1) + 18),
    sexo: sexoEnum[Math.floor(Math.random() * sexoEnum.length)],
    altura: (Math.random() * (190 - 150) + 150).toFixed(1),
    peso: (Math.random() * (90 - 50) + 50).toFixed(1),
    nivel_actividad: nivelActividadEnum[Math.floor(Math.random() * nivelActividadEnum.length)],

    // El campo historial_medico ahora se genera como array, aunque contenga un solo valor
    historial_medico: formatArray([historialMedicoEnum[Math.floor(Math.random() * historialMedicoEnum.length)]]),

    // Campo alergias_alimentarias puede ser "None" u otro valor
    alergias_alimentarias: alergiasAlimentariasEnum[Math.floor(Math.random() * alergiasAlimentariasEnum.length)],

    // El campo condicion_especifica se genera también como array, aunque sea un solo valor
    condicion_especifica: formatArray([condicionEspecificaEnum[Math.floor(Math.random() * condicionEspecificaEnum.length)]]),

    // El campo objetivos_nutricionales se genera como array
    objetivos_nutricionales: formatArray([objetivosNutricionalesEnum[Math.floor(Math.random() * objetivosNutricionalesEnum.length)]]),

    dieta: dietaEnum[Math.floor(Math.random() * dietaEnum.length)],
    consumo_calorias_diario: Math.floor(Math.random() * (3000 - 1800 + 1) + 1800),
    numero_comidas_bocadillos: Math.floor(Math.random() * (6 - 3 + 1) + 3),
    consumo_agua_diario: (Math.random() * (3.5 - 1.5) + 1.5).toFixed(1)
}));

// Escritura del archivo CSV
csvWriter.writeRecords(data)
    .then(() => {
        console.log('El archivo CSV fue creado exitosamente.');
    })
    .catch(err => {
        console.error('Hubo un error al escribir el archivo CSV:', err);
    });
