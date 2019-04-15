import React, { Component } from 'react'
import { Input, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import UserContext from '../../contexts/UserContext'
import Button from '../Button/Button'

// CSS styles are in RegistrationForm.css

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  }

  static contextType = UserContext

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { username, password } = ev.target

    this.setState({ error: null })

    AuthApiService.postLogin({
      username: username.value,
      password: password.value,
    })
      .then(res => {
        username.value = ''
        password.value = ''
        this.context.processLogin(res.authToken)
        this.props.onLoginSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state
    return (
      <form
        className='user-form'
        onSubmit={this.handleSubmit}
      >
        {error && <div role='alert' className="main-form-error">
          <p>{error}</p>
        </div>}
        <div className="user-form-input-container">
          <Label htmlFor='login-username-input'>
            Username
          </Label>
          <Input
            className="user-form-input"
            ref={this.firstInput}
            id='login-username-input'
            name='username'
            required
          />
        </div>
        <div className="user-form-input-container">
          <Label htmlFor='login-password-input'>
            Password
          </Label>
          <Input
            className="user-form-input"
            id='login-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button className="blue-button user-form-button" type='submit'>
          Login
        </Button>
      </form>
    )
  }
}

export default LoginForm
