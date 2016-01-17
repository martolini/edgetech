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
        <section className="section GREEN WHITE-TEXT">
          <div className="container">
            <div className="col-md-6 col-md-offset-3">
              <h2>FAQ</h2>
              <h4>How fast will I be connected with a student assistant?</h4>
              Availability of student assistant can vary based on time and complexity. As long as you leave the tab open, you will be notified when an Expert joins your session, even if you are in a different tab/window.
              <h4>How much does it cost?</h4>
              The Blurblarp service starts at $1 per minute and goes up to your max budget upon broadcasting your request. Our routing algorithms prioritize qualified experts that can come in under or at your budget. Since expert rates vary, the higher your budget, the more likely an expert will connect. This removes a lot of back-and-forth between you and the expert so that you can be helped immediately. The first five minutes are designed as a risk free trial with the expert who joins your session. Your session will be free as long as you end within the first five minutes.
              <h4>What if I don't want to work with the Expert who joins?</h4>
              You can end the session at any time. Upon ending a session you will be sent to the review page where you can rate your session, leave a tip, and indicate if you wish to open your request up for another Expert to join.
              <h4>Are your Experts good?</h4>
              Absolutely, they are verified and selected based on their ability to help others in their respective areas/languages of expertise. Most of our experts are top contributors on StackOverflow, active members within their software communities, instructors at the best schools/bootcamps or just passionate about helping other programmers.
              <h4>Still not sure?</h4>
              We are here to help. If you have any specific questions, please reach out to us.
            
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export const AskQuestion = connect()(AskQuestionComponent)
