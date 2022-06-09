const { getDBDiets } = require('../services/diets')

const getDiets = (req, res, next) => {
  getDBDiets()
    .then((diets) => res.status(200).json(diets))
    .catch((error) => next(error))
}

module.exports = {
  getDiets
}
