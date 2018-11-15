import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getRace} from '../../store'

/**
 * COMPONENT
 */
export class dndRace extends Component {
  componentDidMount() {
    const url = this.props.location.pathname
    const dndRaceName = url.slice(7, url.length)
    this.props.dispatch(getRace(dndRaceName))
  }
  render() {
    const {error, loading, dndRaceinfo} = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>
    }

    const raceBuilder = raceObj => {
      return Object.keys(raceObj).map(title => {
        if(title === "Name:") return null;
        if(raceObj[title].length === 0) return null;
        return (
          <div key={title}>
            <p className="dndClass-section-title-sub">{title}</p>
            <p className="dndClass-section-description">{raceObj[title].split("**").slice(2)}</p>
          </div>
        )
      })
    }

    return (
      <div className="dndClass">
        <h1 className="dndClass-header-name">{dndRaceinfo["Name:"]}</h1>
        <h2 className="dndClass-header-title">Racial Traits</h2>
        {raceBuilder(dndRaceinfo)}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    dndRaceinfo: state.dndRace.items,
    loading: state.dndRace.loading,
    error: state.dndRace.error
  }
}

export default connect(mapState)(dndRace)

/**
 * PROP TYPES
 //  */
dndRace.propTypes = {
  //   fetchClasses: PropTypes.func
}
