import React, { Component } from 'react'
import Firebase from 'firebase'

class CodeEditorComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let firepadRef = new Firebase(`https://edgetech.firebaseio.com/questions/${this.props.questionId}`)
    let editor = ace.edit('firepad-container')
    editor.setTheme('ace/theme/monokai')
    editor.$blockScrolling = Infinity;
    let session = editor.getSession()
    session.setUseWrapMode(true)
    session.setUseWorker(false)
    session.setMode('ace/mode/javascript')
    this.firepad = Firepad.fromACE(firepadRef, editor, {
      defaultText: 'function getHelp() {\n  mentorPlease();\n}',
      userId: this.props.userId
    })
  }

  render() {
    return (
      <div id="firepad-container" style={{ height: '800px', width: 'auto' }}/>
    )
  }
}

export const CodeEditor = CodeEditorComponent
