const axios = require('axios')
const createError = require('http-errors')
const { normalizeAPIRecipes, normalizeAPIRecipe } = require('../../utils')
process.env.NODE_ENV !== 'production' && require('dotenv').config()
const API_KEYS = process.env.API_KEYS.split(' ')

const getAPIRecipes = async (name, API_KEYS_COPY) => {
  if (API_KEYS_COPY === undefined) API_KEYS_COPY = API_KEYS.slice()

  if (API_KEYS_COPY.length === 0) return createError(429, "'Too many requests, come back later.'")

  const API_KEY = API_KEYS_COPY.pop()
  let URL = `https://api.spoonacular.com/recipes/complexSearch?&number=100&addRecipeInformation=true&apiKey=${API_KEY}`

  name !== undefined && (URL += `&query=${name}`)

  try {
    const { data } = await axios(URL)

    return normalizeAPIRecipes(data.results)
  } catch (error) {
    if (error.response.data.code === 402) return getAPIRecipes(name, API_KEYS_COPY)
  }
}

const getAPIRecipe = async (id, API_KEYS_COPY) => {
  if (API_KEYS_COPY === undefined) {
    API_KEYS_COPY = API_KEYS.slice()
  }

  if (API_KEYS_COPY.length === 0) return createError(429, 'Too many requests, come back later.')
  const API_KEY = API_KEYS_COPY.pop()

  try {
    const { data } = await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)

    return normalizeAPIRecipe(data)
  } catch (error) {
    if (error.response.data.code === 402) return getAPIRecipe(id, API_KEYS_COPY)

    return createError(404, `A recipe with the id ${id} does not exist.`)
  }
}

module.exports = {
  getAPIRecipes,
  getAPIRecipe
}
