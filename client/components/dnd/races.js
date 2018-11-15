import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getRaces} from '../../store'
import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class Races extends Component {
  componentDidMount(){
    this.props.dispatch(getRaces());
  }
  render(){
    const { error, loading, races } = this.props;    

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>;
    }

    return (
        <div className="classes">
          {
            races.map( dndRace => (
              <div key={dndRace.name} className="classes-name">
                <Link 
                  to={'/races/' + dndRace.name} 
                  className="classes-name-link">
                  {dndRace.name}
                </Link>
              </div>
            ))
          }
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    races: state.races.items,
    loading: state.races.loading,
    error: state.races.error
  }
}

export default connect(mapState)(Races)

/**
 * PROP TYPES
//  */
Races.propTypes = {
  fetchClasses: PropTypes.func
}
