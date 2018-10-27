import axios from 'axios'
import history from '../../history'

/**
 * ACTION TYPES
 */
const GET_SKILLS_BEGIN = 'GET_SKILLS_BEGIN'
const GET_SKILLS_SUCCESS = 'GET_SKILLS_SUCCESS'
const GET_SKILLS_FAILURE = 'GET_SKILLS_FAILURE'
const SEARCH_ALL_SKILLS = 'SEARCH_ALL_SKILLS'

/**
 * INITIAL STATE
 */
const defaultSkills = {
  originalItems: [],
  items: [],
  loading: false,
  error: null,
  query: '',
}

/**
 * ACTION CREATORS
 */
const getSkillsBegin = () => ({type: GET_SKILLS_BEGIN})
const getSkillsSuccess = skillsInfo => ({type: GET_SKILLS_SUCCESS, payload: {skillsInfo}})
const getSkillsFailure = error => ({type: GET_SKILLS_FAILURE, error})
const searchAllSkills = query => ({type: SEARCH_ALL_SKILLS, query})
/**
 * THUNK CREATORS
 */
export const getSkills = () => async dispatch => {
  try {
    dispatch(getSkillsBegin())
    const responses = []
    const count = await axios.get('http://www.dnd5eapi.co/api/skills')
    for(let i = 0; i < count.data.count; i++){
      const res = await axios.get(`http://www.dnd5eapi.co/api/skills/${i+1}`)
      responses.push(res.data)
    }
    dispatch(getSkillsSuccess(responses))
    return responses;
  } catch (err) {
    console.error(err)
    dispatch(getSkillsFailure(err))
  }
}

export const searchSkills = query => dispatch => {
  const searchQuery = query.target.value;
  dispatch(searchAllSkills(searchQuery))
  return query;
}

/**
 * REDUCER
 */

export default function(state = defaultSkills, action) {
  switch (action.type) {
    case GET_SKILLS_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null
      }
    case GET_SKILLS_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        originalItems: action.payload.skillsInfo,
        items: action.payload.skillsInfo
      };
    case GET_SKILLS_FAILURE:
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
    case SEARCH_ALL_SKILLS:
      return {
        ...state,
        items : state.originalItems.filter(item => {
          const searchValue = item.name.toLowerCase()
          return searchValue.indexOf(action.query) !== -1
        })
      };
    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
