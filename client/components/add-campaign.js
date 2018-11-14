import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {addCampaign} from '../store'

/**
 * COMPONENT
 */
const AddCampaign = props => {
  const {userId, username, handleSubmit, onClick} = props
  function submitHandler(evt){
    handleSubmit(evt)
    onClick(evt)
  }
  return (
    <form onSubmit={submitHandler}>
      <div className="campaigns-form-name">
        <label className="campaigns-form-name-title">
          Campaign Name:
        </label>
        <input className="campaigns-form-name-input" type="text" name="campaignName" />
      </div>
      <input type="hidden" name="username" value={username} />
      <input type="hidden" name="userid" value={userId} />
      <div className="campaigns-form-description">
        <label className="campaigns-form-description-title">
          Campaign Description:
        </label>
        <textarea className="campaigns-form-description-input" type="text" name="campaignDescription" />
      </div>
      <div className="campaigns-form-submit">
        <input id="submit" type="submit" value="Submit" />
      </div>
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
    handleSubmit(evt) {
      evt.preventDefault()
      const {username, userid, campaignName, campaignDescription} = evt.target
      dispatch(
        addCampaign(
          username.value,
          userid.value,
          campaignName.value,
          campaignDescription.value
        )
      )
    }
  }
}

export default connect(mapState, mapDispatch)(AddCampaign)

/**
 * PROP TYPES
 */
AddCampaign.propTypes = {
  username: PropTypes.string
}
