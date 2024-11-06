
// File: repositories/userMealsRepository.js

const UserMeal = require('../models/user_meals');

class UserMealsRepository {
    static async createUserMeal(data) {
        return UserMeal.create(data);
    }

    static async getUserMealByUserId(userId) {
        return UserMeal.findOne({
            where: { userId },
            include: [{ model: Meal, as: 'breakfastMeal' }, { model: Meal, as: 'lunchMeal' }, { model: Meal, as: 'dinnerMeal' }]
        });
    }

    static async updateUserMeal(userId, data) {
        return UserMeal.update(data, { where: { userId } });
    }
}

module.exports = UserMealsRepository;
