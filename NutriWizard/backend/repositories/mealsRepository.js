// File: repositories/mealsRepository.js

const Meal = require('../models/meals');

class MealsRepository {
    static async createMeal(data) {
        return Meal.create(data);
    }

    static async getMealById(id) {
        return Meal.findByPk(id);
    }

    static async getAllMeals() {
        return Meal.findAll();
    }

    static async updateMeal(id, data) {
        return Meal.update(data, { where: { id } });
    }

    static async deleteMeal(id) {
        return Meal.destroy({ where: { id } });
    }
}

module.exports = MealsRepository;

