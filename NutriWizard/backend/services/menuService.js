const MenuRepository = require('../repositories/menuRepository');
const MealsRepository = require('../repositories/mealsRepository');

const MenuService = {
    /**
     * Agregar una comida al menú
     * @param {String} userId - ID del usuario
     * @param {String} mealId - ID de la comida
     * @returns {Object} Nueva entrada en el menú
     */
    async addMealToMenu(userId, mealId) {
        console.log('Buscando comida con ID:', mealId);

        // Verificar que la comida exista
        const meal = await MealsRepository.getMealById(mealId);
        if (!meal) {
            throw new Error(`La comida con ID ${mealId} no existe`);
        }

        console.log('Creando entrada en el menú para el usuario:', userId);

        // Crear la entrada en el repositorio del menú
        const newMenuEntry = await MenuRepository.createMenuEntry(userId, meal);
        console.log('Nueva entrada creada en el menú:', newMenuEntry);
        return newMenuEntry;
    },

    /**
     * Obtener todas las comidas del menú de un usuario
     * @param {String} userId - ID del usuario
     * @returns {Array} Lista de entradas en el menú
     */
    async getUserMenu(userId) {
        console.log('Buscando entradas del menú para el usuario con ID:', userId);

        // Obtener las entradas del menú desde el repositorio
        const userMenu = await MenuRepository.getMenuByUser(userId);
        console.log('Entradas encontradas:', userMenu.length);
        return userMenu;
    },

    /**
     * Eliminar una comida del menú
     * @param {String} menuId - ID de la entrada del menú
     */
    async removeMealFromMenu(menuId) {
        console.log('Eliminando entrada con ID:', menuId);

        // Eliminar la entrada del menú desde el repositorio
        const deletedCount = await MenuRepository.deleteMenuEntry(menuId);

        if (!deletedCount) {
            throw new Error(`No se encontró ninguna entrada con ID ${menuId}`);
        }

        console.log('Entrada eliminada con éxito');
    },
};

module.exports = MenuService;