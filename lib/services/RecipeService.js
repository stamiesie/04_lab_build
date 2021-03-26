const Recipe = require('../models/Recipe');
const { getRecipe } = require('../utils/RecipePuppy');

module.exports = class RecipeService {
    static async create (ingredients) {
        
        const recipeResult = await getRecipe(ingredients); 
        
        return recipeResult;
    }
};
