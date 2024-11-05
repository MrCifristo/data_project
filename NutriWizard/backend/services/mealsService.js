// File: services/mealsService.js

const MealsRepository = require('../repositories/mealsRepository');

class MealsService {
    static async addMeal(data) {
        return MealsRepository.createMeal(data);
    }
}

module.exports = MealsService;
