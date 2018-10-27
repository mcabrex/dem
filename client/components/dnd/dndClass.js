import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getClass} from '../../store'
/**
 * COMPONENT
 */
export class dndClass extends Component {
  componentDidMount(){
    const url = this.props.location.pathname
    const dndClassName = url.slice(9,url.length)
    this.props.dispatch(getClass(dndClassName.toLowerCase()));
  }
  render(){
    const { error, loading, dndClassInfo } = this.props;    
    if (error) {
      return <div>Error! {error.message}</div>;
    }

    if (loading) {
      return <div>Loading...</div>;
    }

    const dndInfoDivs = (proficiencies) => {
      if(!proficiencies) return (<div>Not Available</div>)
      return (
        proficiencies.map(proficiency => (
          <div key={proficiency.name} className="dndClass-section-content">
            {proficiency.name}
          </div>
        ))
      )
    }

    const dndProficiencyChoices = (proficiencyChoices) => {
      if(!proficiencyChoices) return (<div>Not Available</div>)
      return (
        proficiencyChoices[0].from.map(proficiency => (
          <div key={proficiency.name} className="dndClass-section-content">
            {proficiency.name.slice(6,proficiency.length)}
          </div>
        ))
      )
    }

    return (
        <div className="dndClass">
          <div className="dndClass-header-name">{dndClassInfo.name}</div>
          <div className="dndClass-header-hit">Hit Die: {dndClassInfo.hit_die}</div>
          <div className="dndClass-fill"></div>
          <div className="dndClass-sections">
            <div className="dndClass-section">
              <div className="dndClass-section-title">Proficiency Skill Choices</div>
               {
                dndProficiencyChoices(dndClassInfo.proficiency_choices)
              }
            </div>
            <div className="dndClass-section">
              <div className="dndClass-section-title">Proficiencies</div>
               {
                dndInfoDivs(dndClassInfo.proficiencies)
              }
            </div>
            <div className="dndClass-section">
              <div className="dndClass-section-title">Saving Throws</div>
              {
                dndInfoDivs(dndClassInfo.saving_throws)
              }
            </div>
            <div className="dndClass-section">
              <div className="dndClass-section-title">Subclasses</div>
              {
                dndInfoDivs(dndClassInfo.subclasses)
              }
            </div>
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
