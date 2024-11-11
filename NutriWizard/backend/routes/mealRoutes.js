// File: routes/mealRoutes.js

const express = require('express');
const mealsController = require('../controllers/mealsController');
const Meal = require('../models/meals');
const UserMeal = require('../models/user_meals');

const router = express.Router();

// User Meals Endpoint
router.get('/user-meals', async (req, res) => {
    try {
        const userMeals = await UserMeal.findAll({
            include: [
                { model: Meal, as: 'breakfastMeal' },
                { model: Meal, as: 'lunchMeal' },
                { model: Meal, as: 'dinnerMeal' }
            ]
        });

        if (!userMeals || userMeals.length === 0) {
            return res.status(404).json({ error: 'User meals not found' });
        }

        res.json(userMeals);
    } catch (error) {
        console.error('Error en /user-meals:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Endpoint para obtener todas las comidas
router.get('/', mealsController.getAllMeals);

// Endpoint para obtener una comida específica por ID
router.get('/:id', mealsController.getMealById);

// Endpoint para crear una nueva comida
router.post('/', mealsController.createMeal);

// Endpoint para actualizar una comida por ID
router.put('/:id', mealsController.updateMeal);

// Endpoint para eliminar una comida por ID
router.delete('/:id', mealsController.deleteMeal);

module.exports = router;