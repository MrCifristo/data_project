const { meals } = require('../models');
const logger = require('../config/logger');

class MealsRepository {
    static async getAllMeals() {
        try {
            const label = 'Database Query: Get All Meals';
            logger.profileStart(label);

            const mealsList = await meals.findAll({
                order: [['createdAt', 'DESC']],
            });

            logger.profileEnd(label);
            return mealsList;
        } catch (error) {
            logger.error('❌ Error en getAllMeals:', error.message);
            throw new Error('Error al obtener todas las comidas');
        }
    }

    static async getMealById(id) {
        try {
            const label = `Database Query: Get Meal by ID: ${id}`;
            logger.profileStart(label);

            const meal = await meals.findByPk(id);

            logger.profileEnd(label);
            return meal;
        } catch (error) {
            logger.error('❌ Error en getMealById:', error.message);
            throw new Error('Error al obtener la comida por ID');
        }
    }
}

module.exports = MealsRepository;
