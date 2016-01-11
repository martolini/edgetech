import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'

class DashboardComponent extends Component {
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
                <Link to="ask" className="btn btn-primary btn-lg">Ask a question</Link>
                <br />
                <br />
                <p className="lead">And get help from a tutor</p>
              </div>
            </div>
          </div>
          <div className="col-xs-4">
            <div className="panel panel-info">
              <div className="panel-heading">
                <h3 className="panel-title">Previous questions</h3>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  { this.props.questions.map(question => {
                    return <li className="list-group-item" key={question.id}>{ question.title }</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export const Dashboard = connect(state => state)(DashboardComponent)
