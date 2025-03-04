import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillEye, AiFillEyeInvisible} from 'react-icons/ai'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
    isPasswordVisible: false,
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMessage => {
    this.setState({errorMsg: errorMessage, showSubmitError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onClickShow = () => {
    this.setState({
      isPasswordVisible: true,
    })
  }

  onClickHide = () => {
    this.setState({
      isPasswordVisible: false,
    })
  }

  renderPasswordField = () => {
    const {password, isPasswordVisible} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <div className="password-container">
          <input
            type={isPasswordVisible ? 'text' : 'password'}
            id="password"
            className="password-input-field"
            value={password}
            onChange={this.onChangePassword}
            placeholder="Password"
          />
          {isPasswordVisible ? (
            <button
              type="button"
              className="eye-button"
              onClick={this.onClickHide}
              aria-label="Hide password"
            >
              <AiFillEyeInvisible className="eye" />
            </button>
          ) : (
            <button
              type="button"
              className="eye-button"
              onClick={this.onClickShow}
              aria-label="Show password"
            >
              <AiFillEye className="eye" />
            </button>
          )}
        </div>
      </>
    )
  }

  renderUsernameField = () => {
    const {username} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <div className="login-form-container">
          <div className="small-device-logo-container">
            <img
              className="small-device-logo radius-image"
              src="https://res.cloudinary.com/de8cab9qa/image/upload/v1720497809/Rajh%20Rajesh/Rectangle_1456_puqgrk.jpg"
              alt="website login"
            />
          </div>
          <form className="form-container" onSubmit={this.submitForm}>
            <img
              className="large-device-logo"
              src="https://res.cloudinary.com/de8cab9qa/image/upload/v1720496881/Rajh%20Rajesh/Tasty_Kitchen_Logo_wohdfa.jpg"
              alt="website logo"
            />
            <h1 className="login-heading-restaurants-name">Tasty Kitchens</h1>

            <h1 className="login-text">Login</h1>
            <div className="input-container">{this.renderUsernameField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <button type="submit" className="login-button">
              Login
            </button>
            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </form>
        </div>

        <div className="image-container">
          <img
            className="welcome-image"
            src="https://res.cloudinary.com/de8cab9qa/image/upload/v1720493604/Rajh%20RAjedh/Rectangle_1456_1x_os4xho.png"
            alt="web"
          />
        </div>
      </div>
    )
  }
}

export default Login
