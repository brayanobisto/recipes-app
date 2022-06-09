const { Router } = require('express')
const { getDiets } = require('../controllers/diets')
const router = Router()

// TYPES
router.get('/', getDiets)

module.exports = router
