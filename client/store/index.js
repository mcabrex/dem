import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import campaigns from './campaign'
import user from './user'
import dice from './dice'
import classes from './dndApi/classes'
import races from './dndApi/races'
import dndClass from './dndApi/dndClass'
import dndRace from './dndApi/dndRace'
import abilityScores from './dndApi/abilityScores'
import skills from './dndApi/skills'

const reducer = combineReducers({
  user,dice,classes,races,dndClass,dndRace,abilityScores,skills,campaigns
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
export * from './dndApi/races'
export * from './dndApi/dndClass'
export * from './dndApi/dndRace'
export * from './dndApi/abilityScores'
export * from './dndApi/skills'
