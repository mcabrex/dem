import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getAbilityScores, searchAbilityScores,searchedAbilityScore} from '../../store'
/**
 * COMPONENT
 */
export class abilityScores extends Component {
  componentDidMount() {
    const url = this.props.location.search;
    const searchQuery = url.slice(3,url.length)
    searchQuery.length ? this.props.dispatch(searchedAbilityScore(searchQuery)) : this.props.dispatch(getAbilityScores())
  }
  render() {
    const {error, loading, abilityScoresInfo} = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>
    }

    const dndInfoDivs = abilityScores => {
      if (!abilityScores) return <div>Not Available</div>
      return abilityScores.map(ability => (
        <div key={ability.name}>
          <div className="ability-score">
            <div className="ability-score-name">{ability.name}</div>
            <div className="ability-score-full-name">{ability.full_name}</div>
            <ul className="ability-score-descriptions">
              {ability.desc.map((description, ind) => (
                <li
                  key={`${ind * 1}description`}
                  className="ability-score-description"
                >
                  {description}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))
    }

    return (
      <div className="ability">
        <div className="ability-search">
          <form role="search" className="ability-search-form">
            <div className="ability-search-title">Search</div>
            <input
              role="search"
              onChange={input => this.props.dispatch(searchAbilityScores(input))}
              className="ability-search-query"
            />
          </form>
        </div>
        {dndInfoDivs(abilityScoresInfo)}
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
