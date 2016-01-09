import React, { Component } from 'react'
import Parse from 'parse'
import Pusher from 'pusher-js'
import { connect } from 'react-redux'
import { fetchQuestion, fetchMessages, sendMessage, receivedCode } from '../actions'
import AceEditor from 'react-ace'
import brace from 'brace'
import 'brace/mode/javascript'
import 'brace/theme/github'


class LearningRoomComponent extends Component {
  constructor(props) {
    super(props)
    const firebaseurl = `https://edgetech.firebaseio.com/questions/${this.props.params.id}`
    this.sendMessage = this.sendMessage.bind(this)
    this.onCodeEditorChange = this.onCodeEditorChange.bind(this)
  }

  componentDidMount() {
    const { id } = this.props.params
    const { dispatch } = this.props
    dispatch(fetchQuestion(id))
  }

  sendMessage(text) {
    const { dispatch } = this.props
    let message = {
      text: text,
      sender: Parse.User.current().getEmail()
    }
    dispatch(sendMessage(message, this.props.learningRoom.question))
  }

  onCodeEditorChange(val) {
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
      <div className="row">
        <div className="col-xs-8">
          <h4>Paste or type your code here so it's easier to help</h4>
          <AceEditor
            mode='javascript'
            theme='github'
            editorProps={{$blockScrolling: true}}
            onChange={this.onCodeEditorChange}
            // readOnly={ Parse.User.current().id != this.props.learningRoom.question.get('author').id }
          />
        </div>
        <div className="col-xs-4">

        </div>
      </div>
    )
  }
}

export const LearningRoom = connect(state => {
  return {
    learningRoom: state.learningRoom,
    chat: state.chat
  }
})(LearningRoomComponent)
