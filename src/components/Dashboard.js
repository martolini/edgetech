import React, { Component } from 'react'
import { Link } from 'react-router'

export class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-xs-8">
            <div className="panel panel-success">
              <div className="panel-heading">
                <h3 className="panel-title">Get help immediately</h3>
              </div>
              <div className="panel-body">
                <Link to="question" className="btn btn-primary btn-lg">Ask a question</Link>
                <br />
                <br />
                <p className="lead">And get help from a tutor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
