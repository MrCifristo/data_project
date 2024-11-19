const MenuService = require('../services/menuService');

const MenuController = {
    /**
     * Agregar una comida al menú
     */
    async addMealToMenu(req, res) {
        try {
            const { userId, mealId } = req.body;

            console.log('Datos recibidos en el controlador:', { userId, mealId });

            // Validar que userId y mealId estén presentes
            if (!userId || !mealId) {
                return res.status(400).json({ message: 'userId y mealId son requeridos' });
            }

            // Llamar al servicio para agregar la comida al menú
            const newMenuEntry = await MenuService.addMealToMenu(userId, mealId);

            console.log('Nueva entrada creada en el menú:', newMenuEntry);
            return res.status(201).json(newMenuEntry);
        } catch (error) {
            console.error('Error al agregar comida al menú:', error.message);
            return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    },

    /**
     * Obtener todas las comidas del menú de un usuario
     */
    async getUserMenu(req, res) {
        try {
            const userId = req.params.userId; // Cambiado a desestructuración directa
            console.log('Fetching menu for userId:', userId);

            if (!userId) {
                console.warn('No userId provided in the request params');
                return res.status(400).json({ message: 'userId is required' });
            }

            const menu = await MenuService.getUserMenu(userId);
            console.log(`Menu fetched successfully for userId ${userId}:`, menu);
            res.status(200).json(menu);
        } catch (error) {
            console.error('Error fetching user menu:', error.message);
            res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    },

    /**
     * Eliminar una comida del menú
     */
    async removeMealFromMenu(req, res) {
        try {
            const { menuId } = req.params;

            console.log('Eliminando entrada del menú con ID:', menuId);

            if (!menuId) {
                return res.status(400).json({ message: 'menuId es requerido' });
            }

            // Llamar al servicio para eliminar la entrada del menú
            await MenuService.removeMealFromMenu(menuId);

            console.log('Entrada eliminada exitosamente');
            return res.status(204).send();
        } catch (error) {
            console.error('Error al eliminar comida del menú:', error.message);
            return res.status(500).json({ message: 'Error interno del servidor', error: error.message });
        }
    },
};

module.exports = MenuController;
