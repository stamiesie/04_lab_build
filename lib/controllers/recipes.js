const { Router } = require('express');
const Recipe = require('../models/Recipe');
const RecipeService = require('../services/RecipeService');
const textOnOrderService = require('../services/textOnOrderService');

module.exports = Router()
.post('/', (req, res, next) => {
    textOnOrderService
    .create(req.body)
    .then(recipes => res.send(recipes))
    .catch(next);
})

// .get('/', (req, res, next) => {
//     const ingredient = req.query.i
//     RecipeService
//     .create(ingredient)
//     .then(recipes => res.send(recipes))
//     .catch(next);
// })

.get('/:id', async (req, res, next) => {
    Recipe
    .findById(req.params.id)
    .then(recipes => res.send(recipes))
    .catch(next);
})

.put('/:id', async (req, res, next) => {
    textOnOrderService
    .updateTitle(req.body, req.params)
    .then(recipes => res.send(recipes))
    .catch(next);
})

.delete('/:id', async (req, res, next) => {
    //   console.log('!!!!!!!', req.body);
    textOnOrderService
    .deleteRecipe(req.params)
    .then(recipes => res.send(recipes))
    .catch(next)
  })


