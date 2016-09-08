import React, { Component } from 'react'
import { Link } from 'react-router'
import { firebaseRef } from '../config'


export class WaitForVideo extends Component {

  constructor(props) {
    super(props)
    this.requestTutor = this.requestTutor.bind(this)
  }

  requestTutor(){
    // Set tutor object to connected = false
    let tutorRef = firebaseRef.database().ref(`organizations/${this.props.user.organization.id}/questions/${this.props.parent.state.question.id}/tutor`)

    tutorRef.set({
      connected: false,
      id: null,
      oldKarma: null,
      username: null
    })

  }

  render() {
    let isActive = (
      <div className="panel panel-default waiting-box">
        <div className="panel-body">
          <div className="text-center">
            <i className="fa fa-5x fa-refresh fa-spin text-center"></i>
          </div>
          <h3>Notifying helpers...</h3>
          <h6 className="WHITE-TEXT">It might take some minutes before someone comes to your rescue so hang tight! We'll give you a ping when someone arrives :)</h6>
        </div>
      </div>
    )

    let tutorLeft = (
      <div className="waiting-box">
        <div className="waiting-box-container">
          <h5 className="WHITE-TEXT">Tutor has left this question</h5>
          <button className="btn btn-success" onClick={this.requestTutor}>Request new tutor</button>
        </div>
      </div>
    )

    let studentLeft = (
      <div className="waiting-box">
        <div className="waiting-box-container">
          <h5 className="WHITE-TEXT">Student has left this question</h5>
          <Link to="/help" type="button" className="btn btn-success">Return to help someone else</Link>
        </div>
      </div>
    )

    let isNotActive = this.props.parent.state.question.author.connected ? tutorLeft : studentLeft

    return this.props.isActive ? isActive : isNotActive
  }
}
