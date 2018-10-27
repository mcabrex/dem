import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAbilityScores} from '../../store'
/**
 * COMPONENT
 */
export class abilityScores extends Component {
  componentDidMount(){
    this.props.dispatch(getAbilityScores());
  }
  render(){
    const { error, loading, abilityScoresInfo } = this.props;   
    console.log('props',this.props) 
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const dndInfoDivs = (abilityScores) => {
        console.log('input',abilityScores)
        if(!abilityScores) return (<div>Not Available</div>)
        return (
            abilityScores.map(ability => (
            <div key={ability.name}>
              {ability.name}
            </div>
          ))
        )
      }

    return (
        <div>
        {
            dndInfoDivs(abilityScoresInfo)
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
    abilityScoresInfo: state.abilityScores.items,
    loading: state.abilityScores.loading,
    error: state.abilityScores.error
  }
}

export default connect(mapState)(abilityScores)

/**
 * PROP TYPES
//  */
abilityScores.propTypes = {
  fetchClasses: PropTypes.func
}
