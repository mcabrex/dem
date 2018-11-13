import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {myCampaigns} from '../store'
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

  componentDidMount() {
    this.props.loadCampaigns()
  }

  clickAddCampaign() {
    let currentCampaignClicked = this.state.campaignClicked
    this.setState({campaignClicked: !currentCampaignClicked})
  }

  render() {
    const campaigns = this.props.campaigns
    const campaignBuilder = () => {
      return campaigns.map(campaign => {
        return (
          <div key={campaign.id}>
            <div>{campaign.title}</div>
            <div>{campaign.description}</div>
          </div>
        )
      })
    }

    if (!campaigns.length) {
      return <div className="loading">Rolling the dice...</div>
    }

    //update component when redux store gets updated
    return (
      <div>
        <div onClick={this.clickAddCampaign}>Add Campaign</div>
        {this.state.campaignClicked ? <AddCampaign /> : null}
        {campaignBuilder()}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state', state)
  return {
    userId: state.user.id,
    campaigns: state.campaigns
  }
}

const mapDispatch = dispatch => {
  return {
    loadCampaigns() {
      dispatch(myCampaigns())
    }
  }
}

export default connect(mapState, mapDispatch)(UserCampaigns)

/**
 * PROP TYPES
 */
UserCampaigns.propTypes = {
  username: PropTypes.string
}
