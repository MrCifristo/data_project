// File: controllers/mealsController.js

const MealsRepository = require('../repositories/mealsRepository');

class MealsController {
    static async createMeal(req, res) {
        try {
            const meal = await MealsRepository.createMeal(req.body);
            res.status(201).json(meal);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getMealById(req, res) {
        try {
            const meal = await MealsRepository.getMealById(req.params.id);
            if (!meal) {
                return res.status(404).json({ error: 'Meal not found' });
            }
            res.json(meal);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAllMeals(req, res) {
        try {
            const meals = await MealsRepository.getAllMeals();
            res.json(meals);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = MealsController;

