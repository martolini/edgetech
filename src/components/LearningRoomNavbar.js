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
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link to='/app' className="navbar-brand"><b>Edgetech</b></Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
            <ul className="nav navbar-nav navbar-right">
              <li>
                <a href="#" onClick={this.handleLogout.bind(this)}>{ this.props.user.email }</a>
              </li>               
              <li>
                <a href="#" onClick={this.handleLogout.bind(this)}>87,-</a>
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
