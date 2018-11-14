import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CLASS_BEGIN = 'GET_CLASS_BEGIN'
const GET_CLASS_SUCCESS = 'GET_CLASS_SUCCESS'
const GET_CLASS_FAILURE = 'GET_CLASS_FAILURE'

/**
 * INITIAL STATE
 */
const defaultClass = {
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getClassBegin = () => ({type: GET_CLASS_BEGIN})
const getClassSuccess = dndClassInfo => ({type: GET_CLASS_SUCCESS, payload: {dndClassInfo}})
const getClassFailure = error => ({type: GET_CLASS_FAILURE, error})

/**
 * THUNK CREATORS
 */
export const getClass = (dndClass) => async dispatch => {
  try {
    dispatch(getClassBegin())
    const res = await axios.get(`https://api-beta.open5e.com/classes/?name=${dndClass}`)
    dispatch(getClassSuccess(res.data.results[0]))
    return res.data;
  } catch (err) {
    console.error(err)
    dispatch(getClassFailure(err))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultClass, action) {
  switch (action.type) {
    case GET_CLASS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_CLASS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.dndClassInfo
      };
    case GET_CLASS_FAILURE:
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
