const { Router } = require('express')
const { getRecipes, getRecipe, postRecipe } = require('../controllers/recipes')
const router = Router()

// RECIPES
router.get('/', getRecipes)
router.get('/:id', getRecipe)
router.post('/', postRecipe)

module.exports = router
