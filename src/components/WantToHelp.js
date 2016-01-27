import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { askQuestion } from '../actions'

class WantToHelpComponent extends Component {
  constructor(props) {
    super(props)
  }

  sendEmail(){

  }

  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div>
        <div className="container">
          <br/>
          <br/>
          <div className="col-md-6 col-md-offset-3">
            <h3>We're sorry, but you need to be a tutor to access this page.</h3>
            <br/>
            <h5>Do you want to be a tutor? Send us an <a href="mailto:hellenes.91@gmail.com">email</a> below and we will come back to you as soon as we can ;)</h5>

            <br/>
          </div>
        </div>
        <br/>
        <br/>

      </div>
    )
  }
}

export const WantToHelp = connect()(WantToHelpComponent)
