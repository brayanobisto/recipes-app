import dotenv from 'dotenv'
dotenv.config()
const URL = `${process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'}/recipes` 

export const getAllRecipes = async () => {
  const response = await fetch(URL)
  const data = await response.json()

  return data
}

export const createRecipe = async (recipe) => {
  const response = await fetch(URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(recipe)
  })
  const data = await response.json()

  return data
}

export const searchRecipes = async (name) => {
  const response = await fetch(`${URL}?name=${name}`)
  const data = await response.json()

  return data
}

export const getRecipe = async (id) => {
  const response = await fetch(`${URL}/${id}`)
  const data = await response.json()

  return data
}
