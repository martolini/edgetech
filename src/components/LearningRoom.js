import React, { Component } from 'react'
import { CodeEditor } from './CodeEditor'
import { VideoRoom } from './VideoRoom'
import { Question } from '../models'
import Firebase from 'firebase'
import Parse from 'parse'


export class LearningRoom extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      question: null
    }
    this.fetchQuestion = this.fetchQuestion.bind(this)
    this.answerQuestion = this.answerQuestion.bind(this)
  }

  fetchQuestion(questionId) {
    let query = new Parse.Query(Question)
    query.get(questionId, {
      success: question => {
        if (question.get('author').id === this.props.user.id) {
          this.setState({
            loading: false,
            question: question
          })
        } else {
          if (!question.get('tutor')) {
            return this.answerQuestion(question)
          } else if (question.get('tutor').id === this.props.user.id) {
            this.setState({
              question: question,
              loading: false
            })
          } else {
            this.setState({
              loading: false,
              error: 'This question is already answered'
            })
          }
        }
      },
      error: (question, error) => {
        this.setState({
          loading: false,
          error: error.message
        })
      }
    })
  }

  answerQuestion(question) {
    Parse.Cloud.run('answerQuestion', {
      questionId: question.id
    }, {
      success: question => this.setState({
        question: question,
        loading: false
      }),
      error: error => this.setState({
        loading: false,
        error: error.message
      })
    })
  }

  componentDidMount() {
    this.fetchQuestion(this.props.params.id)
  }

  renderError() {
    return <h2>{ this.state.error }</h2>
  }

  renderLoading() {
    return <h1><i className="fa fa-fw fa-spinner fa-spin"></i></h1>
  }

  render() {
    if (this.state.loading) {
      return this.renderLoading()
    } else if (!!this.state.error) {
      return this.renderError()
    }
    return (
      <div className="row" style={{height: '100%' }}>
        <div className="col-xs-8">
          <h4>Paste or type your code here so it's easier to help</h4>
          <CodeEditor questionId={ this.props.params.id }/>
        </div>
        <div className="col-xs-4">
          <h4>Talk to your tutor</h4>
          <VideoRoom questionId={ this.state.question.id } />
        </div>
      </div>
    )
  }
}
