const MealsRepository = require('../repositories/mealsRepository');

class MealsService {
    /**
     * Agregar una nueva comida
     * @param {Object} data - Datos de la comida a agregar
     * @returns {Object} Comida creada
     */
    static async addMeal(data) {
        try {
            console.log('Service: Agregando comida con datos:', data);
            const newMeal = await MealsRepository.createMeal(data);
            console.log('Service: Comida agregada con éxito:', newMeal);
            return newMeal;
        } catch (error) {
            console.error('Service: Error al agregar comida:', error.message);
            throw new Error('Error al agregar comida.');
        }
    }

    /**
     * Obtener todas las comidas
     * @returns {Array} Lista de comidas
     */
    static async getAllMeals() {
        try {
            console.log('Service: Obteniendo todas las comidas');
            const meals = await MealsRepository.getAllMeals();
            console.log('Service: Comidas obtenidas con éxito');
            return meals;
        } catch (error) {
            console.error('Service: Error al obtener comidas:', error.message);
            throw new Error('Error al obtener comidas.');
        }
    }

    /**
     * Obtener una comida por ID
     * @param {String} id - ID de la comida
     * @returns {Object} Comida encontrada
     */
    static async getMealById(id) {
        try {
            console.log(`Service: Obteniendo comida con ID: ${id}`);
            const meal = await MealsRepository.getMealById(id);
            if (!meal) {
                console.log(`Service: Comida con ID ${id} no encontrada`);
                throw new Error('Comida no encontrada.');
            }
            console.log('Service: Comida encontrada:', meal);
            return meal;
        } catch (error) {
            console.error(`Service: Error al obtener comida con ID ${id}:`, error.message);
            throw new Error('Error al obtener comida.');
        }
    }

    /**
     * Actualizar una comida por ID
     * @param {String} id - ID de la comida
     * @param {Object} data - Datos actualizados de la comida
     * @returns {Object} Comida actualizada
     */
    static async updateMeal(id, data) {
        try {
            console.log(`Service: Actualizando comida con ID: ${id}`, data);
            const updatedMeal = await MealsRepository.updateMeal(id, data);
            console.log('Service: Comida actualizada con éxito:', updatedMeal);
            return updatedMeal;
        } catch (error) {
            console.error(`Service: Error al actualizar comida con ID ${id}:`, error.message);
            throw new Error('Error al actualizar comida.');
        }
    }

    /**
     * Eliminar una comida por ID
     * @param {String} id - ID de la comida
     * @returns {Object} Resultado de la operación de eliminación
     */
    static async deleteMeal(id) {
        try {
            console.log(`Service: Eliminando comida con ID: ${id}`);
            const result = await MealsRepository.deleteMeal(id);
            console.log(`Service: Comida con ID ${id} eliminada con éxito`);
            return result;
        } catch (error) {
            console.error(`Service: Error al eliminar comida con ID ${id}:`, error.message);
            throw new Error('Error al eliminar comida.');
        }
    }
}

module.exports = MealsService;