import React, { Component } from 'react'
import { Navbar } from './Navbar'
import { connect } from 'react-redux'
import { firebaseRef } from '../config'
import { loginSuccess, loggedOut, questionsUpdated, userUpdated, logout } from '../actions'
import { pushPath } from 'redux-simple-router'
require('../css/App.css')
require('../css/Learningroom.css')

export class AppComponent extends Component {

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
    if (data) {
      if (!this.props.auth.user) {
        firebaseRef
          .child('questions')
          .orderByChild('author/id')
          .equalTo(data.uid)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              let questions = []
              snapshot.forEach(question => {
                questions.push(Object.assign({}, question.val(), {id: question.key()}))
              })
              dispatch(questionsUpdated(questions))
            }
          })
        firebaseRef
          .child('users')
          .child(data.uid)
          .on('value', snapshot => {
            if (snapshot.exists()) {
              dispatch(userUpdated(Object.assign({}, snapshot.val(), { id: snapshot.key() })))
            } else {
              dispatch(logout())
              dispatch(pushPath('/'))
            }
          })
      }
    } else {
      // dispatch(pushPath('/login'))
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
