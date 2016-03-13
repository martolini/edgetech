import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { Link } from 'react-router'

class AdminComponent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userCount: 0,
      tutorCount: {},
      questionCount: {},
      questionAnswered: 0,
      averageHelpingTime: 0,
      userSearch: {},
      users: []
    }

    this.userRef = firebaseRef.child('users/')
    this.questionRef = firebaseRef.child('questions/')
    //this.sessionsRef = firebaseRef.child('sessioncounters/')
    this.userSearch = this.userSearch.bind(this)

  }

  componentDidMount(){

    let tutorCount = {
      java: 0,
      cpp: 0,
      js: 0,
      python: 0,
      powershell: 0
    }

    this.userRef.once("value", snapshot => {

      if (snapshot.exists()) {

        let userCount = snapshot.numChildren()

        let users = []
        snapshot.forEach(user => {
          users.push(user.val())
          if (user.val().courses !== undefined) {

            if (user.val().courses['C++']) {
              tutorCount.cpp++
            }

            if (user.val().courses.Java) {
              tutorCount.java++
            }

            if (user.val().courses.Javascript) {
              tutorCount.js++
            }

            if (user.val().courses.Python) {
              tutorCount.python++
            }
            if (user.val().courses.Powershell) {
              tutorCount.powershell++
            }

          }
        })

        this.setState({
          userCount: userCount - 5,
          tutorCount: tutorCount,
          users: users
        })

      }
    })

    this.questionRef.once("value", snapshot => {
      if (snapshot.exists()) {

        let questionCount = {
          today: 0,
          week: 0,
          total: 0
        }

        let questionAnswered = 0
        let totalCounter = 0

        let today = new Date()
        let week = Date.now()

        today.setHours(0,0,0,0)
        week = week - 604800000

        let launch = 1455697046200

        snapshot.forEach(question => {
          if (question.val().createdAt > launch) {
            if (question.val().category !== 'Test') {
              let sessionRef = firebaseRef.child('sessioncounters/').orderByKey().equalTo(question.key())
              sessionRef.once('value', snap => {
                if (snap.exists()) {
                  questionAnswered++
                  snap.forEach(obj => {
                    totalCounter += obj.val().counter
                  })
                }
              })
              questionCount.total++
              if (question.val().createdAt > week) {
                questionCount.week++
                if (question.val().createdAt > today.getTime()) {
                  questionCount.today++
                }
              }
            }
          }
        })

        setTimeout(() => {
          let averageHelpingTime = totalCounter/questionCount.total

          this.setState({
            questionCount: questionCount,
            questionAnswered: questionAnswered,
            averageHelpingTime: Math.round(averageHelpingTime/60)
          })
        }, 500)


      }

    })


  }

  userSearch() {

    this.setState({
      userSearch: this.searchText.value.trim()
    })

  }

  render() {

    return (
      <div>
        <div className="container">
          <br/>
          <br/>
          <div className="col-md-6 col-md-offset-3">
            <h5>Users: <span className="label label-success">{this.state.userCount} </span></h5>
            <h5>Tutors: </h5>
            <ul>
              <li>
                C++: <span className="label label-success">{this.state.tutorCount.cpp}</span>
              </li>
              <li>
                Java: <span className="label label-success">{this.state.tutorCount.java}</span>
              </li>
              <li>
                Javascript: <span className="label label-success">{this.state.tutorCount.js}</span>
              </li>
              <li>
                Python: <span className="label label-success">{this.state.tutorCount.python}</span>
              </li>
            </ul>
            <h5>Question asked total: <span className="label label-success">{this.state.questionCount.total}</span></h5>
            <h5>Question asked this week: <span className="label label-success">{this.state.questionCount.week}</span></h5>
            <h5>Question asked today: <span className="label label-success">{this.state.questionCount.today}</span></h5>
            <br/>
            <h5>Question answered: <span className="label label-success">{this.state.questionAnswered}</span></h5>
            <h5>Average helping time: <span className="label label-success">{this.state.averageHelpingTime} min</span></h5>
            <br/>
            <br/>
            <input type="text" className="chat-input" onKeyUp={this.userSearch} placeholder="Search for a username" ref={ref => this.searchText = ref}/>

            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Username</th>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody>
                { this.state.users.map((user, index) => {
                  if (!this.searchText.value) {
                    return (
                      <tr key={user.id}>
                        <td className="WHITE-TEXT">{index + 1}</td>
                        <td><Link to={`/user/${user.username}`} className="GREEN-TEXT">{user.username}</Link></td>
                        <td className="WHITE-TEXT">{user.email}</td>
                      </tr>
                    )
                  } else if (user.username.indexOf(this.state.userSearch) !== -1 || user.email.indexOf(this.state.userSearch)  !== -1) {
                    return (
                      <tr key={user.id}>
                        <td className="WHITE-TEXT">{index + 1}</td>
                        <td><Link to={`/user/${user.username}`} className="GREEN-TEXT">{user.username}</Link></td>
                        <td className="WHITE-TEXT">{user.email}</td>
                      </tr>
                    )
                  } else {
                    return null
                  }
                })}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}

export const Admin = connect()(AdminComponent)
