import React, { Component } from 'react'
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm'
import { Link } from 'react-router-dom'

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = () => {
    const { history } = this.props
    history.push('/login')
  }

  render() {
    return (
      <section className="user-form-container">
        <div className="user-form-top">
          <h2 className="user-form-header">Sign up</h2>
          <p className="user-form-subtitle">
            Practice learning a language with the spaced reptition revision technique.
          </p>
          <RegistrationForm
            onRegistrationSuccess={this.handleRegistrationSuccess}
          />
        </div>
        <footer className="user-form-bottom">
          <Link className="sign-in-link" to='/login'>Already have an account?</Link>
        </footer>
      </section>
    );
  }
}

export default RegistrationRoute
