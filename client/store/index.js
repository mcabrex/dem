import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import campaigns from './campaign'
import user from './user'
import dice from './dice'
import classes from './dndApi/classes'
import spells from './dndApi/spells'
import races from './dndApi/races'
import dndClass from './dndApi/dndClass'
import dndRace from './dndApi/dndRace'

const reducer = combineReducers({
  user,
  dice,
  classes,
  spells,
  races,
  dndClass,
  dndRace,
  campaigns
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
export * from './dndApi/spells'
export * from './dndApi/races'
export * from './dndApi/dndClass'
export * from './dndApi/dndRace'
