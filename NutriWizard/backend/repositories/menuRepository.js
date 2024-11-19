const Menu = require('../models/menu'); // Modelo de menú

const MenuRepository = {
    /**
     * Crear una entrada de menú para un usuario.
     * @param {String} userId - ID del usuario.
     * @param {Object} meal - Datos de la comida.
     * @returns {Promise<Object>} Entrada de menú creada.
     */
    async createMenuEntry(userId, meal) {
        if (!userId || !meal || !meal._id) {
            throw new Error('Faltan datos requeridos para crear una entrada en el menú.');
        }
        try {
            const newMenuEntry = new Menu({
                userId,
                mealId: meal._id,
                name: meal.name,
                calories: meal.calories,
                protein: meal.protein,
                fats: meal.fats,
                carbs: meal.carbs,
                mealType: meal.mealType,
            });
            return await newMenuEntry.save();
        } catch (error) {
            throw new Error(`Error al crear una entrada de menú: ${error.message}`);
        }
    },

    /**
     * Obtener el menú de un usuario por su ID.
     * @param {String} userId - ID del usuario.
     * @returns {Promise<Array>} Lista de entradas de menú.
     */
    async getMenuByUserId(userId) {
        if (!userId) {
            throw new Error('El userId es requerido para obtener el menú.');
        }
        try {
            return await Menu.find({ userId })
                .populate({
                    path: 'mealId', // Población del campo mealId para obtener detalles de la comida
                    select: 'name calories protein fats carbs mealType',
                })
                .select('name calories protein fats carbs mealType'); // Seleccionar campos específicos del menú
        } catch (error) {
            throw new Error(`Error al obtener el menú del usuario: ${error.message}`);
        }
    },

    /**
     * Eliminar una entrada de menú por su ID.
     * @param {String} menuId - ID de la entrada de menú.
     * @returns {Promise<Object>} Resultado de la operación de eliminación.
     */
    async deleteMenuEntry(menuId) {
        if (!menuId) {
            throw new Error('El menuId es requerido para eliminar una entrada del menú.');
        }
        try {
            const deletedEntry = await Menu.findByIdAndDelete(menuId);
            if (!deletedEntry) {
                throw new Error('La entrada del menú no existe.');
            }
            return deletedEntry;
        } catch (error) {
            throw new Error(`Error al eliminar una entrada del menú: ${error.message}`);
        }
    },
};

module.exports = MenuRepository;