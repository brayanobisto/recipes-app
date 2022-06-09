import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetFiltersAction } from '../../redux/actions'
import styles from './index.module.css'

// COMPONENTES
import SearchBar from '../../components/SearchBar'
import FilterBar from '../../components/FilterBar'
import RecipesList from '../../components/RecipesList'

function HomePage () {
  const dispatch = useDispatch()

  useEffect(() => {
    return () => dispatch(resetFiltersAction())
  }, [])//eslint-disable-line

  return (
    <div className={styles['home-container']}>
      <div className={styles['bars-container']}>
        <SearchBar />
        <FilterBar />
      </div>
      <RecipesList />
    </div>
  )
}

export default HomePage
