import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getCurrentSpell} from '../../store'

/**
 * COMPONENT
 */
export class dndSpell extends Component {
  componentDidMount() {
    // this.props.dispatch(getCurrentSpell(evt.target.innerHTML))
    const spell = this.props.location.pathname.split('/spells/')[1]
    this.props.dispatch(getCurrentSpell(spell))
  }

  render() {
    const {currentSpell} = this.props

    if (
      currentSpell.name !== this.props.location.pathname.split('/spells/')[1]
    ) {
      return <div className="loading">Rolling the dice...</div>
    }
    console.log('current', currentSpell.desc.split('*'))
    const descriptionBuilder = () => {
      let spellArr = currentSpell.desc.split('*')
      let isTitle = false
      return (
        <div>
          {spellArr.map((line, ind) => {
            if (ind > 0 && spellArr[ind - 1].length < 1 && !isTitle) {
              //if its not the first line, and the line before it is blank, and isTitle is false
              isTitle = true
              return (
                <div key={ind++} className="dndClass-section-title-sub">
                  {line}
                </div>
              )
            }
            if (line.length > 1) {
              //otherwise check if it's an actual line
              isTitle = false
              return (
                <div key={ind++} className="dndClass-section-description">
                  {line}
                </div>
              )
            }
          })}
        </div>
      )
    }
    return (
      <div className="dndClass">
        <h1 className="dndClass-header-name">{currentSpell.name}</h1>
        <h2 className="dndClass-header-title">{`${currentSpell.level} ${
          currentSpell.school
        }`}</h2>
        <p className="dndClass-section-title-sub">Casting Time:</p>
        <p className="dndClass-section-description">
          {currentSpell.casting_time}
        </p>
        <p className="dndClass-section-title-sub">Range:</p>
        <p className="dndClass-section-description">{currentSpell.range}</p>
        <p className="dndClass-section-title-sub">Components:</p>
        <p className="dndClass-section-description">{`${
          currentSpell.components
        } (${currentSpell.material})`}</p>
        <p className="dndClass-section-title-sub">Duration:</p>
        <p className="dndClass-section-description">{currentSpell.duration}</p>
        <p className="dndClass-section-title-sub">Description:</p>
        {currentSpell === undefined ? null : descriptionBuilder()}
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
    currentSpell: state.spells.currentSpell
  }
}

export default connect(mapState)(dndSpell)

/**
 * PROP TYPES
 //  */
dndSpell.propTypes = {
  //   fetchClasses: PropTypes.func
}
