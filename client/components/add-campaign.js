import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addCampaign} from '../store'


/**
 * COMPONENT
 */
const AddCampaign = props => {
  const {userId,username,handleSubmit} = props
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Campaign Name:
        <input type="text" name="campaignName"/>
      </label>
      <input type="hidden" name="username" value={username} />
      <input type="hidden" name="userid" value={userId} />      
      <label>
        Campaign Description:
        <input type="text" name="campaignDescription" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id,
    username: state.user.username
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt){
      evt.preventDefault()
      const {username,userid,campaignName,campaignDescription} = evt.target
      console.log('evt.target',username.value,userid.value,campaignName.value,campaignDescription.value)
      dispatch(addCampaign(username.value,userid.value,campaignName.value,campaignDescription.value))
    }
  }
}

export default connect(mapState,mapDispatch)(AddCampaign)

/**
 * PROP TYPES
 */
AddCampaign.propTypes = {
  username: PropTypes.string
}
