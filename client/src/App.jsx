import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getAllRecipesAction, getAllDietsAction } from '././redux/actions'
import { Switch, Route } from 'react-router-dom'

// COMPONENTES
import Navbar from './components/Navbar'
import LandingPage from './pages/LandingPage'
import HomePage from './pages/HomePage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import CreateRecipePage from './pages/CreateRecipePage/CreateRecipePage'
import Error404 from './pages/Error404'

function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllRecipesAction())
    dispatch(getAllDietsAction())
  }, [dispatch])

  return (
    <>
      <Route exact path={['/home', '/recipes/create', '/recipes/:id']} component={Navbar} />
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/home' component={HomePage} />
        <Route exact path='/recipes/create' component={CreateRecipePage} />
        <Route exact path='/recipes/:id' component={RecipeDetailPage} />
        <Route path='*' component={Error404} />
      </Switch>
    </>
  )
}

export default App
