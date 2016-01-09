import React, { Component } from 'react'
import { connect } from 'react-redux'
import { askQuestion } from '../actions'
import Parse from 'parse'

class AskQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(askQuestion({
      category: this.category.value,
      title: this.title.value,
      description: this.description.value,
      user: Parse.User.current()
    }))
  }

  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div className="row">
        <div className="col-xs-8">
          <h4>Request a mentor</h4>
          <div className="form-group">
            <label htmlFor="select">Category</label>
            <select className="form-control" id="select" ref={ref => this.category = ref}>
              <option>Matte 1</option>
              <option>Matte 2</option>
              <option>Matte 3</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title"
              placeholder="I can't understand Stokes theorem"
              ref={ref => this.title = ref}/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea rows="2" className="form-control" id="title"
              placeholder="I've been reading the textbook 2 times and still can't figure out how it really works."
              ref={ref => this.description = ref} />
          </div>

          <div className="button-group">
            <button type="submit" onClick={this.handleSubmit}
              className="btn btn-lg btn-primary">
              { this.props.loading ? spinner : 'Ask question' }
            </button>
          </div>
        </div>
        <div className="col-xs-4 well well-lg">
          <h4>FAQ</h4>

          <h6>How fast will I be connected to a tutor?</h6>
          <p>Usually you will get help within the first 5 minutes, but it varies alot based on time and complexity of your question</p>

          <h6>Is this free?</h6>
          <p>That is a hell of a good question. Right now it is because people are awesome.</p>

          <h6>How good are the tutors?</h6>
          <p>The tutors are thoroughly vetted through us personally, and are really excited about sharing their knowledge.</p>

          <h6>If I really like a tutor, can I ask him personally again?</h6>
          <p>Of course. After every session, you leave reviews for each other. You can always look at your previous tutors at your profile page.</p>
        </div>
      </div>
    )
  }
}

export const AskQuestion = connect(state => state.question)(AskQuestionComponent)
