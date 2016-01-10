import React, { Component } from 'react'
import { CodeEditor } from './CodeEditor'
import { VideoRoom } from './VideoRoom'
import { connect } from 'react-redux'
import { fetchQuestion, joinedLearningRoom } from '../actions'
import Firebase from 'firebase'
import Parse from 'parse'


class LearningRoomComponent extends Component {

  componentDidMount() {
    const { id } = this.props.params
    const { dispatch } = this.props
    dispatch(fetchQuestion(id))
  }

  renderError(error) {
    return <h2>{ error }</h2>
  }

  renderLoading() {
    return <h1><i className="fa fa-fw fa-spinner fa-spin"></i></h1>
  }

  render() {
    if (this.props.learningRoom.loading) {
      return this.renderLoading()
    } else if (this.props.error) {
      return this.renderError(this.props.error)
    }
    return (
      <div className="row" style={{height: '100%' }}>
        <div className="col-xs-8">
          <h4>Paste or type your code here so it's easier to help</h4>
          <CodeEditor questionId={ this.props.params.id }/>
        </div>
        <div className="col-xs-4">
          <h4>Talk to your tutor</h4>
          <VideoRoom questionId={ this.props.params.id }
            isTutor={ this.props.learningRoom.question.get('author').id !== Parse.User.current().id }
            />
        </div>
      </div>
    )
  }
}

export const LearningRoom = connect(state => {
  return {
    learningRoom: state.learningRoom
  }
})(LearningRoomComponent)
