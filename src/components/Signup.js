import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { signup } from '../actions'
import Parse from 'parse'


class SignupComponent extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value
    const { dispatch } = this.props;
    dispatch(signup({
      email: email,
      password: password
    }))
  }

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close">×</button>
        <strong>Oh snap,</strong> { this.props.auth.error }
      </div>
    );

    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-6 col-xs-offset-3">
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
                    <button type="submit" onClick={this.handleSubmit}
                      className="btn btn-primary btn-lg">
                      { this.props.auth.loading ? spinner : 'Sign up'}
                    </button>
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
