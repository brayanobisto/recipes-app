const { Router } = require('express')
const router = Router()

// Importar todos los routers;
const recipesRouter = require('./recipes')
const dietsRouter = require('./diets')

// Configurar los routers
router.use('/recipes', recipesRouter)
router.use('/diets', dietsRouter)

module.exports = router
