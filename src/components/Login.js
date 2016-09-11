import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { login, loginWithFacebook } from '../actions'
import { firebaseRef } from '../config'

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      org: location.pathname.split('/')[1],
      orgs: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.forgottenPassword = this.forgottenPassword.bind(this)
    this.resetPassword = this.resetPassword.bind(this)
    this.orgRef = firebaseRef.database().ref('organizations/-KRPlzPJcfHIxQjkbJ_r/info')
  }

  componentDidMount() {
    this.emailInput.focus()
    const { dispatch } = this.props
    this.orgRef.once("value", snapshot => {
      this.setState({
        org: snapshot.val()
      })
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
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

    dispatch(login({
      email: this.emailInput.value,
      password: this.passwordInput.value,
      organization: organization
    }))
  }

  forgottenPassword() {
    $('#passwordModal').modal()
  }

  resetPassword() {
    firebaseRef.resetPassword({
      email: this.email.value
    }, function(error) {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            console.log("The specified user account does not exist.");
            break;
          default:
            console.log("Error resetting password:", error);
        }
      } else {
        console.log("Password reset email sent successfully!");
      }
    })
  }

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" data-dismiss="alert">×</button>
        <strong>Oh snap!</strong> { this.props.auth.error }
      </div>
    );
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>

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
          <div className="col-md-4 col-md-offset-4">
            <div className="modal" id="passwordModal">
              <div className="modal-dialog">
                <div className="modal-content learningroom-modal">
                  <div className="modal-header">
                    <h3 className="modal-title WHITE-TEXT">Type in your email</h3>
                  </div>
                  <div className="modal-body">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon WHITE-TEXT">
                      <i className="fa fa-envelope-o fa-fw"></i>
                        <label>Email: </label>
                      </span>
                      <input className="form-control inputMargin WHITE-TEXT" type="email" placeholder="example@test.com"
                        ref={ref => this.email = ref}/>
                    </div>
                  </div>
                  <div className="modal-footer learningroom-modal-footer">
                    <button type="button" onClick={this.resetPassword} data-dismiss="modal"
                    className="btn btn-success btn-lg">Send new password</button>
                  </div>
                </div>
              </div>
            </div>
            <br/>
            <br/>
            <div className="panel panel-default">
              <div className="panel-heading DARK">
                <h3 className="logo-font">Log in</h3>
              </div>
              <div className="panel-body">
                { this.props.auth.error && alert }
                <form className="form-horizontal">
                  {this.state.org !== "login" ? null : organizations}
                  <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-envelope-o fa-fw"></i>
                      </span>
                      <input className="form-control inputMargin" type="email" placeholder="email"
                          ref={ref => this.emailInput = ref}/>
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control inputMargin" type="password" placeholder="******"
                          ref={ref => this.passwordInput = ref}/>
                    </div>
                  </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-success btn-lg">
                      { this.props.auth.loading ? spinner : 'Login' }
                    </button>
                </form>
              </div>
              <div className="panel-footer">
                <Link className="GREEN-TEXT" to="/signup">Don't have an account? Sign up here.</Link>
                <p className="GREEN-TEXT button-link" onClick={this.forgottenPassword}>Forgotten password? Click here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Login = connect(state => state)(LoginComponent)
