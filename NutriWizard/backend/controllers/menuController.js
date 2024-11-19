const redisClient = require('../config/redis'); // Importa Redis
const MenuService = require('../services/menuService');

const MenuController = {
    async getUserMenu(req, res) {
        const { userId } = req.params;

        try {
            // 1. Verificar si el menú está en Redis
            const cachedMenu = await redisClient.get(`menu:${userId}`);
            if (cachedMenu) {
                console.log(`⚡ Cache hit for menu:${userId}`);
                return res.json(JSON.parse(cachedMenu));
            }

            // 2. Si no está en caché, consultar la base de datos
            console.log(`❌ Cache miss for menu:${userId}`);
            const menu = await MenuService.getUserMenu(userId);
            if (!menu) {
                return res.status(404).json({ error: 'Menu not found' });
            }

            // 3. Guardar en Redis
            await redisClient.set(`menu:${userId}`, JSON.stringify(menu), { EX: 3600 }); // Expira en 1 hora
            console.log(`✅ Data cached for menu:${userId}`);

            res.json(menu);
        } catch (error) {
            console.error('Error al obtener el menú del usuario:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};

module.exports = MenuController;
