// File: routes/menuRoutes.js
const express = require('express');
const MenuController = require('../controllers/menuController');

const router = express.Router();

// Agregar comida al menú
router.post('/', MenuController.addMealToMenu);

// Obtener menú por usuario
router.get('/:userId', MenuController.getUserMenu);

// Eliminar comida del menú
router.delete('/:menuId', MenuController.removeMealFromMenu);

module.exports = router;