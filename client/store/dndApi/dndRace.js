import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_RACE_BEGIN = 'GET_RACE_BEGIN'
const GET_RACE_SUCCESS = 'GET_RACE_SUCCESS'
const GET_RACE_FAILURE = 'GET_RACE_FAILURE'

/**
 * INITIAL STATE
 */
const defaultRace = {
  items: [],
  loading: false,
  error: null
}

/**
 * ACTION CREATORS
 */
const getRaceBegin = () => ({type: GET_RACE_BEGIN})
const getRaceSuccess = dndRaceInfo => ({type: GET_RACE_SUCCESS, payload: {dndRaceInfo}})
const getRaceFailure = error => ({type: GET_RACE_FAILURE, error})

/**
 * THUNK CREATORS
 */
export const getRace = (dndRace) => async dispatch => {
  try {
    dispatch(getRaceBegin())
    const res = await axios.get(`https://api-beta.open5e.com/races/?name=${dndRace}`)
    const { name,asi_desc,age,alignment,size,speed_desc,languages,traits,vision} = res.data.results[0]
    const results = {
      "Name:" : name,
      "Ability Score Increase:" : asi_desc,
      "Age:" : age,
      "Alignment:" : alignment,
      "Size:" : size,
      "Speed:" : speed_desc,
      "Languages:" : languages,
      "Traits:" : traits,
      "Vision:" : vision
    }
    dispatch(getRaceSuccess(results))
    return res.data;
  } catch (err) {
    console.error(err)
    dispatch(getRaceFailure(err))
  }
}

/**
 * REDUCER
 */

export default function(state = defaultRace, action) {
  switch (action.type) {
    case GET_RACE_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_RACE_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        items: action.payload.dndRaceInfo
      };
    case GET_RACE_FAILURE:
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
