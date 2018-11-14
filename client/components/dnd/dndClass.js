import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getClass} from '../../store'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class dndClass extends Component {
  componentDidMount(){
    const url = this.props.location.pathname
    const dndClassName = url.slice(9,url.length)
    this.props.dispatch(getClass(dndClassName));
  }
  render(){
    const { error, loading, dndClassInfo } = this.props;    

    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>;
    }

    const dndEquipmentOptions = dndClassInfo.equipment === undefined ? dndClassInfo.equipment : 
      dndClassInfo.equipment.slice(97,dndClassInfo.equipment.length)
        .split("").filter(letter => letter!=="*").join("")
        .split(" \n ").filter((ele,ind)=> ind > 0)
    
    console.log('props',dndEquipmentOptions)

    return (
        <div className="dndClass">
          <h1 className="dndClass-header-name">{dndClassInfo.name}</h1>
          <h2 className="dndClass-header-title">Class Features</h2>
          <div className="dndClass-section">
            <h3 className="dndClass-section-title-main">Hit Points</h3>
            <p className="dndClass-section-title-sub">Hit Dice:</p>
            <p className="dndClass-section-description">{dndClassInfo.hit_dice} per {dndClassInfo.name} level</p>
            <p className="dndClass-section-title-sub">Hit Points at 1st Level:</p>
            <p className="dndClass-section-description">{dndClassInfo.hp_at_1st_level}</p>
            <p className="dndClass-section-title-sub">Hit Points at Higher Levels:</p>
            <p className="dndClass-section-description">{dndClassInfo.hp_at_higher_levels}</p>
          </div>
          <div className="dndClass-section">
            <h3 className="dndClass-section-title-main">Proficiencies</h3>
            <p className="dndClass-section-title-sub">Armor:</p>
            <p className="dndClass-section-description">{dndClassInfo.prof_armor}</p>
            <p className="dndClass-section-title-sub">Weapons:</p>
            <p className="dndClass-section-description">{dndClassInfo.prof_weapons}</p>
            <p className="dndClass-section-title-sub">Tools:</p>
            <p className="dndClass-section-description">{dndClassInfo.prof_tools}</p>
            <p className="dndClass-section-title-sub">Saving Throws:</p>
            <p className="dndClass-section-description">{dndClassInfo.prof_saving_throws}</p>
            <p className="dndClass-section-title-sub">Skills:</p>
            <p className="dndClass-section-description">{dndClassInfo.prof_skills}</p>
          </div>
          <div className="dndClass-section">
            <h3 className="dndClass-section-title-main">Equipment</h3>
            <p className="dndClass-section-description">{dndClassInfo.equipment === undefined ? dndClassInfo.equipment : dndClassInfo.equipment.slice(0,97)}</p>
            {
              dndClassInfo.equipment === undefined ? null : 
              dndEquipmentOptions.map((option,ind) => (
                <p key={`Option:${ind++}`} className="dndClass-section-description">{option}</p>
              ))
            }
          </div>
          <div className="dndClass-section">
            <h3 className="dndClass-section-title-main">Spellcasting Ability: </h3>
            <p className="dndClass-section-description">{dndClassInfo.spellcasting_ability === undefined || dndClassInfo.spellcasting_ability.length === 0 ? "None" : dndClassInfo.spellcasting_ability}</p>
          </div>
        </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    dndClassInfo: state.dndClass.items,
    loading: state.dndClass.loading,
    error: state.dndClass.error
  }
}

export default connect(mapState)(dndClass)

/**
 * PROP TYPES
//  */
dndClass.propTypes = {
  fetchClasses: PropTypes.func
}
