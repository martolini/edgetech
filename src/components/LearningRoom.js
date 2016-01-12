import React, { Component } from 'react'
import { CodeEditor } from './CodeEditor'
import { VideoRoom } from './VideoRoom'
import { firebaseRef } from '../config'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'



class LearningRoomComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      question: null
    }
    this.leaveRoom = this.leaveRoom.bind(this)
    this.onQuestionChange = this.onQuestionChange.bind(this)
    this.questionRef = firebaseRef.child(`questions/${this.props.params.id}`)
  }

  onQuestionChange(question) {
    this.setState({
      question: question.val()
    })
  }

  componentWillUnmount() {
    this.questionRef.off('value', this.onQuestionChange)
  }

  leaveRoom(e) {
    e.preventDefault()
    if (this.state.question.author === this.props.user.id) {
      this.questionRef.set(Object.assign({}, this.state.question, { closed: true }))
    } else {
      this.questionRef.set(Object.assign({}, this.state.question, { tutor: null }))
    }
    const { dispatch } = this.props
    dispatch(pushPath('/app'))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state
  }

  componentDidMount() {
    this.questionRef.on('value', this.onQuestionChange)
    this.questionRef.once('value', snapshot => {
      if (!snapshot.exists()) {
        this.setState({
          loading: false,
          error: 'This is an invalid question'
        })
      } else {
        let question = snapshot.val()
        if (question.author !== this.props.user.id) {
          if (!!question.tutor) {
            if (question.tutor !== this.props.user.id) {
              return this.setState({
                loading: false,
                error: 'Someone else is tutoring this...'
              })
            }
          } else {
            this.questionRef.set(Object.assign({}, question, { tutor: this.props.user.id }))
          }
        }
        this.setState({
          question: question,
          loading: false,
          error: null
        })
      }
    })
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
    } else if (this.state.question.closed === true) {
      return <h1>This question is closed by the author...</h1>
    }
    return (
      <div className="container-fluid">
        <div className="learningroom-padding-top"></div>
        <div className="editor-position col-xs-8">
          <CodeEditor
            questionId={ this.state.question.id }
            category={ this.state.question.category }
            userId={this.props.user.id}
          />
        </div>
        <div className="video-position col-xs-4">
          <a href="#" className="btn btn-success btn-lg leave-room-btn">I'm Done!</a>
          <div className="panel panel-default">
            <div className="panel-heading">
              Connected with: <a>Martin Skow</a>
              <div className="time-count">00:10</div>
            </div>
          </div>
          <VideoRoom questionId={ this.props.params.id } />
          
          <div className="panel panel-default">
            <div className="panel-heading">
              Question: <h5>{ this.state.question.title }</h5>
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export const LearningRoom = connect()(LearningRoomComponent)
