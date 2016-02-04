import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../actions'
import { firebaseRef } from '../config'



class SignupComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      usernames: [],
      username: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.firebaseRef = new Firebase('https://edgetech.firebaseio.com/users').orderByChild('username')
    this.updateUsername = this.updateUsername.bind(this)
    this.validChars = this.validChars.bind(this)
    this.usernameIsValid = false
    this.errMsg = null

  }

  componentDidMount() {
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
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.usernameIsValid) {
      const username = this.usernameInput.value
      const email = this.emailInput.value
      const password = this.passwordInput.value
      const { dispatch } = this.props;
      dispatch(signup({
        username: username,
        email: email,
        password: password
      }))
    } else {
      // Do something
      console.log('username taken!')
    }

  }

  validChars() {
    if (this.usernameInput.value.length > 3) {
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

    let submitBtn = (
      <button type="submit" onClick={this.handleSubmit}
        className="btn btn-success btn-lg">
        Sign up
      </button>
      )

    let submitBtnDisabled = (
      <button type="button" className="btn btn-success disabled btn-lg">
        Sign up
      </button>
      )

    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
            <br/>
            <br/>
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Sign up</h4>
              </div>
              <div className="panel-body">
                { this.props.auth.error && alert }

                <form className="form-horizontal">
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
                      <input className="form-control" type="email" placeholder="email"
                          ref={(ref) => this.emailInput = ref}/>
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control" type="password" placeholder="******"
                          ref={(ref) => this.passwordInput = ref}/>
                    </div>
                  </div>
                  {this.usernameIsValid ? submitBtn : submitBtnDisabled}
                </form>
              </div>
              <div className="panel-footer">
                <Link to="/login">Already have an account? Log in here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Signup = connect(state => state)(SignupComponent)
