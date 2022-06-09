const { Recipe, Diet } = require('../../db')
const { Op } = require('sequelize')
const { normalizeDBRecipes, normalizeDBRecipe } = require('../../utils')

const getDBRecipes = async (name) => {
  const options = {
    attributes: {
      exclude: ['summary', 'healthScore', 'instructions', 'createdAt', 'updatedAt']
    },
    include: {
      model: Diet,
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      through: {
        attributes: []
      }
    },
    order: [['createdAt', 'ASC']]
  }

  if (name !== undefined) {
    options.include.where = {
      '$recipe.name$': {
        [Op.iLike]: `%${name}%`
      }
    }
  }

  const dbRecipes = await Recipe.findAll(options)

  return normalizeDBRecipes(dbRecipes)
}

const getDBRecipe = async (id) => {
  const dbRecipe = await Recipe.findByPk(id, {
    attributes: { exclude: ['isFromDB', 'createdAt', 'updatedAt'] },
    include: {
      model: Diet,
      attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
      through: {
        attributes: []
      }
    }
  })
  return normalizeDBRecipe(dbRecipe)
}

module.exports = {
  getDBRecipes,
  getDBRecipe
}
