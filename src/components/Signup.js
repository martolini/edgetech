import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { signup } from '../actions'
import { firebaseRef, CATEGORIES } from '../config'



class SignupComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usernames: [],
      username: "",
      showLanguages: false,
      orgs: [],
      org: ""
    }

    this.orgRef = firebaseRef.database().ref('orginfo')
    this.handleSubmit = this.handleSubmit.bind(this)
    this.firebaseRef = firebaseRef.database().ref('users').orderByChild('username')
    this.tutorRef = firebaseRef.database().ref('tutors')
    this.updateUsername = this.updateUsername.bind(this)
    this.validChars = this.validChars.bind(this)
    this.showLanguages = this.showLanguages.bind(this)
    this.usernameIsValid = false
    this.errMsg = null
    this.radioBtn = false
  }

  componentDidMount() {
    const { dispatch } = this.props

    this.setState({
      org: location.pathname.split('/')[1]
    })

    this.firebaseRef.once("value", snapshot => {
      if (snapshot.exists()) {
        let usernames = []
        snapshot.forEach(snap => {
          let user = snap.val()
          usernames.push(user.username)
        })
        this.setState({
          usernames: usernames
        })
      }
    })
    this.orgRef.once("value", snapshot => {
      if (snapshot.exists()) {
        let orgs = []
        snapshot.forEach(snap => {
          let org = snap.val()
          if (org.path == this.state.org) {
              this.setState({
                org: org
              })
          }
          orgs.push(org)
        })
        this.setState({
          orgs: orgs
        })
      }
    }).then( () => {
      if (!this.state.org.path && this.state.org !== "signup") {
        dispatch(pushPath("/login"))
      }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.usernameIsValid) {
      const tutor = document.getElementById('yesRadioBtn').checked
      const username = this.usernameInput.value
      const email = this.emailInput.value
      const password = this.passwordInput.value
      let organization = null

      if (!this.state.org.path) {
        this.state.orgs.map(org => {
          if (this.org.value == org.id) {
            organization = org
          }
        })
      } else {
        organization = this.state.org
      }

      const { dispatch } = this.props;

      let courses = {}
      if (tutor) {
        CATEGORIES.map(category => {
          if (category.id == 'Test') {
            // Do nothing
          } else {
            courses[category.id] = document.getElementById(category.id).checked
          }
        })
      }
      dispatch(signup({
        username: username,
        email: email,
        password: password,
        tutor: tutor,
        courses: courses,
        org: organization
      }))
    }

  }

  validChars() {
    if (this.usernameInput.value.length > 2) {
      return /^[0-9a-zA-Z_]+$/.test(this.usernameInput.value)
    } else {
      return false
    }
  }

  updateUsername(){
    this.setState({
      username: this.usernameInput.value
    })
    let validChars = this.validChars()
    if (this.state.usernames.indexOf(this.usernameInput.value) !== -1) {
      this.errMsg = "Sorry, but this username is already taken."
      this.usernameIsValid = false
    } else if (!validChars) {
      this.errMsg = "Username must have four or more non-special characters."
      this.usernameIsValid = false
    } else {
      this.usernameIsValid = true
      this.errMsg = null
    }
  }

  showLanguages(){
    this.setState({
      showLanguages: document.getElementById('yesRadioBtn').checked
    })
  }

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close">×</button>
        <strong>Oh snap,</strong> { this.props.auth.error }
      </div>
    )

    let nameTaken = (
      <span className="input-group-addon">
        <i className="fa fa-exclamation-circle fa-fw DANGER"></i>
      </span>
      )

    let nameNotTaken = (
      <span className="input-group-addon">
        <i className="fa fa-check-circle fa-fw SUCCESS"></i>
      </span>
      )

    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>

    let submitBtn = (
      <button type="submit" onClick={this.handleSubmit}
        className="btn btn-success btn-lg">
        { this.props.auth.loading ? spinner : 'Sign up'}
      </button>
      )

    let submitBtnDisabled = (
      <button type="button" className="btn btn-success disabled btn-lg">
        Sign up
      </button>
      )

    let languages = (
      <div className="input-group input-group-lg">
        <span className="input-group-addon">
          <i className="fa fa-fw"></i>
        </span>
        <label className="tutorLabel">In what languages?</label>
        { CATEGORIES.map(category => {
          if (category.id == 'Test') {
            return null
          } else {
            return (
              <div className="checkbox" key={category.id}>
                <label>
                  <input type="checkbox" id={category.id}/>
                  {category.id}
                </label>
              </div>
              )
          }
          })
        }
      </div>
    )

    let organizations = (
      <div className="form-group">
        <div className="input-group input-group-lg">
          <span className="input-group-addon">
            <i className="fa fa-building-o fa-fw"></i>
          </span>
          <select className="form-control" ref={ref => this.org = ref}>
            { this.state.orgs.map(org => {
              return (
                <option key={org.id} className="DARK-TEXT" value={org.id}>{ org.name }</option>
                )
              })
            }
          </select>
        </div>
      </div>
    )

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-md-offset-3">
            <br/>
            <br/>
            <div className="panel panel-default">
              <div className="panel-heading DARK">
                <h3 className="logo-font">Sign up</h3>
              </div>
              <div className="panel-body">
                { this.props.auth.error && alert }

                <form className="form-horizontal">
                  {this.state.org !== "signup" ? null : organizations}
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-user fa-fw"></i>
                      </span>
                      <input className="form-control" type="text" onKeyUp={this.updateUsername} placeholder="username"
                          ref={(ref) => this.usernameInput = ref}/>
                      {this.usernameIsValid ? nameNotTaken : nameTaken}
                    </div>
                    <p className="DANGER errMsg">{this.errMsg}</p>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope-o fa-fw"></i>
                      </span>
                      <input className="form-control inputMargin" type="email" placeholder="email"
                          ref={(ref) => this.emailInput = ref}/>
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control inputMargin" type="password" placeholder="******"
                          ref={(ref) => this.passwordInput = ref}/>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-graduation-cap fa-fw"></i>
                      </span>
                      <label className="tutorLabel">Are you going to teach?</label>
                      <label className="radio-inline"><input id="yesRadioBtn" type="radio" onClick={this.showLanguages} name="optradio" />Yes</label>
                      <label className="radio-inline"><input type="radio" name="optradio" onClick={this.showLanguages} defaultChecked="checked"/>No</label>
                    </div>
                    {this.state.showLanguages ? languages : null}
                  </div>
                  {this.usernameIsValid ? submitBtn : submitBtnDisabled}
                </form>
              </div>
              <div className="panel-footer">
                <Link className="GREEN-TEXT" to="/login">Already have an account? Log in here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Signup = connect(state => state)(SignupComponent)
