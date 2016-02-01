import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { askQuestion } from '../actions'
import { RecentQuestions } from './RecentQuestions'

class AskQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    const { dispatch } = this.props
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
        connected: false
      }
    }
    if (this.text.value.length > 0) {
      dispatch(askQuestion(question))
    } else {
      document.getElementById('form-error').innerHTML = '<h6>You need to specify what you need help with!</h6>';
    }
  }


  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div>
        <section className="section GREEN ">
        <div className="container">
          <br/>
          <br/>
          <div className="col-md-6 col-md-offset-3">
            <h3 className="WHITE-TEXT">What do you need help with?</h3>
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
              <button type="submit" onClick={this.handleSubmit}
                className="btn btn-lg btn-default ">
                { this.props.loading ? spinner : 'Ask question' }
              </button>
            </div>
          </div>
        </div>
        </section>
        <br/>
        <br/>
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <h4 className="">Your 5 most recent questions</h4>
              <RecentQuestions userId={this.props.user.id}/>
              <hr/>
              <h4 className="">FAQ</h4>
              <h5 className="">How fast will I be connected with a student assistant?</h5>
              Availability of student assistant can vary, but it will rarely take longer than a few minutes. 
              As long as you leave the tab open, you will be notified when an assistant joins your session, 
              even if you are in a different tab/window.
              <h5 className="">How much does it cost?</h5>
              While we are in Beta, the service is completly free.
              <h5 className="">What if I don't want to work with the assistant who joins?</h5>
              You can end the session at any time. 
              <h5 className="">How can I becoma a assistant?</h5>
              Easy! Just send us a message in the chat, and we will give you tutoring access if you have the right qualifications.
              <h5 className="">Are your assistants good?</h5>
              Absolutely, they are verified and selected based on their ability to help others in their respective 
              areas/languages of expertise. Most of our assistants are highly passionate about helping other programmers.
              <h5 className="">Still not sure?</h5>
              We are here to help. If you have any specific questions, just send us a message in the chat and we will 
              come back to you as soon as we can.
            </div>
          </div>
      </div>
    )
  }
}

export const AskQuestion = connect()(AskQuestionComponent)
