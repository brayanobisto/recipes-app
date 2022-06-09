export const recipeSelector = ({ recipes, filter, sort }) => {
  if (recipes.message) return recipes

  let selectedRecipes = JSON.parse(JSON.stringify(recipes))

  if (filter !== 'any') { selectedRecipes = recipes.filter((recipe) => recipe.diets.includes(filter)) }

  switch (sort.field) {
    case 'name':
      switch (sort.type) {
        case 'asc':
          selectedRecipes.sort((a, b) => a.name.localeCompare(b.name))
          break
        case 'desc':
          selectedRecipes.sort((a, b) => b.name.localeCompare(a.name))
          break
        default:
          break
      }
      break
    case 'healthScore':
      switch (sort.type) {
        case 'asc':
          selectedRecipes.sort((a, b) => a.healthScore - b.healthScore)
          break
        case 'desc':
          selectedRecipes.sort((a, b) => b.healthScore - a.healthScore)
          break
        default:
          break
      }
      break
    default:
      break
  }

  return selectedRecipes
}
