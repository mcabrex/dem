import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../../store'

const NavbarLoggedIn = ({handleClick}) => {
  return (
    <div className="navbar-items">
    {/* The navbar will show these links after you log in */}
      <div className="navbar-items-div">
        <Link to="/home" className="navbar-items-link">Home</Link>
      </div>
      <div className="navbar-items-div">
        <Link to="/campaigns" className="navbar-items-link">Campaigns</Link>
      </div>
      <div className="navbar-items-div">
        <Link to="/ability-score" className="navbar-items-link">Ability Score</Link>
      </div>
      <div className="navbar-items-div">
        <Link to="/skills" className="navbar-items-link">Skills</Link>
      </div>
      <div className="navbar-items-div">
        <Link to="/classes" className="navbar-items-link">Classes</Link>
      </div>
      <div className="navbar-items-div">
        <a href="#" onClick={handleClick} className="navbar-items-link">Logout</a>
      </div>
    </div>
  )
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(NavbarLoggedIn)

NavbarLoggedIn.propTypes = {
  handleClick: PropTypes.func.isRequired,
}
