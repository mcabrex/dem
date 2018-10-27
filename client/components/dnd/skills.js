import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getSkills, searchSkills, searchedSkill} from '../../store'
/**
 * COMPONENT
 */
export class skills extends Component {
  componentDidMount(){
    const url = this.props.location.search;
    const dndSkillName = url.slice(3,url.length)
    console.log('url',dndSkillName)
    dndSkillName.length ? this.props.dispatch(searchedSkill(dndSkillName)) : this.props.dispatch(getSkills())
  }
  componentDidUpdate(){

  }
  render() {
    const {error, loading, skillsInfo} = this.props
    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <div className="loading">Rolling the dice...</div>
    }

    const dndInfoDivs = skillList => {
      if (!skillList) return <div>Not Available</div>
      return skillList.map(ability => (
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
              onChange={input => this.props.dispatch(searchSkills(input))}
              className="ability-search-query"
            />
          </form>
        </div>
        {dndInfoDivs(skillsInfo)}
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    skillsInfo: state.skills.items,
    loading: state.skills.loading,
    error: state.skills.error
  }
}

export default connect(mapState)(skills)

/**
 * PROP TYPES
 //  */
skills.propTypes = {
  fetchClasses: PropTypes.func
}
