const request = require('superagent');

const getRecipe = async (ingredients) => {
    const results = await request.get(
        `http://www.recipepuppy.com/api/?i=${ingredients}`
    )
    
    console.log('results', results);
    return JSON.parse(results.text).results
}
module.exports = { getRecipe };