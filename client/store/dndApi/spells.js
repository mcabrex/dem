import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const GET_SPELLS_BEGIN = 'GET_SPELLS_BEGIN'
const GET_SPELLS_SUCCESS = 'GET_SPELLS_SUCCESS'
const GET_SPELLS_FAILURE = 'GET_SPELLS_FAILURE'
const SEARCH_ALL_SPELLS = 'SEARCH_ALL_SPELLS'
const SEARCHED_SPELLS = 'SEARCHED_SPELLS'

/**
 * INITIAL STATE
 */
const defaultSpells = {
  originalItmes: [],
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getSpellsBegin = () => ({type: GET_SPELLS_BEGIN})
const getSpellsSuccess = spells => ({
  type: GET_SPELLS_SUCCESS,
  payload: {spells}
})
const getSpellsFailure = error => ({type: GET_SPELLS_FAILURE, error})
const searchAllSpells = query => ({type: SEARCH_ALL_SPELLS, query})
const searchSpell = searchedQuery => ({type: SEARCHED_SPELLS, searchedQuery})

/**
 * THUNK CREATORS
 */
export const getSpells = () => async dispatch => {
  try {
    dispatch(getSpellsBegin())
    let res = await axios.get('https://api-beta.open5e.com/spells/')
    let page = 2
    const responses = []
    while (res.data.next) {
      responses.push(res.data.results)
      res = await axios.get(res.data.next)
      page++
    }
    dispatch(getSpellsSuccess(responses))
    return responses
  } catch (err) {
    console.error(err)
    dispatch(getSpellsFailure(err))
  }
}

export const searchSpells = query => dispatch => {
  const searchQuery = query.target.value
  dispatch(searchAllSpells(searchQuery))
  searchQuery.length
    ? history.push(`/spells?q=${searchQuery}`)
    : history.push('/spells')
  return query
}

export const searchedSpell = query => async dispatch => {
  try {
    dispatch(getSpellsBegin())
    const responses = []
    let res = await axios.get("https://api-beta.open5e.com/spells/")
    let page = 2
    while (res.data.next) {
      responses.push(res.data.results)
      res = await axios.get(res.data.next)
      page++
    }
    dispatch(getSpellsSuccess(responses))
    dispatch(searchSpell(query))
    return query
  } catch (err) {
    console.error(err)
    dispatch(getSpellsFailure(err))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultSpells, action) {
  switch (action.type) {
    case GET_SPELLS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_SPELLS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        originalItems: action.payload.spells,
        items: action.payload.spells
      }
    case GET_SPELLS_FAILURE:
      // The request failed, but it did stop, so set loading to "false".
      // Save the error, and we can display it somewhere
      // Since it failed, we don't have items to display anymore, so set it empty.
      // This is up to you and your app though: maybe you want to keep the items
      // around! Do whatever seems right.
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        originalItems: [],
        items: []
      }
    case SEARCH_ALL_SPELLS:
      return {
        ...state,
        items: state.originalItems.map((spellsArr,ind,arr) => {
          return spellsArr.filter(spell =>{
            const searchValue = spell.name.toLowerCase()
            return searchValue.indexOf(action.query.toLowerCase()) !== -1
          })
          // console.log("item",item,action.query)
          // const searchValue = item.name.toLowerCase()
          // return searchValue.indexOf(action.query.toLowerCase()) !== -1
        })
      }
    case SEARCHED_SPELLS:
      return {
        ...state,
        items: state.originalItems.map((spellsArr,ind,arr) => {
          return spellsArr.filter(spell =>{
            const searchValue = spell.name.toLowerCase()
            return searchValue.indexOf(action.query.toLowerCase()) !== -1
          })
          // console.log("item",item,action.query)
          // const searchValue = item.name.toLowerCase()
          // return searchValue.indexOf(action.query.toLowerCase()) !== -1
        })
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
