import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import classes from './dndApi/classes'
import dndClass from './dndApi/dndClass'
import abilityScores from './dndApi/abilityScores'

const reducer = combineReducers({user,classes,dndClass,abilityScores})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './dndApi/classes'
export * from './dndApi/dndClass'
export * from './dndApi/abilityScores'
