// File: repositories/userMealsRepository.js

const UserMeal = require('../models/user_meals');
const Meal = require('../models/meals');

class UserMealsRepository {
    static async createUserMeal(data) {
        try {
            const userMeal = await UserMeal.create(data);
            return userMeal;
        } catch (error) {
            console.error("Error al crear la relación en user_meals:", error.message);
            throw new Error('Error al crear la relación en user_meals');
        }
    }

    static async getUserMealByUserId(userId) {
        try {
            return await UserMeal.findOne({
                where: { userId },
                include: [
                    { model: Meal, as: 'breakfastMeal' },
                    { model: Meal, as: 'lunchMeal' },
                    { model: Meal, as: 'dinnerMeal' }
                ]
            });
        } catch (error) {
            console.error("Error al obtener la relación en user_meals:", error.message);
            throw new Error('Error al obtener la relación en user_meals');
        }
    }

    static async updateUserMeal(userId, data) {
        try {
            const [updatedRows] = await UserMeal.update(data, { where: { userId } });
            if (updatedRows === 0) {
                throw new Error('No se encontró el registro en user_meals para actualizar');
            }
            return updatedRows;
        } catch (error) {
            console.error("Error al actualizar la relación en user_meals:", error.message);
            throw new Error('Error al actualizar la relación en user_meals');
        }
    }

    static async removeMealReferences(mealId) {
        try {
            await UserMeal.update(
                { breakfast: null, lunch: null, dinner: null },
                { where: { breakfast: mealId, lunch: mealId, dinner: mealId } }
            );
            console.log(`Referencias de la comida con ID ${mealId} eliminadas de user_meals.`);
        } catch (error) {
            console.error("Error al eliminar referencias en user_meals:", error.message);
            throw new Error('Error al eliminar referencias en user_meals');
        }
    }
}

module.exports = UserMealsRepository;