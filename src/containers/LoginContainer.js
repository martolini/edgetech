import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import Parse from 'parse'

function redirectIfLoggedIn(dispatch) {
  if (!!Parse.User.current()) {
    dispatch(pushPath('/app'))
  }
}

class LoginContainerComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    redirectIfLoggedIn(this.props.dispatch)
  }

  componentWillUpdate(nextProps, nextState) {
    redirectIfLoggedIn(nextProps.dispatch)
  }

  render() {
    return this.props.children
  }
}

export const LoginContainer = connect(state => state.auth)(LoginContainerComponent)
