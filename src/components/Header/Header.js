import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import TokenService from '../../services/token-service'
import UserContext from '../../contexts/UserContext'
import './Header.css'

class Header extends Component {
  static contextType = UserContext

  handleLogoutClick = () => {
    this.context.processLogout()
  }

  renderLogoutLink() {
    return (
      <div>
        <span className="header-username">
          <i className="fas fa-user"/>
          {this.context.user.name}
        </span>
        <nav className="header-navigation">
          <Link className="logout-link"
            onClick={this.handleLogoutClick}
            to='/login'>
            Logout
          </Link>
        </nav>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <nav className="header-navigation">
        <Link className="login-link" to='/login'>Login</Link>
        {' '}
        <Link className="register-link" to='/register'>Sign up</Link>
      </nav>
    )
  }

  render() {
    return (
      <header className="main-header">
        <div className="header-container" >
          <h1 className="header-title">
            <Link className="header-title-link" to='/'>
              Spaced repetition
            </Link>
          </h1>
          {TokenService.hasAuthToken()
            ? this.renderLogoutLink()
            : this.renderLoginLink()}
          </div>
      </header>
    );
  }
}

export default Header
