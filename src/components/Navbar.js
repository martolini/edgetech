import React, { Component } from 'react'
import { Link } from 'react-router'
import { logout } from '../actions'
import { connect } from 'react-redux'

class NavbarComponent extends Component {

  handleLogout(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(logout())
  }

  render() {
    let admin = (
      <li>
        <Link to="/admin">Admin</Link>
      </li>
      )
    return (
      <nav className="navbar navbar-inverse general-nav">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to={`/${this.props.user.organization.page}/ask`} className="navbar-brand logo-font">Thx bro!</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav navbar-left">
              <li id="get-help-link">
                <Link to={`/${this.props.user.organization.page}/ask`}>Get Help</Link>
              </li>
              <li id="give-help-link">
                <Link to={`/${this.props.user.organization.page}/help`}>Give Help</Link>
              </li>
              { this.props.user.admin ? admin : null }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li id="profile-link">
                <Link to={`/${this.props.user.organization.page}/user/${this.props.user.username}`}>{ this.props.user.username } <span className="label label-success">{this.props.user.karma}</span></Link>
              </li>
              <li id="about-link">
                <Link to="/about">About us</Link>
              </li>
              <li>
                <a href="#" onClick={this.handleLogout.bind(this)}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export const Navbar = connect(state => state.auth)(NavbarComponent)
