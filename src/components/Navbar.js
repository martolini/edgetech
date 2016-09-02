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
            <Link to={`/${this.props.user.organization.path}/ask`} >
              <img src="https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/logo-main.svg?alt=media&token=e01c0cf0-4918-4384-9f0a-fc81a318c760" className="navbar-brand"/>
            </Link>
          </div>
          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav navbar-left">
              <li id="get-help-link">
                <Link to={`/${this.props.user.organization.path}/ask`}>Get Help</Link>
              </li>
              <li id="give-help-link">
                <Link to={`/${this.props.user.organization.path}/help`}>Give Help</Link>
              </li>
              { this.props.user.admin ? admin : null }
            </ul>
            <p className="navbar-orgname">
              <img className="navbar-orgimg" src="https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/orgs%2Fntnu-logo.png?alt=media&token=7d95ab6d-0160-4683-85d1-b6eff6f4666c" />
            </p>
            <ul className="nav navbar-nav navbar-right">
              <li id="profile-link">
                <Link to={`/${this.props.user.organization.path}/user/${this.props.user.username}`}>{ this.props.user.username } <span className="label label-success">{this.props.user.karma}</span></Link>
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
