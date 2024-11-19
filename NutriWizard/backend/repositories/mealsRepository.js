const { meals } = require('../models'); // Asegúrate de usar el nombre en minúsculas, tal como está definido en el modelo

class MealsRepository {
    static async createMeal(data) {
        try {
            const meal = await meals.create(data);
            return meal;
        } catch (error) {
            throw new Error('Error al crear la comida');
        }
    }

    static async getMealById(id) {
        try {
            const meal = await meals.findByPk(id); // Utiliza el nombre correcto aquí
            return meal;
        } catch (error) {
            throw new Error('Error al obtener la comida por ID');
        }
    }

    static async getAllMeals() {
        try {
            const mealsList = await meals.findAll({
                order: [['createdAt', 'DESC']], // Orden descendente
            });
            return mealsList;
        } catch (error) {
            console.error('❌ Error en getAllMeals:', error.message);
            throw new Error('Error al obtener todas las comidas');
        }
    }

    static async updateMeal(id, data) {
        try {
            const [updated] = await meals.update(data, { where: { id } });
            return updated ? await meals.findByPk(id) : null;
        } catch (error) {
            throw new Error('Error al actualizar la comida');
        }
    }

    static async deleteMeal(id) {
        try {
            const deleted = await meals.destroy({ where: { id } });
            return deleted;
        } catch (error) {
            throw new Error('Error al eliminar la comida');
        }
    }
}

module.exports = MealsRepository;
