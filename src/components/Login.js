import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login, loginWithFacebook } from '../actions'

class LoginComponent extends Component {

  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.emailInput.focus()
  }

  handleSubmit(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(login({
      email: this.emailInput.value,
      password: this.passwordInput.value
    }))
  }

  render() {
    let alert = (
      <div className="alert alert-dismissible alert-warning">
        <button type="button" className="close" data-dismiss="alert">×</button>
        <strong>Oh snap!</strong> { this.props.auth.error }
      </div>
    );
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-md-offset-4">
            <br/>
            <br/>
            <div className="panel panel-default">
              <div className="panel-heading DARK">
                <h3 className="logo-font">Log in</h3>
              </div>
              <div className="panel-body">
                { this.props.auth.error && alert }
                <form className="form-horizontal">
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
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Login = connect(state => state)(LoginComponent)
