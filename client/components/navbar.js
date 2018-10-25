import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">

    <img className="navbar-logo" src="https://vectr.com/mcabrex/gc2T4Hdhl.svg?width=240&height=280&select=f1lrSn9KLc,a2dOpqnnuk,a3yGYAR8Ao,d7iT4O7kM1,iAyVXfqM2&source=selection" />
    <h1 className="navbar-title">Dungeon Master</h1>
    <div className="navbar-login">
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div >
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="navbar-login-button">Login</Link>{' '}
          <Link to="/signup" className="navbar-login-button">Sign Up</Link>
        </div>
      )}
    </div>
  </div>
)

/**
 * CONTAINER
 */
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

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
