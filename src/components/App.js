import React, { Component } from 'react'
import { Navbar } from './Navbar'
import { connect } from 'react-redux'
import Parse from 'parse'
import { loginSuccess } from '../actions'
import { pushPath } from 'redux-simple-router'

export class AppComponent extends Component {

  constructor(props) {
    super(props)
    this.redirectIfNotAuthenticated = this.redirectIfNotAuthenticated.bind(this)
  }

  redirectIfNotAuthenticated() {
    const { dispatch } = this.props
    if (!this.props.auth.user) {
      if (!!Parse.User.current()) {
        dispatch(loginSuccess(Parse.User.current()))
      } else {
        dispatch(pushPath('/login'))
      }
    }
  }

  componentWillUpdate(nextProps, nextState) {
    this.redirectIfNotAuthenticated()
  }

  render() {
    if (this.props.auth.loading) {
      return <i className="fa fa-fw fa-spinner fa-spin"></i>
    }
    return (
      <div>
        <Navbar />
        <div className="container">
          { React.cloneElement(this.props.children, {user: this.props.auth.user}) }
        </div>
      </div>
    )
  }
}

export const App = connect(state => state)(AppComponent)
