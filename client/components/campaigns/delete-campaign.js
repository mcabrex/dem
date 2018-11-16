import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {deleteCampaign} from '../../store'

/**
 * COMPONENT
 */
const DeleteCampaignDiv = props => {
  const {destroyCampaign,onClick,campaign} = props
  console.log("delete props",campaign)
  const destroyer = () => {
    destroyCampaign(campaign.id)
  }
  return (
    <div>
      <div>Are you sure you want to end this campaign?</div>
      <div className="campaigns-add" onClick={destroyer}>
        Yes
      </div>
      <div className="campaigns-add" onClick={onClick}>
        No
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
    console.log('state',state)
  return {
    userId: state.user.id,
    username: state.user.username,
    campaign: state.campaigns[0]
  }
}

const mapDispatch = dispatch => {
  return {
    destroyCampaign(campaignId) {
        dispatch(deleteCampaign(campaignId))
    }
  }
}

export default connect(mapState, mapDispatch)(DeleteCampaignDiv)

/**
 * PROP TYPES
 */
DeleteCampaignDiv.propTypes = {
  username: PropTypes.string
}
