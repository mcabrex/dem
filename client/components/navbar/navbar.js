import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getDice} from '../../store'
import NavbarLoggedIn from './navbar-logged-in'
import NavbarLoggedOut from './navbar-logged-out'

const Navbar = ({handleClick,username,dice,isLoggedIn}) => {
  return (
  <div className="navbar">
    <div className="navbar-top">
      <div className="navbar-top-logo" onClick={handleClick}/>
      <div className="navbar-top-dice">{dice ? dice : 20}</div>
    </div>
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
    dice: state.dice.dice,
    username: state.user.username,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(getDice())
    }
  }
}


export default connect(mapState,mapDispatch)(Navbar)
/**
 * PROP TYPES
 */
Navbar.propTypes = {
  username: PropTypes.string,
  isLoggedIn: PropTypes.bool.isRequired
}
