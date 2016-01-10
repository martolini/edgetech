import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { login } from '../actions'

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
          <div className="col-xs-4 col-xs-offset-4">
            <div className="panel panel-default">
              <div className="panel-heading">
                <h4>Login</h4>
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
                          ref={ref => this.emailInput = ref}/>
                    </div>
                  </div>
                    <div className="form-group">
                    <div className="input-group input-group-lg">
                      <span className="input-group-addon">
                        <i className="fa fa-lock fa-fw"></i>
                      </span>
                      <input className="form-control" type="password" placeholder="******"
                          ref={ref => this.passwordInput = ref}/>
                    </div>
                  </div>
                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-lg">
                      { this.props.auth.loading ? spinner : 'Login' }
                    </button>
                </form>
              </div>
              <div className="panel-footer">
                <Link to="/signup">Don't have an account? Sign up here.</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Login = connect(state => state)(LoginComponent)