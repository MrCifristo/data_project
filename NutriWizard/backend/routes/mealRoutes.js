const express = require('express');
const mealsController = require('../controllers/mealsController');
const jwt = require('jsonwebtoken');
const Meal = require('../models/meals'); // Modelo de Mongoose para Meal
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
router.get('/', async (req, res) => {
    try {
        await mealsController.getAllMeals(req, res);
    } catch (error) {
        console.error('Error al obtener todas las comidas:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener todas las comidas' });
    }
});

// GET /api/meals/refresh - Refrescar el caché con los datos más recientes
router.get('/refresh', async (req, res) => {
    try {
        await mealsController.refreshCache(req, res);
    } catch (error) {
        console.error('Error al refrescar el caché:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al refrescar el caché' });
    }
});

// GET /api/meals/:id - Obtener una comida específica con lógica de cache
router.get('/:id', async (req, res) => {
    try {
        await mealsController.getMealById(req, res);
    } catch (error) {
        console.error('Error al obtener la comida específica:', error.message);
        res.status(500).json({ error: 'Error interno del servidor al obtener la comida' });
    }
});

// POST /api/meals - Crear una nueva comida
router.post('/', async (req, res) => {
    try {
        const { name, calories, protein, fats, carbs, mealType } = req.body;

        if (!name || !calories || !protein || !fats || !carbs || !mealType) {
            return res.status(400).json({ error: 'Todos los campos son requeridos' });
        }

        console.log('Creando nueva comida:', { name, calories, protein, fats, carbs, mealType });

        const newMeal = new Meal({
            name,
            calories: parseFloat(calories),
            protein: parseFloat(protein),
            fats: parseFloat(fats),
            carbs: parseFloat(carbs),
            mealType,
        });

        await newMeal.save();
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

        const meal = await Meal.findById(mealId);

        if (!meal) {
            return res.status(404).json({ error: 'Comida no encontrada' });
        }

        // Opcional: Validar que el usuario tiene permiso para eliminar esta comida
        // if (meal.userId.toString() !== req.user.id) {
        //     return res.status(403).json({ error: 'No autorizado para eliminar esta comida' });
        // }

        await meal.deleteOne();
        console.log(`Comida con ID ${mealId} eliminada con éxito`);
        res.status(200).json({ message: 'Comida eliminada con éxito' });
    } catch (error) {
        console.error('Error al eliminar la comida:', error.message);
        res.status(500).json({ error: 'Error al eliminar la comida' });
    }
});

module.exports = router;