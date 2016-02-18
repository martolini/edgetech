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
            <Link to='/ask' className="navbar-brand logo-font">Thx bro!</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav navbar-left">
              <li id="get-help-link">
                <Link to="/ask">Get Help</Link>
              </li>
              <li id="give-help-link">
                <Link to="/help">Give Help</Link>
              </li>               
              { this.props.user.admin ? admin : null }
            </ul>
            <ul className="nav navbar-nav navbar-right">
              <li id="profile-link">
                <Link to={`/user/${this.props.user.username}`}>{ this.props.user.username } <span dangerouslySetInnerHTML={{__html: this.props.user.level.stars}} /></Link>
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
