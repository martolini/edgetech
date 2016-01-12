import React, { Component } from 'react'
import { firebaseRef, CODEMODES } from '../config'

export class CodeEditor extends Component {

  componentDidMount() {
    let editor = ace.edit('firepad-container')
    editor.setTheme('ace/theme/monokai')
    editor.$blockScrolling = Infinity;
    let session = editor.getSession()
    session.setUseWrapMode(true)
    session.setUseWorker(false)
    session.setMode(`ace/mode/${CODEMODES[this.props.category]}`)
    this.firepad = Firepad.fromACE(firebaseRef.child(`coding/${this.props.questionId}`), editor, {
      defaultText: 'function getHelp() {\n  mentorPlease();\n}',
      userId: this.props.userId
    })
  }

  render() {
    return (
      <div id="firepad-container" style={{ height: '500px', width: 'auto' }}/>
    )
  }
}

CodeEditor.PropTypes = {
  category: React.PropTypes.string,
  questionId: React.PropTypes.string,
  userId: React.PropTypes.string
}
