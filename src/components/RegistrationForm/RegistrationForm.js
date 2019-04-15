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
    return (
      <form className="registration-form"
        onSubmit={this.handleSubmit}
      >
     
        <div role='alert'>
          {error && <p>{error}</p>}
        </div>
        <div className="registration-form-input-container">
          <Label htmlFor='registration-name-input'>
            Name<Required />
          </Label>
          <Input className="registration-form-input"
            ref={this.firstInput}
            id='registration-name-input'
            name='name'
            required
          />
        </div>
        <div className={"registration-form-input-container" + (error && error.toLowerCase().contains('username') ? ' form-error' : '')}>
          <Label htmlFor='registration-username-input'>
            Username<Required />
          </Label>
          <Input className="registration-form-input"
            id='registration-username-input'
            name='username'
            required
          />
        </div>
        <div className="registration-form-input-container">
          <Label htmlFor='registration-password-input'>
            Password<Required />
          </Label>
          <Input className="registration-form-input-last"
            id='registration-password-input'
            name='password'
            type='password'
            required
          />
        </div>
        <Button className="blue-button registration-form-button" type='submit'>
          Sign up
        </Button>
      </form>
    )
  }
}

export default RegistrationForm
