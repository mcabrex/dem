import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CAMPAIGN = 'GET_CAMPAIGN'
const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getCampaigns = campaigns => ({type: GET_CAMPAIGN, campaigns})
const removeCampaign = () => ({type: REMOVE_CAMPAIGN})

/**
 * THUNK CREATORS
 */
export const myCampaigns = (username) => async dispatch => {
  try {
    const res = await axios.get(`/user/${username}/campaigns`)
    dispatch(getCampaigns(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const addCampaign = (username,userId,campaignName,campaignDescription) => async dispatch => {
    let res
    try {
      res = await axios.post(`/api/user/${username}/campaigns`,{userId,title:campaignName,description:campaignDescription})
      console.log('response',res)
    } catch (err) {
      console.error(err)
    }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_CAMPAIGN:
      return action.campaigns
    case REMOVE_CAMPAIGN:
      return defaultUser
    default:
      return state
  }
}
