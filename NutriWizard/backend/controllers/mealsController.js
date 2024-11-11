// File: controllers/mealsController.js

const MealsRepository = require('../repositories/mealsRepository');
const UserMealsRepository = require('../repositories/userMealsRepository'); // Importación de UserMealsRepository

class MealsController {
    static async createMeal(req, res) {
        try {
            const { userId, ...mealData } = req.body;

            const meal = await MealsRepository.createMeal(mealData);
            console.log('Comida creada exitosamente:', meal);

            if (userId) {
                const userMealData = {
                    userId,
                    breakfast: mealData.mealType === 'breakfast' ? meal.id : null,
                    lunch: mealData.mealType === 'lunch' ? meal.id : null,
                    dinner: mealData.mealType === 'dinner' ? meal.id : null,
                };

                await UserMealsRepository.createUserMeal(userMealData);
                console.log('Relación user_meals creada exitosamente');
            } else {
                console.warn('userId no proporcionado, no se creó una entrada en user_meals.');
            }

            res.status(201).json(meal);
        } catch (error) {
            console.error('Error al crear la comida:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getMealById(req, res) {
        try {
            const meal = await MealsRepository.getMealById(req.params.id);
            if (!meal) {
                return res.status(404).json({ error: 'Meal not found' });
            }
            res.json(meal);
        } catch (error) {
            console.error('Error al obtener la comida por ID:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async getAllMeals(req, res) {
        try {
            const meals = await MealsRepository.getAllMeals();
            console.log('Obteniendo todas las comidas:', meals);
            res.json(meals);
        } catch (error) {
            console.error('Error al obtener todas las comidas:', error.message);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    static async updateMeal(req, res) {
        try {
            const { id } = req.params;
            const { userId, ...mealData } = req.body;

            const updatedMeal = await MealsRepository.updateMeal(id, mealData);
            if (updatedMeal) {
                if (userId) {
                    const userMealData = {
                        breakfast: mealData.mealType === 'breakfast' ? id : null,
                        lunch: mealData.mealType === 'lunch' ? id : null,
                        dinner: mealData.mealType === 'dinner' ? id : null,
                    };

                    await UserMealsRepository.updateUserMeal(userId, userMealData);
                    console.log('Relación user_meals actualizada exitosamente');
                }
                res.status(200).json(updatedMeal);
            } else {
                res.status(404).json({ error: 'Comida no encontrada' });
            }
        } catch (error) {
            console.error('Error al actualizar la comida:', error.message);
            res.status(500).json({ error: 'Error al actualizar la comida' });
        }
    }

    static async deleteMeal(req, res) {
        try {
            const { id } = req.params;

            await UserMealsRepository.removeMealReferences(id); // Nueva función para limpiar referencias en user_meals
            const deleted = await MealsRepository.deleteMeal(id);
            if (deleted) {
                console.log('Comida eliminada con ID:', id);
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Comida no encontrada' });
            }
        } catch (error) {
            console.error('Error al eliminar la comida:', error.message);
            res.status(500).json({ error: 'Error al eliminar la comida' });
        }
    }
}

module.exports = MealsController;