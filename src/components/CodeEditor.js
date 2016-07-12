import React, { Component } from 'react'
import { firebaseRef, CODEMODES, SNIPPETS } from '../config'

export class CodeEditor extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps)
  }

  componentDidMount() {
    let editor = ace.edit('firepad-container')
    editor.setTheme('ace/theme/monokai')
    editor.$blockScrolling = Infinity;
    editor.setShowPrintMargin(false)
    let session = editor.getSession()

    session.setUseWrapMode(true)
    session.setUseWorker(false)
    session.setMode(`ace/mode/${CODEMODES[this.props.category]}`)
    this.firepad = Firepad.fromACE(firebaseRef.database().ref(`coding/${this.props.questionId}`), editor, {
      defaultText: SNIPPETS[this.props.category],
      userId: this.props.userId,
      userColor: '#234C25'
    })

  }

  render() {
    return (
      <div id="firepad-container"/>
    )
  }
}

CodeEditor.PropTypes = {
  category: React.PropTypes.string,
  questionId: React.PropTypes.string,
  userId: React.PropTypes.string
}
