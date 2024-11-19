const redisClient = require('../config/redis'); // Importa Redis
const MealsRepository = require('../repositories/mealsRepository');

class MealsController {
    static async getMealById(req, res) {
        const { id } = req.params;

        try {
            // 1. Verificar si la comida está en Redis
            const cachedMeal = await redisClient.get(`meal:${id}`);
            if (cachedMeal) {
                console.log(`⚡ Cache hit for meal:${id}`);
                return res.json(JSON.parse(cachedMeal));
            }

            // 2. Si no está en caché, consultar la base de datos
            console.log(`❌ Cache miss for meal:${id}`);
            const meal = await MealsRepository.getMealById(id);
            if (!meal) {
                return res.status(404).json({ error: 'Meal not found' });
            }

            // 3. Guardar en Redis para futuras consultas
            await redisClient.set(`meal:${id}`, JSON.stringify(meal), { EX: 3600 }); // Expira en 1 hora
            console.log(`✅ Data cached for meal:${id}`);

            res.json(meal);
        } catch (error) {
            console.error('Error al obtener la comida por ID:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAllMeals(req, res) {
        try {
            // 1. Verificar si todas las comidas están en Redis
            const cachedMeals = await redisClient.get('all_meals');
            if (cachedMeals) {
                console.log('⚡ Cache hit for all_meals');
                return res.json(JSON.parse(cachedMeals));
            }

            // 2. Si no están en caché, consultar la base de datos
            console.log('❌ Cache miss for all_meals');
            const meals = await MealsRepository.getAllMeals();
            console.log('🔍 Meals fetched from DB:', meals); // <== Log para verificar los datos obtenidos

            // 3. Validar que los datos no estén vacíos antes de guardar en Redis
            if (!meals || meals.length === 0) {
                console.warn('⚠️ No meals found to cache.');
                return res.status(200).json([]); // Devuelve un array vacío si no hay datos
            }

            // 4. Guardar en Redis
            await redisClient.set('all_meals', JSON.stringify(meals), { EX: 3600 });
            console.log('✅ Data cached for all_meals');

            res.json(meals);
        } catch (error) {
            console.error('Error al obtener todas las comidas:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = MealsController;
