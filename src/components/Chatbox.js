import React, { Component } from 'react'
import Pusher from 'pusher-js'
import Parse from 'parse'
import { findDOMNode } from 'react-dom'

export class Chatbox extends Component {

  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      const text = e.target.value.trim()
      this.props.sendMessage(text)
      e.target.value = ''
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let $cont = $('#chatbox')
    $cont[0].scrollTop = $cont[0].scrollHeight;
  }

  componentDidMount() {
    this.container = findDOMNode(this.chatBox)
    // let pusher = new Pusher('50e292f0d79899c3b9ca')
    // let channel = pusher.subscribe(this.props.activeQuestion.objectId)
    // channel.bind()
  }

  render() {
    let chatStyle = {
      overflowY: 'scroll',
      height: '300px'
    }
    let messageStyle = {
      marginBottom: '10px',
      paddingBottom: '5px',
      borderBottom: '1px dotted #B3A9A9'
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Get help immediately</h3>
        </div>
        <div className="panel-body" style={chatStyle}>
          <ul style={{listStyle: 'none', paddingLeft: '5px'}} ref={ref => this.chatBox = ref } id='chatbox'>
            { this.props.messages.map((message, i) => {
              return (
                <li key={i} style={messageStyle} ref={ ref => this.lastNode = ref }>
                    { message.sender + ': ' + message.text }
                </li>
                )
            })}
          </ul>
        </div>
        <div className="panel-footer">
          <input className="form-control" type="text"
            placeholder="Type here..."
            onKeyDown={this.onKeyDown} />
        </div>
      </div>
    )
  }
}
