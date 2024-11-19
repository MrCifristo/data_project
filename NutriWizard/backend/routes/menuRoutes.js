const express = require('express');
const MenuController = require('../controllers/menuController');

const router = express.Router();

/**
 * POST /api/menu
 * Agregar una comida al menú
 */
router.post('/', async (req, res) => {
    try {
        const { userId, mealId } = req.body;

        console.log('Recibiendo datos en ruta POST /menu:', { userId, mealId });

        if (!userId || !mealId) {
            console.warn('Faltan datos en la solicitud POST /menu');
            return res.status(400).json({ message: 'userId y mealId son requeridos' });
        }

        // Llama al controlador con la solicitud completa
        await MenuController.addMealToMenu(req, res);
    } catch (error) {
        console.error('Error al agregar comida al menú:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/**
 * GET /api/menu/:userId
 * Obtener el menú de un usuario
 */
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        console.log('Recibiendo solicitud GET /menu para el usuario:', userId);

        if (!userId) {
            console.warn('Falta userId en la solicitud GET /menu');
            return res.status(400).json({ message: 'userId es requerido' });
        }

        // Llama al controlador con la solicitud completa
        await MenuController.getUserMenu(req, res);
    } catch (error) {
        console.error('Error al obtener el menú del usuario:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

/**
 * DELETE /api/menu/:menuId
 * Eliminar una comida del menú
 */
router.delete('/:menuId', async (req, res) => {
    try {
        const { menuId } = req.params;

        console.log('Recibiendo solicitud DELETE /menu para el menú ID:', menuId);

        if (!menuId) {
            console.warn('Falta menuId en la solicitud DELETE /menu');
            return res.status(400).json({ message: 'menuId es requerido' });
        }

        // Llama al controlador con la solicitud completa
        await MenuController.removeMealFromMenu(req, res);
    } catch (error) {
        console.error('Error al eliminar comida del menú:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

module.exports = router;