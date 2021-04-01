const Recipe = require('../models/Recipe');
const { sendSms } = require('../utils/twilio');

module.exports = class textOnOrderService {
  static async create(recipe) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New recipe received for ${recipe.title}`
    );

    const order = await Recipe.insert(recipe);

    return order;
  }

  static async updateTitle({ title }, { id }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Your recipe title has been updated ${title}`
    );

    const order = await Recipe.updateTitle(title, id);

    return order;
  }

  static async deleteRecipe({id}) {
    await sendSms(
        process.env.ORDER_HANDLER_NUMBER,
        `Your recipe has been deleted`
    );
    const order = await Recipe.deleteRecipe( id );

    return order;
  }
};