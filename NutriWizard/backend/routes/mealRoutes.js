const express = require('express');
const mealsController = require('../controllers/mealsController');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const router = express.Router();

// Middleware para autenticar el token JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Token requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.user = user; // Guardar el usuario decodificado en la solicitud
        next();
    });
};

// GET /api/meals - Obtener todas las comidas con lógica de cache
router.get('/', mealsController.getAllMeals);

// GET /api/meals/:id - Obtener una comida específica con lógica de cache
router.get('/:id', mealsController.getMealById);

// POST /api/meals - Crear una nueva comida para el usuario actual
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { name, calories, protein, fats, carbs, mealType } = req.body;

        // Validar datos requeridos
        if (!name || !calories || !protein || !fats || !carbs || !mealType) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        console.log(`Creando nueva comida para el usuario con ID: ${req.user.id}`);

        const newMeal = await meals.create({
            name,
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            fats: parseFloat(fats),
            carbs: parseFloat(carbs),
            mealType,
            userId: req.user.id, // Asociar la comida al usuario actual
        });

        console.log('Nueva comida creada:', newMeal);
        res.status(201).json(newMeal);
    } catch (error) {
        console.error('Error al crear una nueva comida:', error.message);
        res.status(500).json({ error: 'Error al crear una nueva comida' });
    }
});

// DELETE /api/meals/:id - Eliminar una comida específica
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const mealId = req.params.id;

        console.log(`Intentando eliminar la comida con ID: ${mealId} para el usuario con ID: ${req.user.id}`);

        const meal = await meals.findOne({
            where: { id: mealId, userId: req.user.id }, // Asegurarse de que la comida pertenece al usuario actual
        });

        if (!meal) {
            return res.status(404).json({ error: 'Comida no encontrada o no autorizada' });
        }

        await meal.destroy();
        console.log(`Comida con ID ${mealId} eliminada con éxito`);
        res.status(200).json({ message: 'Comida eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la comida:', error.message);
        res.status(500).json({ error: 'Error al eliminar la comida' });
    }
});

module.exports = router;
