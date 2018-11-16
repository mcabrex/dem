import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RACES_BEGIN = 'GET_RACES_BEGIN'
const GET_RACES_SUCCESS = 'GET_RACES_SUCCESS'
const GET_RACES_FAILURE = 'GET_RACES_FAILURE'

/**
 * INITIAL STATE
 */
const defaultRaces = {
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getRacesBegin = () => ({type: GET_RACES_BEGIN})
const getRacesSuccess = races => ({type: GET_RACES_SUCCESS, payload: {races}})
const getRacesFailure = error => ({type: GET_RACES_FAILURE, error})

/**
 * THUNK CREATORS
 */
export const getRaces = () => async dispatch => {
  try {
    dispatch(getRacesBegin())
    const res = await axios.get('https://api-beta.open5e.com/races/')
    dispatch(getRacesSuccess(res.data.results))
    return res.data.results;
  } catch (err) {
    console.error(err)
    dispatch(getRacesFailure(err))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultRaces, action) {
  switch (action.type) {
    case GET_RACES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_RACES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.races
      };
    case GET_RACES_FAILURE:
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
