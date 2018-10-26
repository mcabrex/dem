import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {logout} from '../../store'
import NavbarLoggedIn from './navbar-logged-in'
import NavbarLoggedOut from './navbar-logged-out'

const diceRoll = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
const d20 = diceRoll(1,21);

const Navbar = ({isLoggedIn, username}) => {
  return (
  <div className="navbar">
    <div className="navbar-logo">{d20}</div>
    <h1 className="navbar-title">Dungeon Master</h1>
    {isLoggedIn ? (<div className="navbar-username">{username}</div>) : null}
    <div>
      {isLoggedIn ? <NavbarLoggedIn /> : <NavbarLoggedOut />}
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
  isLoggedIn: PropTypes.bool.isRequired
}
