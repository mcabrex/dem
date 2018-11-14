import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CAMPAIGNS = 'GET_CAMPAIGNS'
const GET_CAMPAIGN = 'GET_CAMPAIGN'
const REMOVE_CAMPAIGN = 'REMOVE_CAMPAIGN'

/**
 * INITIAL STATE
 */
const defaultCampaigns = {}

/**
 * ACTION CREATORS
 */
const getCampaigns = campaigns => ({type: GET_CAMPAIGNS, campaigns})
const getCampaign = campaign => ({type: GET_CAMPAIGN, campaign})
const removeCampaign = () => ({type: REMOVE_CAMPAIGN})

/**
 * THUNK CREATORS
 */
export const myCampaigns = () => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    const res = await axios.get(`/api/user/${user.data.username}/campaigns`)
    dispatch(getCampaigns(res.data || defaultCampaigns))
  } catch (err) {
    console.error(err)
  }
}

export const myCampaign = (campaignId) => async dispatch => {
  try {
    const user = await axios.get('/auth/me')
    const res = await axios.get(`/api/user/${user.data.username}/campaigns/${campaignId}`)
    dispatch(getCampaign(res.data || defaultCampaigns))
  } catch (err) {
    console.error(err)
  }
}
export const addCampaign = (username,userId,campaignName,campaignDescription) => async dispatch => {
    let res
    try {
      res = await axios.post(`/api/user/${username}/campaigns`,{userId,title:campaignName,description:campaignDescription})
      const campaignInfo = await axios.get(`/api/user/${username}/campaigns`,{userId,title:campaignName,description:campaignDescription})
      dispatch(getCampaigns(campaignInfo.data || defaultCampaigns))
    } catch (err) {
      console.error(err)
    }
}

/**
 * REDUCER
 */
export default function(state = defaultCampaigns, action) {
  switch (action.type) {
    case GET_CAMPAIGNS:
      return action.campaigns
    case GET_CAMPAIGN:
      return action.campaign
    case REMOVE_CAMPAIGN:
      return defaultCampaigns
    default:
      return state
  }
}
