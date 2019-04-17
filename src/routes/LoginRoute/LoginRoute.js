import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'

//CSS styles are in RegistrationForm.css

class LoginRoute extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => { },
    },
  }

  handleLoginSuccess = () => {
    const { location, history } = this.props
    const destination = (location.state || {}).from || '/'
    history.push(destination)
  }

  render() {
    return (
      <section className="user-form-container">
        <div className="user-form-full">
          <h2 className="user-form-header">Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
      </section>
    );
  }
}

export default LoginRoute
