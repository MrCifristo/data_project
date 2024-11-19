// File: controllers/menuController.js
const MenuService = require('../services/menuService');

const MenuController = {
    async addMealToMenu(req, res) {
        try {
            const { userId, mealId } = req.body;
            const newMenuEntry = await MenuService.addMealToMenu(userId, mealId);
            res.status(201).json(newMenuEntry);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    async getUserMenu(req, res) {
        try {
            const { userId } = req.params;
            const menu = await MenuService.getUserMenu(userId);
            res.status(200).json(menu);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching user menu', error });
        }
    },

    async removeMealFromMenu(req, res) {
        try {
            const { menuId } = req.params;
            await MenuService.removeMealFromMenu(menuId);
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error removing meal from menu', error });
        }
    }
};

module.exports = MenuController;