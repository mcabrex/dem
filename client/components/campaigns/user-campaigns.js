import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {myCampaigns} from '../../store'
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

  clickAddCampaign(evt) {
    let currentCampaignClicked = this.state.campaignClicked
    this.setState({campaignClicked: !currentCampaignClicked})
  }

  render() {
    const {error,campaigns} = this.props
    console.log('props',this.props)
    const campaignBuilder = () => {
      return campaigns.map(campaign => {
        return (
          <Link
            to={`/campaigns/${campaign.id}`}
            className="campaigns-item"
            id={campaign.id}
            key={campaign.id}
          >
            <div className="campaigns-item-title">{campaign.title}</div>
            <div className="campaigns-item-description">
              {campaign.description}
            </div>
          </Link>
        )
      })
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
          {this.state.campaignClicked ? (
            <AddCampaign onClick={this.clickAddCampaign} />
          ) : null}
        </div>
        {error && error.response && <div className="form-error"> {error.response.data.slice(17)} </div>}
        <div className="campaigns-container">{ campaigns && campaigns.length > 0 ? campaignBuilder() : null}</div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state',state)
  return {
    userId: state.user.id,
    campaigns: state.campaigns.campaignList,
    error: state.campaigns.error
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
