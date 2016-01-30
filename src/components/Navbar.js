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
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="ask">Get Help</Link>
              </li>
              <li>
                <Link to="/help">Give Help</Link>
              </li>
            </ul>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#">{ this.props.user.username } ( {this.props.user.karma} )</a>
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
