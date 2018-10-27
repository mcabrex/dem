import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const GET_ABILITY_SCORES_BEGIN = 'GET_ABILITY_SCORES_BEGIN'
const GET_ABILITY_SCORES_SUCCESS = 'GET_ABILITY_SCORES_SUCCESS'
const GET_ABILITY_SCORES_FAILURE = 'GET_ABILITY_SCORES_FAILURE'
const SEARCH_ALL_ABILITY_SCORES = 'SEARCH_ALL_ABILITY_SCORES'
const SEARCHED_ABILITY_SCORES = 'SEARCHED_ABILITY_SCORES'

/**
 * INITIAL STATE
 */
const defaultAbilityScores = {
  originalItems: [],
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getAbilityScoresBegin = () => ({type: GET_ABILITY_SCORES_BEGIN})
const getAbilityScoresSuccess = abilityScoresInfo => ({type: GET_ABILITY_SCORES_SUCCESS, payload: {abilityScoresInfo}})
const getAbilityScoresFailure = error => ({type: GET_ABILITY_SCORES_FAILURE, error})
const searchAllAbilityScores = query => ({type: SEARCH_ALL_ABILITY_SCORES, query})
const searchAbilityScore = searchedQuery => ({type: SEARCHED_ABILITY_SCORES, searchedQuery})


/**
 * THUNK CREATORS
 */
export const getAbilityScores = () => async dispatch => {
  try {
    dispatch(getAbilityScoresBegin())
    const responses = []
    for(let i = 0; i < 6; i++){
      const res = await axios.get(`http://www.dnd5eapi.co/api/ability-scores/${i+1}`)
      responses.push(res.data)
    }
    console.log('responses',responses)
    dispatch(getAbilityScoresSuccess(responses))
    return responses;
  } catch (err) {
    console.error(err)
    dispatch(getAbilityScoresFailure(err))
  }
}

export const searchAbilityScores = query => dispatch => {
  const searchQuery = query.target.value;
  console.log(searchQuery)
  dispatch(searchAllAbilityScores(searchQuery))
  searchQuery.length ? history.push(`/ability-score?q=${searchQuery}`) : history.push('/ability-score')
  return query;
}

export const searchedAbilityScore = query => async dispatch => {
  try {
    dispatch(getAbilityScoresBegin())
    const responses = []
    const count = await axios.get('http://www.dnd5eapi.co/api/ability-scores/')
    for(let i = 0; i < count.data.count; i++){
      const res = await axios.get(`http://www.dnd5eapi.co/api/ability-scores/${i+1}`)
      responses.push(res.data)
    }
    dispatch(getAbilityScoresSuccess(responses))
    dispatch(searchAbilityScore(query))
    return query;
  } catch (err) {
    console.error(err)
    dispatch(getAbilityScoresFailure(err))
  }
}
/**
 * REDUCER
 */

export default function(state = defaultAbilityScores, action) {
  switch (action.type) {
    case GET_ABILITY_SCORES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_ABILITY_SCORES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        originalItems: action.payload.abilityScoresInfo,
        items: action.payload.abilityScoresInfo
      };
    case GET_ABILITY_SCORES_FAILURE:
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
      };
    case SEARCH_ALL_ABILITY_SCORES:
      console.log(state.originalItems)
      return {
        ...state,
        items : state.originalItems.filter(item => {
          const searchValue = item.name.toLowerCase()
          return searchValue.indexOf(action.query.toLowerCase()) !== -1;
        })
      };
    case SEARCHED_ABILITY_SCORES:
      return {
        ...state,
        items : state.originalItems.filter(item => {
          const searchValue = item.name.toLowerCase()
          return searchValue.indexOf(action.searchedQuery.toLowerCase()) !== -1;
        })
      };
    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
