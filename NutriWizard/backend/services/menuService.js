// File: services/menuService.js
const MenuRepository = require('../repositories/menuRepository');
const Meals = require('../models/meals');

const MenuService = {
    async addMealToMenu(userId, mealId) {
        // Obtener datos de la comida desde Meals
        const meal = await Meals.findByPk(mealId);
        if (!meal) throw new Error('Meal not found');

        return await MenuRepository.createMenuEntry(userId, meal);
    },

    async getUserMenu(userId) {
        return await MenuRepository.getMenuByUser(userId);
    },

    async removeMealFromMenu(menuId) {
        return await MenuRepository.deleteMenuEntry(menuId);
    }
};

module.exports = MenuService;