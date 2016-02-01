import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { askQuestion } from '../actions'
import { RecentQuestions } from './RecentQuestions'


class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {}
    }
    const { dispatch } = this.props
    this.firebaseRef = firebaseRef.child(`/users/${this.props.params.id}`)
    this.connectWith = this.connectWith.bind(this)
  }

  componentDidMount() {
    this.firebaseRef.on('value', snapshot => {
      if (snapshot.exists()) {
        let user = snapshot.val()
        console.log('user' + user.username)
        this.setState({
          profile: user
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
        id: this.props.params.id,
        username: this.state.profile.username,
        connected: false
      }
    }
    dispatch(askQuestion(question))

  }

  render() {
    let connectWithProfile =  (
      <div>
        <h4>Connect with {this.state.profile.username}:</h4>
        <div className="form-group">
          <label className="" htmlFor="select">Course:</label>
          <select className="form-control" id="select" ref={ref => this.syntax = ref}>
            { CATEGORIES.map(category => <option key={category.id} value={category.id}>{ category.name }</option> )}
          </select>
        </div>
        <div className="button-group">
          <button type="submit" onClick={this.connectWith} className="btn btn-lg btn-success">
            Connect
          </button>
        </div>
      </div>
      )             
    return (
      <div>
        <br/>
        <br/>
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <h2>{this.state.profile.username}</h2>
              <h4 className="">Your 5 most recent questions</h4>
              <RecentQuestions userId={this.props.user.id}/>            
              {this.props.user.id === this.props.params.id ? null : connectWithProfile}
            </div>
          </div>
      </div>
    )
  }
}

export const Profile = connect()(ProfileComponent)
