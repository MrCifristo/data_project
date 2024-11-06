// File: routes/mealRoutes.js

const express = require('express');
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

router.post('/', async (req, res) => {
    console.log("Request recibido en /api/meals:", req.body);
    try {
        const { mealType, name, calories, protein, fats, carbs } = req.body;

        if (!mealType || !name || !calories || !protein || !fats || !carbs) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
        }

        const meal = await Meal.create({ mealType, name, calories, protein, fats, carbs });
        console.log('Comida creada:', meal);
        res.status(201).json(meal);
    } catch (error) {
        console.error('Error en /api/meals POST:', error);
        res.status(500).json({ error: 'Error al crear la comida', details: error.message });
    }
});

router.put('/meals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [updated] = await Meal.update(req.body, { where: { id } });

        if (updated) {
            const updatedMeal = await Meal.findOne({ where: { id } });
            console.log('Comida actualizada:', updatedMeal);
            res.status(200).json(updatedMeal);
        } else {
            res.status(404).json({ error: 'Comida no encontrada' });
        }
    } catch (error) {
        console.error('Error en /meals/:id:', error.message);
        res.status(500).json({ error: 'Error al actualizar la comida' });
    }
});

router.delete('/meals/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Meal.destroy({ where: { id } });

        if (deleted) {
            console.log('Comida eliminada con ID:', id);
            res.status(204).send();
        } else {
            res.status(404).json({ error: 'Comida no encontrada' });
        }
    } catch (error) {
        console.error('Error en /meals/:id:', error.message);
        res.status(500).json({ error: 'Error al eliminar la comida' });
    }
});

module.exports = router;