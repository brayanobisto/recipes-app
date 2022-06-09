import {
  GET_RECIPES,
  CREATE_RECIPE,
  SEARCH_RECIPES,
  SET_LOADING,
  GET_RECIPE,
  RESET_RECIPE,
  GET_DIETS,
  SET_FILTER,
  SET_SORT,
  RESET_FILTERS
} from '../actions'

const initialState = {
  recipes: [],
  recipe: {},
  diets: [],
  filter: 'any',
  sort: {
    field: 'none',
    type: 'none'
  },
  search: '',
  loading: false
}

const recipeReducer = (state = initialState, action) => {
  const { type, payload } = action

  // OBTENER TODAS LAS RECETAS
  if (type === GET_RECIPES) {
    if (state.diets.length !== 0 || state.diets.message !== undefined) {
      return { ...state, recipes: payload, loading: false }
    }

    return { ...state, recipes: payload }
  }

  // CREAR NUEVA RECETA
  if (type === CREATE_RECIPE) {
    return { ...state, recipes: [...state.recipes, payload], recipe: { message: 'The recipe was created' } }
  }

  // BUSCAR RECETAS
  if (type === SEARCH_RECIPES) {
    return { ...state, recipes: payload.recipes, search: payload.name, loading: false }
  }

  if (type === SET_LOADING) {
    return { ...state, loading: true }
  }

  // OBTENER DETALLE DE LA RECETA
  if (type === GET_RECIPE) {
    return { ...state, recipe: payload }
  }

  // LIMPIAR DETALLE DE RECETA
  if (type === RESET_RECIPE) {
    return { ...state, recipe: payload }
  }

  // OBTENER TODAS LAS DIETAS
  if (type === GET_DIETS) {
    if (state.recipes.length !== 0 || state.recipe.message !== undefined) {
      return { ...state, diets: payload, loading: false }
    }

    return { ...state, diets: payload }
  }

  // SETEAR TIPO DE DIETA PARA FILTRAR
  if (type === SET_FILTER) {
    return { ...state, filter: payload }
  }

  // SETEAR CAMPO Y TIPO DE ORDENAMIENTO
  if (type === SET_SORT) {
    return { ...state, sort: payload }
  }

  // LIMPIAR FILTROS
  if (type === RESET_FILTERS) {
    return {
      ...state,
      filter: 'any',
      sort: {
        field: 'none',
        type: 'none'
      }
    }
  }

  return state
}

export default recipeReducer
