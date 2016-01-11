import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef } from '../config'
import { loginWithFacebook } from '../actions'


class LoginContainerComponent extends Component {
  constructor(props) {
    super(props)
    this.onAuth = this.onAuth.bind(this)
  }

  componentDidMount() {
    firebaseRef.onAuth(this.onAuth)
  }

  componentWillUnmount() {
    firebaseRef.offAuth(this.onAuth)
  }

  onAuth(data) {
    const { dispatch } = this.props
    if (!!data) {
      dispatch(pushPath('/app'))
    }
  }

  loginWithFacebook(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(loginWithFacebook())
  }

  render() {
    return React.cloneElement(this.props.children, {loginWithFacebook: this.loginWithFacebook.bind(this)})
  }
}

export const LoginContainer = connect()(LoginContainerComponent)
