import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {name, displayName, handleSubmit, error} = props
  console.log(error)
  const formInputDiv = input => {
    const displayInput = input.charAt(0).toUpperCase() + input.slice(1)
    if(name === 'login' && input === 'username') return 
    else return (
      <div className="form-input">
        <div>
          <label htmlFor={input} className="form-input-title">
            <small>{displayInput}</small>
          </label>
        </div>
        <div>
          <input className="form-input-box" name={input} type={input === 'password' ? "password" : "text"}/>
        </div>
      </div>
    )
  }
  return (
    <div className="form">
      <h1 className="form-title">Welcome to Dungeon Master</h1>
      <h2 className="form-description">A toolkit for DMs</h2>
      <form onSubmit={handleSubmit} name={name} className="form-inputs">
        {formInputDiv('username')}
        {formInputDiv('email')}
        {formInputDiv('password')}
        <div className="form-submit">
          <button type="submit" className="form-submit-button">{displayName}</button>
        </div>
      </form>
      {error && error.response && <div className="form-error"> {error.response.data} </div>}
      {/* <a href="/auth/google">{displayName} with Google</a> */}
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      console.log(evt.target.password.value)
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username ? evt.target.username.value : null
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(username, email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
