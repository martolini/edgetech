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
      title: this.title.value.trim(),
      category: this.category.value,
      description: this.description.value.trim(),
      author: this.props.user.id
    }
    dispatch(askQuestion(question))
  }

  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div className="container">
        <div className="learningroom-padding-top"></div>
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
              <label htmlFor="title">Problem</label>
              <input type="text" className="form-control" id="title"
                placeholder="What is the difference between private and public functions?"
                ref={ref => this.title = ref}/>
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
    )
  }
}

export const AskQuestion = connect()(AskQuestionComponent)
