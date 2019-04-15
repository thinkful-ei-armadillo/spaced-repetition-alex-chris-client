import React, { Component } from 'react'
import { Input, Required, Label } from '../Form/Form'
import AuthApiService from '../../services/auth-api-service'
import Button from '../Button/Button'
import './RegistrationForm.css'

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  }

  state = { error: null }

  firstInput = React.createRef()

  handleSubmit = ev => {
    ev.preventDefault()
    const { name, username, password } = ev.target
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(user => {
        name.value = ''
        username.value = ''
        password.value = ''
        this.props.onRegistrationSuccess()
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
  }

  componentDidMount() {
    this.firstInput.current.focus()
  }

  render() {
    const { error } = this.state;
    const usernameError = error && error.toLowerCase().includes('username');
    const passwordError = error && error.toLowerCase().includes('password');
    return (
      <form className="user-form"
        onSubmit={this.handleSubmit}
      >
        {error && <div role='alert' className="main-form-error">
          <p>{error}</p>
        </div>}
        <div className="user-form-input-container">
          <Label htmlFor='registration-name-input'>
            Name<Required />
          </Label>
          <Input className="user-form-input"
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div className="user-form-input-container">
          <Label htmlFor='registration-username-input'>
            Username<Required />
          </Label>
          <Input className={"user-form-input" + (usernameError ? ' form-error' : '')}
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div className="user-form-input-container">
          <Label htmlFor='registration-password-input'>
            Password<Required />
          </Label>
          <Input className={"user-form-input-last" + (passwordError ? ' form-error' : '')}
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button className="blue-button user-form-button" type='submit'>
          Sign up
        </Button>
      </form>
    )
  }
}

export default RegistrationForm
