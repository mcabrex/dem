import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import campaign from './campaign'
import user from './user'
import dice from './dice'
import classes from './dndApi/classes'
import dndClass from './dndApi/dndClass'
import abilityScores from './dndApi/abilityScores'
import skills from './dndApi/skills'

const reducer = combineReducers({
  user,dice,classes,dndClass,abilityScores,skills,campaign
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './campaign'
export * from './user'
export * from './dice'
export * from './dndApi/classes'
export * from './dndApi/dndClass'
export * from './dndApi/abilityScores'
export * from './dndApi/skills'
