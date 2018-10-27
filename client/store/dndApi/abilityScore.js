import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_ABILITY_SCORE_BEGIN = 'GET_ABILITY_SCORE_BEGIN'
const GET_ABILITY_SCORE_SUCCESS = 'GET_ABILITY_SCORE_SUCCESS'
const GET_ABILITY_SCORE_FAILURE = 'GET_ABILITY_SCORE_FAILURE'

/**
 * INITIAL STATE
 */
const defaultAbilityScore = {
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getAbilityScoreBegin = () => ({type: GET_ABILITY_SCORE_BEGIN})
const getAbilityScoreSuccess = AbilityScoreInfo => ({type: GET_ABILITY_SCORE_SUCCESS, payload: {AbilityScoreInfo}})
const getAbilityScoreFailure = error => ({type: GET_ABILITY_SCORE_FAILURE, error})

/**
 * THUNK CREATORS
 */
export const getAbilityScore = (index) => async dispatch => {
  try {
    dispatch(getAbilityScoreBegin())
    const res = await axios.get(`http://www.dnd5eapi.co/api/ability-scores/${index}`)
    console.log('response',res.data)
    dispatch(getAbilityScoreSuccess(res.data))
    return res.data;
  } catch (err) {
    console.error(err)
    dispatch(getAbilityScoreFailure(err))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultAbilityScore, action) {
  switch (action.type) {
    case GET_ABILITY_SCORE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_ABILITY_SCORE_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.abilityScoreInfo
      };
    case GET_ABILITY_SCORE_FAILURE:
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
