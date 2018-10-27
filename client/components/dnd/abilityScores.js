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
      return <div className="loading">Rolling the dice...</div>;
    }

    const dndInfoDivs = (abilityScores) => {
        console.log('input',abilityScores)
        if(!abilityScores) return (<div>Not Available</div>)
        return (
          abilityScores.map(ability => (
            <div key={ability.name}>
              <div className="ability-score">
              <div className="ability-score-name">{ability.name}</div>
                <div className="ability-score-full-name">{ability.full_name}</div>
                <ul className="ability-score-descriptions">
                  {ability.desc.map((description,ind) => (
                    <li key={`${ind*1}description`} className="ability-score-description">{description}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        )
      }

    return (
        <div className="ability">
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
