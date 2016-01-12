import React, { Component } from 'react'
import { Navbar } from './Navbar'
import { connect } from 'react-redux'
import { firebaseRef } from '../config'
import { loginSuccess, loggedOut, questionsUpdated } from '../actions'
import { pushPath } from 'redux-simple-router'

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
        dispatch(loginSuccess(data))
        firebaseRef
          .child('questions')
          .orderByChild('author')
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
      }
    } else {
      dispatch(pushPath('/login'))
    }
  }

  render() {
    if (this.props.auth.loading) {
      return <i className="fa fa-fw fa-spinner fa-spin"></i>
    }
    return (
      <div>
        <Navbar />
        { React.cloneElement(this.props.children, {user: this.props.auth.user}) }
      </div>
    )
  }
}

export const App = connect(state => state)(AppComponent)
