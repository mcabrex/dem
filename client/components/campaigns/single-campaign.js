import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {myCampaign} from '../../store'
import DeleteCampaignDiv from './delete-campaign'
/**
 * COMPONENT
 */
export class SingleCampaign extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campaignClicked: false
    }
    this.clickDeleteCampaign = this.clickDeleteCampaign.bind(this)
    this.tester = this.tester.bind(this)
  }

  componentDidMount() {
    this.props.loadCampaign(this.props.match.params.campaignId)
  }

  clickDeleteCampaign(evt) {
    let currentCampaignClicked = this.state.campaignClicked
    this.setState({campaignClicked: !currentCampaignClicked})
  }

  tester(){
    console.log('mic check?')
  }

  render() {
    const campaigns = this.props.campaigns
    if (!campaigns.length) {
      return <div className="loading">Rolling the dice...</div>
    }

    //update component when redux store gets updated
    return (
      <div>
        <div className="campaigns-add" id="add">
          +Add Campaign
        </div>
        <div onClick={this.clickDeleteCampaign} className="campaigns-add">
          -Delete Campaign
        </div>
        <div
          className={
            this.state.campaignClicked
              ? 'campaigns-form-clicked'
              : 'campaigns-form-unclicked'
          }
        >
          {/* anything in this div is now a popup onclick */}
          <DeleteCampaignDiv onClick={this.clickDeleteCampaign}/>
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
  return {
    userId: state.user.id,
    campaigns: state.campaigns
  }
}

const mapDispatch = dispatch => {
  return {
    loadCampaign(campaignId) {
      dispatch(myCampaign(campaignId))
    },
  }
}

export default connect(mapState, mapDispatch)(SingleCampaign)

/**
 * PROP TYPES
 */
SingleCampaign.propTypes = {
  username: PropTypes.string
}
