const { menu, meals } = require('../models');

const MenuService = {
    /**
     * Agregar una comida al menú
     */
    async addMealToMenu(userId, mealId) {
        console.log('Buscando comida con ID:', mealId);

        // Verificar que la comida exista
        const meal = await meals.findByPk(mealId);
        if (!meal) {
            throw new Error(`La comida con ID ${mealId} no existe`);
        }

        console.log('Creando entrada en el menú para el usuario:', userId);

        // Crear la entrada en la tabla Menu
        const newMenuEntry = await menu.create({
            userId,
            mealId: meal.id,
            name: meal.name,
            calories: meal.calories,
            protein: meal.protein,
            fats: meal.fats,
            carbs: meal.carbs,
            mealType: meal.mealType,
        });

        console.log('Nueva entrada creada en el menú:', newMenuEntry);
        return newMenuEntry;
    },

    /**
     * Obtener todas las comidas del menú de un usuario
     */
    async getUserMenu(userId) {
        console.log('Buscando entradas del menú para el usuario con ID:', userId);

        // Obtener las entradas del menú para el usuario
        const userMenu = await menu.findAll({
            where: { userId },
            attributes: ['id', 'name', 'calories', 'protein', 'fats', 'carbs', 'mealType', 'createdAt'],
        });

        console.log('Entradas encontradas:', userMenu.length);
        return userMenu;
    },

    /**
     * Eliminar una comida del menú
     */
    async removeMealFromMenu(menuId) {
        console.log('Eliminando entrada con ID:', menuId);

        // Eliminar la entrada del menú
        const deletedCount = await menu.destroy({
            where: { id: menuId },
        });

        if (deletedCount === 0) {
            throw new Error(`No se encontró ninguna entrada con ID ${menuId}`);
        }

        console.log('Entrada eliminada con éxito');
    },
};

module.exports = MenuService;
