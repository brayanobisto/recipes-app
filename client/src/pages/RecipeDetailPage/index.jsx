import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getRecipeAction, resetRecipeAction } from '../../redux/actions'
import styles from './index.module.css'

import Spinner from '../../components/Spinner'

function RecipeDetailPage () {
  const [loading, setLoading] = useState(true)
  const { id } = useParams()
  const recipe = useSelector((state) => state.recipe)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRecipeAction(id))

    return () => {
      dispatch(resetRecipeAction())
    }
  }, [dispatch, id])

  useEffect(() => {
    if (Object.keys(recipe).length) setLoading(false)
  }, [recipe])

  function removeTags (str) {
    if (str === null || str === '') return false
    else str = str.toString()

    return str.replace(/(<([^>]+)>)/gi, '')
  }

  if (loading) return <Spinner />
  if (recipe.message) return <p>{recipe.message}</p>

  return (
    <div className={styles['detail-container']}>
      <h1 className={styles.title}>{recipe.name}</h1>

      <div className={styles['image-container']}>
        <img
          className={styles.image}
          src={recipe.image}
          alt={recipe.name}
          onError={(event) => event.target.setAttribute('src', 'https://spoonacular.com/recipeImages/157086-312x231.jpg')}
        />
      </div>

      <div className={styles['scores-container']}>
        <span>Health Score: {recipe.healthScore}</span>
      </div>

      {recipe.diets.length > 0 && (
        <ul className={styles['diets-container']}>
          {recipe.diets.map((diet) => (
            <li key={diet + Date.now().toString()} className={styles.diet}>
              {diet}
            </li>
          ))}
        </ul>
      )}

      {recipe.summary !== null && recipe.summary !== '' && (
        <div className={styles['summary-container']}>
          <h2>Summary</h2>
          <p>{removeTags(recipe.summary)}</p>
        </div>
      )}

      {recipe.instructions !== null && recipe.instructions !== '' && (
        <div className={styles['instructions-container']}>
          <h2>Instructions</h2>
          <p>{removeTags(recipe.instructions)}</p>
        </div>
      )}
    </div>
  )
}

export default RecipeDetailPage
