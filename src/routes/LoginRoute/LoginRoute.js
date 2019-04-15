import React, { Component } from 'react'
import LoginForm from '../../components/LoginForm/LoginForm'
import { Link } from 'react-router-dom'

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
        <div className="user-form-top">
          <h2 className="user-form-header">Login</h2>
          <LoginForm
            onLoginSuccess={this.handleLoginSuccess}
          />
        </div>
        <footer className="user-form-bottom">
          <p>Don't have an account? <Link className="sign-in-link" to='/register'>Sign Up</Link></p>
        </footer>
      </section>
    );
  }
}

export default LoginRoute
