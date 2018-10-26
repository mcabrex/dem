import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserCampaigns = props => {
  const {username} = props

  return (
    <div className="userhome">
      <div>Campaigns</div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserCampaigns)

/**
 * PROP TYPES
 */
UserCampaigns.propTypes = {
  username: PropTypes.string
}
