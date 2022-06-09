import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { recipeSelector } from './selectors'
import styles from './index.module.css'

// COMPONENTES
import RecipeCard from '../RecipeCard'
import Paginator from '../Paginator'
import Spinner from '../Spinner'

function RecipesList () {
  // const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [recipesPerPage, setRecipesPerPage] = useState(9); //eslint-disable-line
  const recipes = useSelector(recipeSelector)
  const search = useSelector(state => state.search)
  const loading = useSelector((state) => state.loading)
  const filter = useSelector((state) => state.filter)

  useEffect(() => {
    setCurrentPage(1)
  }, [recipes])//eslint-disable-line

  const paginate = (page) => {
    window.scrollTo(0, 0)
    setCurrentPage(page)
  }

  if (loading) return <Spinner />
  if (recipes.message) return <p className={styles.message}>{recipes.message} 😥</p>
  if (!recipes.length) return <p className={styles.message}>There is not recipes for {search} with the {filter} diet 😥</p>

  //* PAGINACIÓN
  const indexOfLastRecipe = currentPage * recipesPerPage
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
  const paginatedRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

  return (
    <>
      {search !== '' && <p className={styles.message}>Showing results for {search}</p>}
      <div className={styles['recipes-container']}>
        {paginatedRecipes.map(({ id, name, image, healthScore, diets }) => (
          <RecipeCard
            key={id}
            id={id}
            name={name}
            image={image}
            healthScore={healthScore}
            diets={diets}
          />
        ))}
      </div>
      {recipes.length > 9 && (
        <Paginator
          currentPage={currentPage}
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      )}
    </>
  )
}

export default RecipesList
