// File: repositories/mealsRepository.js

const Meal = require('../models/meals');

class MealsRepository {
    static async createMeal(data) {
        try {
            const meal = await Meal.create(data);
            return meal;
        } catch (error) {
            throw new Error('Error al crear la comida');
        }
    }

    static async getMealById(id) {
        try {
            const meal = await Meal.findByPk(id);
            return meal;
        } catch (error) {
            throw new Error('Error al obtener la comida por ID');
        }
    }

    static async getAllMeals() {
        try {
            const meals = await Meal.findAll({
                order: [['createdAt', 'DESC']], // Orden descendente
            });
            return meals;
        } catch (error) {
            throw new Error('Error al obtener todas las comidas');
        }
    }

    static async updateMeal(id, data) {
        try {
            const [updated] = await Meal.update(data, { where: { id } });
            return updated ? await Meal.findByPk(id) : null;
        } catch (error) {
            throw new Error('Error al actualizar la comida');
        }
    }

    static async deleteMeal(id) {
        try {
            const deleted = await Meal.destroy({ where: { id } });
            return deleted;
        } catch (error) {
            throw new Error('Error al eliminar la comida');
        }
    }
}

module.exports = MealsRepository;