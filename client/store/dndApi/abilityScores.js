import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ABILITY_SCORES_BEGIN = 'GET_ABILITY_SCORES_BEGIN'
const GET_ABILITY_SCORES_SUCCESS = 'GET_ABILITY_SCORES_SUCCESS'
const GET_ABILITY_SCORES_FAILURE = 'GET_ABILITY_SCORES_FAILURE'

/**
 * INITIAL STATE
 */
const defaultAbilityScores = {
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

/**
 * THUNK CREATORS
 */
export const getAbilityScores = () => async dispatch => {
  try {
    dispatch(getAbilityScoresBegin())
    const res = await axios.get(`http://www.dnd5eapi.co/api/ability-scores`)
    console.log('response',res.data.results)
    dispatch(getAbilityScoresSuccess(res.data.results))
    return res.data.results;
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
        items: []
      };
    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
