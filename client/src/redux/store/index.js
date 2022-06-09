import { createStore, applyMiddleware } from 'redux'
import reducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
  /* applyMiddleware(thunk) Reemplaza a las devtools en producción */
)
