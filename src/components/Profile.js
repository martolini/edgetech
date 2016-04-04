import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES, LEVELS } from '../config'
import { askQuestion } from '../actions'
import { RecentQuestions } from './RecentQuestions'
import { Link } from 'react-router'


class ProfileComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      profile: {},
      alert: {}
    }
    const { dispatch } = this.props
    this.connectWith = this.connectWith.bind(this)
    this.firebaseRef = firebaseRef.child('users/').orderByChild('username').equalTo(this.props.params.username)
    this.updateLanguages = this.updateLanguages.bind(this)
    this.updateCheckboxes = this.updateCheckboxes.bind(this)
    this.changePassword = this.changePassword.bind(this)
    this.level = " "
    this.nextLevel = 0
  }

  componentDidMount() {
    // Set navbar link to active
    if (document.getElementById("profile-link") !== null) {
      document.getElementById("profile-link").className = "active"
    }

    this.updateCheckboxes()

    this.firebaseRef.once('value', snapshot => {

      if (snapshot.exists()) {
        snapshot.forEach(snap => {
          let user = snap.val()
          this.nextLevel = user.level.id + 1
          this.level = user.level
          this.setState({
            profile: user
          })
        })
      }
    })
  }

  updateCheckboxes() {
    if (this.props.user.username === this.props.params.username && this.props.user.courses) {
      if (this.props.user.courses.Java) {
        document.getElementById('Java').checked = true
      }
      if (this.props.user.courses.Javascript) {
        document.getElementById('Javascript').checked = true
      }
      if (this.props.user.courses['C++']) {
        document.getElementById('C++').checked = true
      }
      if (this.props.user.courses.Python) {
        document.getElementById('Python').checked = true
      }
      if (this.props.user.courses.Powershell) {
        document.getElementById('Powershell').checked = true
      }
      if (this.props.user.courses.PHP) {
        document.getElementById('PHP').checked = true
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    this.firebaseRef = firebaseRef.child('users/').orderByChild('username').equalTo(nextProps.params.username)
    this.firebaseRef.once('value', snapshot => {
      if (snapshot.exists()) {
        snapshot.forEach(snap => {
          let user = snap.val()
          this.level = user.level
          this.nextLevel = user.level.id + 1
          this.setState({
            profile: user
          })
          this.updateCheckboxes()
        })
      }
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
    // Set navbar link to in-active
    if (document.getElementById("profile-link") !== null) {
      document.getElementById("profile-link").className = ""
    }
  }

  updateLanguages() {
    let coursesRef = firebaseRef.child(`users/${this.props.user.id}/courses`)
    let courses = []
    CATEGORIES.map(category => {
      if (category.id == 'Test') {
        // Do nothing
      } else {
        courses[category.id] = document.getElementById(category.id).checked
      }
    })

    coursesRef.set(courses)

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

  changePassword(e){
    e.preventDefault()
    let alert = {
      warning: "",
      success: ""
    }
    firebaseRef.changePassword({
      email: this.props.user.email,
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value
    }, (error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_PASSWORD":
            alert.warning = "The specified user account password is incorrect."
            break;
          case "INVALID_USER":
            alert.warning = "The specified user account does not exist."
            break;
          default:
            alert.warning = "Error changing password:"
        }
      } else {
        console.log("User password changed successfully!");
        alert.success = "User password changed successfully!"
      }
      this.setState({
        alert: alert
      })
    })
  }

  render() {
    let connectWithProfile =  (
      <div>
        <h5>Connect with {this.state.profile.username}:</h5>
        <div className="form-group">
          <label className="" htmlFor="select">Course:</label>
          <select className="form-control" id="select" ref={ref => this.syntax = ref}>
            { CATEGORIES.map(category => <option key={category.id} id={category.id} value={category.id}>{ category.id }</option> )}
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

    let langCheck = (
      <div className="input-group input-group-lg">
        <br/>
        <p className="tutorLabel">Check a language to get notified when someone needs help:</p>
        { CATEGORIES.map(category => {
          if (category.id == 'Test') {
            return null
          } else {
            return (
              <div className="checkbox" key={category.id}>
                <label>
                  <input type="checkbox" onClick={this.updateLanguages} id={category.id}/>
                  {category.id}
                </label>
              </div>
              )
          }
          })
        }
      </div> )

    let langList = (
      <div className="input-group input-group-lg">
        <br/>
        <h5 className="tutorLabel">Languages {this.state.profile.username} knows:</h5>
        <ul className="list-inline">
          { CATEGORIES.map(category => {
              if (typeof this.state.profile.courses !== 'undefined') {
                if (category.id === 'Test' || !this.state.profile.courses[category.id]) {
                  // do nothing
                } else {
                  return (
                    <li key={category.id}>
                      {category.id},
                    </li>
                    )
                }
              }

            })
          }
        </ul>
      </div> )

    let alertWarning = (
      <div className="alert alert-dismissible alert-warning change-password-alert">
          <p>{this.state.alert.warning}</p>
      </div>
    )

    let alertSuccess = (
      <div className="alert alert-dismissible alert-success change-password-alert">
          <p>{this.state.alert.success}</p>
      </div>
    )

    let resetPass = (
      <form className="form-horizontal" onSubmit={this.changePassword}>
        <br/>
        <h5>Reset password: </h5>
        <div className="form-group">
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
            <i className="fa fa-lock fa-fw"></i>
              <label>Old password</label>
            </span>
            <input className="form-control inputMargin" type="password" placeholder="******"
                ref={(ref) => this.oldPassword = ref}/>
          </div>
        </div>
        <div className="form-group">
          <div className="input-group input-group-lg">
            <span className="input-group-addon">
            <i className="fa fa-lock fa-fw"></i>
              <label>New password</label>
            </span>
            <input className="form-control inputMargin" type="password" placeholder="******"
                ref={(ref) => this.newPassword = ref}/>
          </div>
        </div>
        <button type="submit" className="btn btn-success">Reset</button>
        { this.state.alert.warning || this.state.alert.success ? (this.state.alert.warning ? alertWarning : alertSuccess) : null}
      </form>
    )

    return (
      <div>
        <br/>
        <br/>
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <h2 className="logo-font-dark CENTER-TEXT">
                {this.state.profile.username}
              </h2>
              <br/>
              <hr/>
              <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/badge.svg" className="bro-badge"/>
              <ul className="list-inline">
                <li>
                  <img src={this.level.badge}></img>
                </li>
                <li className="profile-username-list">
                  <h5>Rank: <p className="lead">{this.level.rank}</p>
                  </h5>
                  <h5>Points:&nbsp;
                    <span className="label label-success">
                     {this.state.profile.karma}
                    </span>
                  </h5>
                  <h6>
                    (Needs {(this.level.nextLevel - this.state.profile.karma)} more points to go to become {LEVELS[this.nextLevel].rank})
                  </h6>

                </li>
              </ul>
              <hr/>
              <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/badge.svg" className="bro-badge"/>
              {this.props.user.username === this.props.params.username ? langCheck : langList}
              <hr/>
              {this.props.user.username === this.props.params.username ? recentQuestions : connectWithProfile}
              {this.props.user.username === this.props.params.username ? resetPass : null}
              <div className="bottom-whitespace"></div>
            </div>
          </div>
      </div>
    )
  }
}

export const Profile = connect()(ProfileComponent)
