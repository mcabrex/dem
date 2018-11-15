import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSpells, searchSpells, searchSpell, searchedSpell} from '../../store'

import {Link} from 'react-router-dom'
/**
 * COMPONENT
 */
export class Spells extends Component {
  componentDidMount() {
    const url = this.props.location.search
    const dndSpellName = url.slice(3, url.length)
    dndSpellName.length
      ? this.props.dispatch(searchedSpell(dndSpellName))
      : this.props.dispatch(getSpells())
  }
  render() {
    const {error, loading, spells} = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>
    }

    return (
      <div className="dndClass">
        <h1 className="dndClass-header-title">Spells</h1>
        <form role="search" className="spells-search-form">
          <div className="spells-search-title">Search</div>
          <input
            role="search"
            onChange={input => this.props.dispatch(searchSpells(input))}
            className="spell-search-query"
          />
        </form>
        {spells.map(dndSpellList =>
          dndSpellList.map(dndSpell => (
            <div key={dndSpell.name} className="spells-name">
              <Link
                to={'/spells/' + dndSpell.name}
                className="spells-name-link"
              >
                {dndSpell.name}
              </Link>
            </div>
          ))
        )}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    spells: state.spells.items,
    loading: state.spells.loading,
    error: state.spells.error
  }
}

export default connect(mapState)(Spells)

/**
 * PROP TYPES
 //  */
Spells.propTypes = {
  fetchClasses: PropTypes.func
}
