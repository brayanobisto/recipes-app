const { Diet } = require('../db')

const getDBDiets = async (name) => {
  const diets = await Diet.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } })

  return diets
}

module.exports = {
  getDBDiets
}
