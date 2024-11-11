// File: controllers/userMealsController.js

const UserMealsRepository = require('../repositories/userMealsRepository');

class UserMealsController {
    static async createUserMeal(req, res) {
        try {
            const userMeal = await UserMealsRepository.createUserMeal(req.body);
            res.status(201).json(userMeal);
        } catch (error) {
            console.error("Error al crear la relación en user_meals:", error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getUserMealByUserId(req, res) {
        try {
            const userMeal = await UserMealsRepository.getUserMealByUserId(req.params.userId);
            if (!userMeal) {
                return res.status(404).json({ error: 'User meal not found' });
            }
            res.json(userMeal);
        } catch (error) {
            console.error("Error al obtener la relación en user_meals:", error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = UserMealsController;