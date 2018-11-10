import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddCampaign from './add-campaign'
/**
 * COMPONENT
 */
export class UserCampaigns extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaignClicked: false
    }
    this.clickAddCampaign = this.clickAddCampaign.bind(this)
  }

  clickAddCampaign(){
    let currentCampaignClicked = this.state.campaignClicked
    this.setState({campaignClicked:!currentCampaignClicked})
  }

  render() {
    return (
      <div>
        <div onClick={this.clickAddCampaign}>Add Campaign</div>
        {this.state.campaignClicked ? <AddCampaign /> : null}
        <div className="loading">
          Under Construction - The Dwarves are on strike.
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    userId: state.user.id
  }
}

export default connect(mapState)(UserCampaigns)

/**
 * PROP TYPES
 */
UserCampaigns.propTypes = {
  username: PropTypes.string
}
