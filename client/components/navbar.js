import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const diceRoll = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const d20 = diceRoll(1,21);

const Navbar = ({handleClick, isLoggedIn, username}) => {
  return (
  <div className="navbar">
    <div className="navbar-logo">{d20}</div>
    <h1 className="navbar-title">Dungeon Master</h1>
    {isLoggedIn ? (<div className="navbar-username">{username}</div>) : null}
    <div>
      {isLoggedIn ? (
        <div className="navbar-items">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-items-div">
            <Link to="/home" className="navbar-items-link">Home</Link>
          </div>
          <div className="navbar-items-div">
            <Link to="/campaigns" className="navbar-items-link">Campaigns</Link>
          </div>
          <div className="navbar-items-div">
            <a href="#" onClick={handleClick} className="navbar-items-link">Logout</a>
          </div>
        </div>
      ) : (
        <div className="navbar-items">
          {/* The navbar will show these links before you log in */}
          <div className="navbar-items-div">
            <Link to="/login" className="navbar-items-link">Login</Link>
          </div>
          <div className="navbar-items-div">
            <Link to="/signup" className="navbar-items-link">Sign Up</Link>
          </div>
        </div>
      )}
    </div>
  </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    username: state.user.username,
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  username: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
