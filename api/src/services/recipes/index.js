const createError = require('http-errors')
const { getAPIRecipes, getAPIRecipe } = require('./api')
const { getDBRecipes, getDBRecipe } = require('./db')
const { Recipe } = require('../../db')
const { isUuid } = require('../../utils')

const getAllRecipes = async (query) => {
  const { name } = query
  const apiRequest = getAPIRecipes(name)
  const dbRequest = getDBRecipes(name)

  const [apiRecipes, dbRecipes] = await Promise.all([apiRequest, dbRequest])

  if (apiRecipes.length === 0 && dbRecipes.length === 0) return createError(404, 'No recipes found')

  return apiRecipes.concat(dbRecipes)
}

const findRecipe = async (params) => {
  const { id } = params

  if (!isUuid(id)) return await getAPIRecipe(id)

  let recipe = await getDBRecipe(id)
  recipe === null && (recipe = createError(404, `A recipe with the id ${id} does not exist.`))

  return recipe
}

const createRecipe = async (body) => {
  const { name, summary, image, score, healthScore, instructions, diets } = body
  const createdRecipe = await Recipe.create({ name, summary, image, score, healthScore, instructions })
  await createdRecipe.setDiets(diets)

  const createdRecipeDiets = await createdRecipe.getDiets({
    attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
    joinTableAttributes: []
  })

  return {
    id: createdRecipe.id,
    name,
    summary,
    image: image || createdRecipe.image,
    score,
    healthScore,
    isFromDB: true,
    instructions,
    diets: createdRecipeDiets.map((diet) => diet.toJSON()).map((diet) => diet.name)
  }
}

module.exports = {
  getAllRecipes,
  findRecipe,
  createRecipe
}
