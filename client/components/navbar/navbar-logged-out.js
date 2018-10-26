import React from 'react'
import {Link} from 'react-router-dom'

const NavbarLoggedOut = () => {
  return (
    <div className="navbar-items">
      {/* The navbar will show these links before you log in */}
      <div className="navbar-items-div">
        <Link to="/login" className="navbar-items-link">Login</Link>
      </div>
      <div className="navbar-items-div">
        <Link to="/signup" className="navbar-items-link">Sign Up</Link>
      </div>
    </div>
  )
}

export default NavbarLoggedOut;
