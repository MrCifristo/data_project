// File: repositories/menuRepository.js
const { Menu, meals, usuarios } = require('../models');

const MenuRepository = {
    async createMenuEntry(userId, meal) {
        // Crear una entrada con todos los datos de la comida
        return await Menu.create({
            userId,
            mealId: meal.id,
            name: meal.name,
            calories: meal.calories,
            protein: meal.protein,
            fats: meal.fats,
            carbs: meal.carbs,
            mealType: meal.mealType
        });
    },

    async getMenuByUser(userId) {
        return await Menu.findAll({
            where: { userId },
            attributes: ['id', 'name', 'calories', 'protein', 'fats', 'carbs', 'mealType'],
            include: [
                {
                    model: meals,
                    as: 'meal',
                    attributes: ['id', 'name']
                }
            ]
        });
    },

    async deleteMenuEntry(menuId) {
        return await Menu.destroy({ where: { id: menuId } });
    }
};

module.exports = MenuRepository;