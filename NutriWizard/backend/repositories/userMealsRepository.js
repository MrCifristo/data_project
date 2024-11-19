const UserMeals = require('../models/user_meals'); // Modelo de user_meals
const Meals = require('../models/meals'); // Modelo de comidas

class UserMealsRepository {
    /**
     * Crear una entrada en user_meals.
     * @param {Object} data - Datos para crear la entrada.
     * @returns {Promise<Object>} Entrada creada.
     */
    static async createUserMeal(data) {
        try {
            const userMeal = new UserMeals(data);
            return await userMeal.save();
        } catch (error) {
            console.error("Error al crear la relación en user_meals:", error.message);
            throw new Error('Error al crear la relación en user_meals');
        }
    }

    /**
     * Obtener las comidas de un usuario por su ID.
     * @param {String} userId - ID del usuario.
     * @returns {Promise<Object>} Relación encontrada.
     */
    static async getUserMealByUserId(userId) {
        try {
            return await UserMeals.findOne({ userId })
                .populate('breakfast', 'name calories protein fats carbs mealType')
                .populate('lunch', 'name calories protein fats carbs mealType')
                .populate('dinner', 'name calories protein fats carbs mealType');
        } catch (error) {
            console.error("Error al obtener la relación en user_meals:", error.message);
            throw new Error('Error al obtener la relación en user_meals');
        }
    }

    /**
     * Actualizar las comidas de un usuario.
     * @param {String} userId - ID del usuario.
     * @param {Object} data - Datos actualizados.
     * @returns {Promise<Object>} Entrada actualizada.
     */
    static async updateUserMeal(userId, data) {
        try {
            const updatedUserMeal = await UserMeals.findOneAndUpdate({ userId }, data, { new: true });
            if (!updatedUserMeal) {
                throw new Error('No se encontró el registro en user_meals para actualizar');
            }
            return updatedUserMeal;
        } catch (error) {
            console.error("Error al actualizar la relación en user_meals:", error.message);
            throw new Error('Error al actualizar la relación en user_meals');
        }
    }

    /**
     * Eliminar referencias de una comida en user_meals.
     * @param {String} mealId - ID de la comida a eliminar.
     * @returns {Promise<void>}
     */
    static async removeMealReferences(mealId) {
        try {
            const updateResult = await UserMeals.updateMany(
                { $or: [{ breakfast: mealId }, { lunch: mealId }, { dinner: mealId }] },
                { $set: { breakfast: null, lunch: null, dinner: null } }
            );
            console.log(`Referencias de la comida con ID ${mealId} eliminadas de user_meals:`, updateResult);
        } catch (error) {
            console.error("Error al eliminar referencias en user_meals:", error.message);
            throw new Error('Error al eliminar referencias en user_meals');
        }
    }
}

module.exports = UserMealsRepository;