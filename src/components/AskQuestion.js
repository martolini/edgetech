import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { askQuestion } from '../actions'

class AskQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    let question = {
      text: this.text.value.trim(),
      category: this.category.value,
      author: {
        id: this.props.user.id,
        username: this.props.user.username
      }
    }
    dispatch(askQuestion(question))
  }

  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div>
        <div className="container">
          <br/>
          <br/>
          <div className="col-md-6 col-md-offset-3">
            <h3>What do you need help with?</h3>
            <div className="form-group">
              <label htmlFor="select">Course</label>
              <select className="form-control" id="select" ref={ref => this.category = ref}>
                { CATEGORIES.map(category => <option key={category.id} value={category.id}>{ category.name }</option> )}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="text">Problem</label>
              <input type="text" className="form-control" id="text"
                placeholder="What is the difference between private and public functions?"
                ref={ref => this.text = ref}/>
            </div>
            <br/>
            <div className="button-group">
              <button type="submit" onClick={this.handleSubmit}
                className="btn btn-lg btn-success">
                { this.props.loading ? spinner : 'Ask question' }
              </button>
            </div>
          </div>
        </div>
        <br/>
        <br/>
        <section className="section GREEN ">
          <div className="container">
            <div className="col-md-6 col-md-offset-3 BEIGE-TEXT">
              <h4 className="WHITE-TEXT">FAQ</h4>
              <h5 className="WHITE-TEXT">How fast will I be connected with a student assistant?</h5>
              Availability of student assistant can vary, but it will rarely take longer than a few minutes. 
              As long as you leave the tab open, you will be notified when an assistant joins your session, 
              even if you are in a different tab/window.
              <h5 className="WHITE-TEXT">How much does it cost?</h5>
              While we are in Beta, the service is completly free.
              <h5 className="WHITE-TEXT">What if I don't want to work with the assistant who joins?</h5>
              You can end the session at any time. 
              <h5 className="WHITE-TEXT">How can I becoma a assistant?</h5>
              Easy! Just send us a message in the chat, and we will give you tutoring access if you have the right qualifications.
              <h5 className="WHITE-TEXT">Are your assistants good?</h5>
              Absolutely, they are verified and selected based on their ability to help others in their respective 
              areas/languages of expertise. Most of our assistants are highly passionate about helping other programmers.
              <h5 className="WHITE-TEXT">Still not sure?</h5>
              We are here to help. If you have any specific questions, just send us a message in the chat and we will 
              come back to you as soon as we can.
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export const AskQuestion = connect()(AskQuestionComponent)
