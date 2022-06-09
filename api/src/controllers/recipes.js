const { getAllRecipes, findRecipe, createRecipe } = require('../services/recipes')

const getRecipes = (req, res, next) => {
  getAllRecipes(req.query)
    .then((recipes) => res.status(200).json(recipes))
    .catch((error) => next(error))
}

const getRecipe = (req, res, next) => {
  findRecipe(req.params)
    .then((recipe) => res.status(200).json(recipe))
    .catch((error) => next(error))
}

const postRecipe = (req, res, next) => {
  createRecipe(req.body)
    .then((recipe) => res.status(201).json(recipe))
    .catch((error) => next({ status: 400, message: error.message || error.errors[0].message }))
}

module.exports = {
  getRecipes,
  getRecipe,
  postRecipe
}
