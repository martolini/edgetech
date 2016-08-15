import React, { Component } from 'react'
import { Navbar } from './Navbar'
import { connect } from 'react-redux'
import { firebaseRef } from '../config'
import { loggedOut, questionsUpdated, userUpdated, logout } from '../actions'
import { pushPath } from 'redux-simple-router'
require('../css/App.css')

export class AppComponent extends Component {

  constructor(props) {
    super(props)
    this.onAuth = this.onAuth.bind(this)
  }

  componentDidMount() {
    firebaseRef.auth().onAuthStateChanged(this.onAuth)
  }

  componentWillUnmount() {
    firebaseRef.auth().onAuthStateChanged(this.onAuth)

  }

  onAuth(data) {
    const { dispatch } = this.props
    if (data) {
      if (!this.props.auth.user) {

        let ref = firebaseRef.database().ref(`users/${data.uid}`)
        ref.on('value', snapshot => {
          // checks if the user is registered on the current organization path
          if (snapshot.exists() && (snapshot.val().organization.page == location.pathname.split('/')[1])) {
            dispatch(userUpdated(Object.assign({}, snapshot.val(), { id: snapshot.key })))
          } else {
            dispatch(logout())
            dispatch(pushPath('/'))
          }
        })
      }
    } else {
      document.location = '/'
    }
  }

  render() {
    if (this.props.auth.loading || !this.props.auth.user) {
      return <i className="fa fa-fw fa-spinner fa-spin"></i>
    }
    return (
      <div>
        { this.props.routing.path.indexOf('question/') === -1 ? <Navbar /> : null }
        { React.cloneElement(this.props.children, {user: this.props.auth.user}) }
      </div>
    )
  }
}

export const App = connect(state => state)(AppComponent)
