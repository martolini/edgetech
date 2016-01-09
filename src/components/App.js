import React, { Component } from 'react'
import { Navbar } from './Navbar'
import { connect } from 'react-redux'
import Parse from 'parse'
import { pushPath } from 'redux-simple-router'

function redirectIfNotAuthenticated(dispatch) {
  if (!Parse.User.current()) {
    dispatch(pushPath('/login'))
  }
}

export class AppComponent extends Component {

  componentWillMount() {
    redirectIfNotAuthenticated(this.props.dispatch)
  }

  componentWillUpdate(nextProps, nextState) {
    redirectIfNotAuthenticated(nextProps.dispatch)
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="container">
          { this.props.children }
        </div>
      </div>
    )
  }
}

export const App = connect(state => state)(AppComponent)
