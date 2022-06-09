import { getAllRecipes, createRecipe, searchRecipes, getRecipe } from '../../services/recipes'
import { getAllDiets } from '../../services/diets'

//* ACTION TYPES
// OBTENER TODAS LAS RECETAS
export const GET_RECIPES = 'GET_RECIPES'

// CREAR NUEVA RECETA
export const CREATE_RECIPE = 'CREATE_RECIPE'

// BUSCAR RECETAS
export const SEARCH_RECIPES = 'SEARCH_RECIPES'

// SETEAR ESTADO CARGANDO
export const SET_LOADING = 'SET_LOADING'

// OBTENER DETALLE DE LA RECETA
export const GET_RECIPE = 'GET_RECIPE'

// LIMPIAR DETALLE DE RECETA
export const RESET_RECIPE = 'RESET_RECIPE'

// OBTENER TODAS LAS DIETAS
export const GET_DIETS = 'GET_DIETS'

// SETEAR TIPO DE DIETA PARA FILTRAR
export const SET_FILTER = 'SET_FILTER'

// SETEAR CAMPO Y TIPO DE ORDENAMIENTO
export const SET_SORT = 'SET_SORT'

// LIMPIAR FILTROS
export const RESET_FILTERS = 'RESET_FILTERS'

//* ACTIONS GENERATORS
// OBTENER TODAS LAS RECETAS
export const getAllRecipesAction = () => {
  return async (dispatch) => {
    dispatch(setLoadingAction())
    try {
      const recipes = await getAllRecipes()
      dispatch({
        type: GET_RECIPES,
        payload: recipes
      })
    } catch (error) {
      dispatch({
        type: GET_RECIPES,
        payload: { message: 'The backend is not available' }
      })
    }
  }
}

// CREAR NUEVA RECETA
export const createRecipeAction = (recipe) => {
  return async (dispatch) => {
    try {
      const newRecipe = await createRecipe(recipe)
      dispatch({
        type: CREATE_RECIPE,
        payload: newRecipe
      })
      setTimeout(() => { dispatch(resetRecipeAction()) }, 5000)
    } catch (error) {
      console.log(error)
      dispatch({
        type: GET_RECIPE,
        payload: { message: 'ERROR' }
      })
    }
  }
}

// BUSCAR RECETAS
export const searchRecipesAction = (name) => {
  return async (dispatch) => {
    dispatch(setLoadingAction())
    const recipes = await searchRecipes(name)

    dispatch({
      type: SEARCH_RECIPES,
      payload: { recipes, name }
    })
  }
}

export const setLoadingAction = (value) => {
  return {
    type: SET_LOADING,
    payload: true
  }
}

// OBTENER DETALLE DE LA RECETA
export const getRecipeAction = (id) => {
  return async (dispatch) => {
    try {
      const recipe = await getRecipe(id)

      dispatch({
        type: GET_RECIPE,
        payload: recipe
      })
    } catch (error) {
      dispatch({
        type: GET_RECIPE,
        payload: { message: 'The backend is not available' }
      })
    }
  }
}

// LIMPIAR DETALLE DE RECETA
export const resetRecipeAction = () => {
  return {
    type: RESET_RECIPE,
    payload: {}
  }
}

// OBTENER TODAS LAS DIETAS
export const getAllDietsAction = (name) => {
  return async (dispatch) => {
    dispatch(setLoadingAction())
    try {
      const diets = await getAllDiets()
      dispatch({
        type: GET_DIETS,
        payload: diets
      })
    } catch (error) {
      dispatch({
        type: GET_DIETS,
        payload: { message: 'The backend is not available' }
      })
    }
  }
}

// SETEAR TIPO DE DIETA PARA FILTRAR
export const setFilterAction = (dietType) => {
  return {
    type: SET_FILTER,
    payload: dietType
  }
}

// SETEAR CAMPO Y TIPO DE ORDENAMIENTO
export const setSortAction = (field, type) => {
  return {
    type: SET_SORT,
    payload: { field, type }
  }
}

// SETEAR RESPUESTA
export const resetFiltersAction = () => {
  return {
    type: RESET_FILTERS

  }
}
