// UTILIDADES
const normalizeAPIRecipes = (apiRecipes) => {
  return apiRecipes.map(({ id, title, image, healthScore, diets, vegetarian }) => {
    const formatedRecipe = {
      id,
      name: title,
      image,
      healthScore,
      isFromDB: false,
      diets
    }

    vegetarian && formatedRecipe.diets.push('vegetarian')

    return formatedRecipe
  })
}

const normalizeAPIRecipe = ({ id, title, summary, image, healthScore, instructions, diets, vegetarian }) => {
  const formatedRecipe = {
    id,
    name: title,
    summary,
    image,
    healthScore,
    instructions,
    diets
  }

  vegetarian && formatedRecipe.diets.push('vegetarian')

  return formatedRecipe
}

const normalizeDBRecipes = (dbRecipes) => {
  return dbRecipes.map((recipe) => recipe.toJSON()).map((recipe) => ({ ...recipe, diets: recipe.diets.map((diet) => diet.name) }))
}

const normalizeDBRecipe = (dbRecipe) => {
  if (dbRecipe === null) return dbRecipe

  dbRecipe = dbRecipe.toJSON()
  return { ...dbRecipe, diets: dbRecipe.diets.map((diet) => diet.name) }
}

const isUuid = (str) => {
  return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(str)
}

module.exports = {
  normalizeAPIRecipes,
  normalizeAPIRecipe,
  normalizeDBRecipes,
  normalizeDBRecipe,
  isUuid
}
