import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES, LEVELS } from '../config'
import { askQuestion } from '../actions'
import { TopTutors } from './TopTutors'

class AskQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    const { dispatch } = this.props
  }

  componentDidMount(){
    // Set navbar link to active
    document.getElementById("get-help-link").className = "active"

  }

  componentWillUnmount(){
    // Set navbar link to in-active
    document.getElementById("get-help-link").className = ""
  }

  handleSubmit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    let question = {
      text: this.text.value.trim(),
      category: this.category.value,
      author: {
        id: this.props.user.id,
        username: this.props.user.username,
        connected: true
      },
      tutor: {
        id: null,
        username: null,
        email: null,
        connected: false
      }
    }
    if (this.text.value.length > 0) {
      dispatch(askQuestion(question))
    } else {
      document.getElementById('form-error').innerHTML = 
        '<br/>' +
        '<div class="alert alert-dismissible alert-warning">' +
          '<strong>You need to specify what you need help with!</strong>' +
        '</div>' 
    }
  }


  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>

    return (
      <div>
        <div className="container">
          <br/>
          <br/>
          <div className="col-md-6 col-md-offset-3">
            <form className="ask-questions-form" onSubmit={this.handleSubmit}>
              <h3 className="WHITE-TEXT BOLD-FONT">What do you need help with?</h3>
              <div className="form-group">
                <label className="WHITE-TEXT" htmlFor="select">Course:</label>
                <select className="form-control WHITE-TEXT" id="select" ref={ref => this.category = ref}>
                  { CATEGORIES.map(category => <option key={category.id} value={category.id}>{ category.name }</option> )}
                </select>
              </div>

              <div id="text-input" className="form-group" >
                <label className="WHITE-TEXT" htmlFor="text">Problem:</label>
                <input type="text" className="form-control WHITE-TEXT" id="text"
                  
                  ref={ref => this.text = ref}/>
                <div id="form-error"></div>
              </div>
              <br/>
              <div className="button-group">
                <button type="submit" className="btn btn-lg btn-default ">
                  { this.props.loading ? spinner : 'Ask question' }
                </button>
              </div>
            </form>
            <br/>
            <br/>
            <TopTutors/>
          </div>
        </div>

      </div>
    )
  }
}

export const AskQuestion = connect()(AskQuestionComponent)
