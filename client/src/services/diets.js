import dotenv from 'dotenv'
dotenv.config()
const URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'

export const getAllDiets = async () => {
  const response = await fetch(`${URL}/diets`)
  const data = await response.json()

  return data
}
