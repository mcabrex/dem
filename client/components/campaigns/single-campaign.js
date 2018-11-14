import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {myCampaign} from '../../store'
import AddCampaign from './add-campaign'
/**
 * COMPONENT
 */
export class SingleCampaign extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaignClicked: false
    }
    this.clickAddCampaign = this.clickAddCampaign.bind(this)
  }

  componentDidMount() {
    this.props.loadCampaign(this.props.match.params.campaignId)
  }

  clickAddCampaign(evt) {
    let currentCampaignClicked = this.state.campaignClicked
    this.setState({campaignClicked: !currentCampaignClicked})
  }

  render() {
    const campaigns = this.props.campaigns
    console.log('campaigns',campaigns)
    const campaignBuilder = () => {
      return campaigns.map(campaign => {
        return (
          <Link to={`/campaigns/${campaign.id}`} key={campaign.id}>
            <div className="campaigns-item">
              <div className="campaigns-item-title">{campaign.title}</div>
              <div className="campaigns-item-description">
                {campaign.description}
              </div>
            </div>
          </Link>
        )
      })
    }

    if (!campaigns.length) {
      return <div className="loading">Rolling the dice...</div>
    }

    //update component when redux store gets updated
    return (
      <div>
        <div className="campaigns-add" id="add" onClick={this.clickAddCampaign}>
          +Add Campaign
        </div>
        <div
          id="form"
          className={
            this.state.campaignClicked
              ? 'campaigns-form-clicked'
              : 'campaigns-form-unclicked'
          }
        >
          {this.state.campaignClicked ? <AddCampaign onClick={this.clickAddCampaign}/> : null}
        </div>
        <div>{campaigns[0].title}</div>
        <div>{campaigns[0].description}</div>
        <div>Characters</div>
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
    loadCampaign(campaignId) {
      dispatch(myCampaign(campaignId))
    }
  }
}

export default connect(mapState, mapDispatch)(SingleCampaign)

/**
 * PROP TYPES
 */
SingleCampaign.propTypes = {
  username: PropTypes.string
}
