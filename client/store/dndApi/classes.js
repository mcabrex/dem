import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_CLASSES_BEGIN = 'GET_CLASSES_BEGIN'
const GET_CLASSES_SUCCESS = 'GET_CLASSES_SUCCESS'
const GET_CLASSES_FAILURE = 'GET_CLASSES_FAILURE'

/**
 * INITIAL STATE
 */
const defaultClasses = {
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getClassesBegin = () => ({type: GET_CLASSES_BEGIN})
const getClassesSuccess = classes => ({type: GET_CLASSES_SUCCESS, payload: {classes}})
const getClassesFailure = error => ({type: GET_CLASSES_FAILURE, error})

/**
 * THUNK CREATORS
 */
export const getClasses = () => async dispatch => {
  try {
    dispatch(getClassesBegin())
    const res = await axios.get('http://www.dnd5eapi.co/api/classes')
    dispatch(getClassesSuccess(res.data.results))
    return res.data.results;
  } catch (err) {
    console.error(err)
    dispatch(getClassesFailure(err))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultClasses, action) {
  switch (action.type) {
    case GET_CLASSES_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_CLASSES_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.classes
      };
    case GET_CLASSES_FAILURE:
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
