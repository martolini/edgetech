import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { askQuestion } from '../actions'
import { RecentQuestions } from './RecentQuestions'
import { Link } from 'react-router'


class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    }
    const { dispatch } = this.props
    this.connectWith = this.connectWith.bind(this)
    this.firebaseRef = firebaseRef.child('users/').orderByChild('username').equalTo(this.props.params.username)
  }

  componentDidMount() {
    this.firebaseRef.once('value', snapshot => {

      if (snapshot.exists()) {
        snapshot.forEach(snap => {
          let user = snap.val()
          this.setState({
            profile: user
          })
        })
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    this.firebaseRef = firebaseRef.child('users/').orderByChild('username').equalTo(nextProps.params.username)
    this.firebaseRef.once('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(snap => {
          let user = snap.val()
          this.setState({
            profile: user
          })
        })
      }
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  connectWith(e) {
    e.preventDefault()
    
    const { dispatch } = this.props
    let question = {
      text: 'Waiting to connect with ' + this.state.profile.username,
      category: this.syntax.value,
      author: {
        id: this.props.user.id,
        username: this.props.user.username,
        connected: true
      },
      tutor: {
        id: this.state.profile.id,
        username: this.state.profile.username,
        email: this.state.profile.email,
        connected: false
      }
    }
    dispatch(askQuestion(question))

  }

  render() {
    let connectWithProfile =  (
      <div>
        <h5>Connect with {this.state.profile.username}:</h5>
        <div className="form-group">
          <label className="" htmlFor="select">Course:</label>
          <select className="form-control" id="select" ref={ref => this.syntax = ref}>
            { CATEGORIES.map(category => <option key={category.id} value={category.id}>{ category.id }</option> )}
          </select>
        </div>
        <div className="button-group">
          <button type="submit" onClick={this.connectWith} className="btn btn-lg btn-success">
            Connect
          </button>
        </div>
      </div>
      )
    let recentQuestions = (
      <div>
        <RecentQuestions userId={this.props.user.id}/> 
      </div>
      )             
    return (
      <div>
        <br/>
        <br/>
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <h2>{this.state.profile.username}</h2> 
              <h5>Teaching karma: <span className="label label-success">{this.state.profile.karma} points</span></h5>                 
              <hr/>
              {this.props.user.username === this.props.params.username ? recentQuestions : connectWithProfile}
            </div>
          </div>
      </div>
    )
  }
}

export const Profile = connect()(ProfileComponent)
