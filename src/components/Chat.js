import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseRef, CATEGORIES } from '../config'

var chatPing = new Audio('https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/tick.mp3?alt=media&token=b5099bb3-612b-451b-97a2-45e9ea4cf68d')

 export class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: [],
      isOpen: false
    }
    this.chatRef = firebaseRef.database().ref(`organizations/${this.props.user.organization.id}/chat/${this.props.chatId}`)
    this.messageListener = this.chatRef.child('messages')
    this.handleSubmit = this.handleSubmit.bind(this)
    this.changeWindow = this.changeWindow.bind(this)
    this.messages = []
  }

  componentDidMount() {
    // Listen to new messages
    this.messageListener.on('child_added', snapshot => {

      if (snapshot.exists()) {

        let msg = snapshot.val()
        this.messages.push(msg)

        this.setState({
          messages: this.messages
        })

        this.setState({
          isOpen: true
        })

        chatPing.play()

        // Automatically scroll down when you get a new message

        if (document.getElementById('chat-box')) {
          setTimeout(() => {
            let elem = document.getElementById('chat-box');
            elem.scrollTop = elem.scrollHeight;
          }, 100)
        }

      }
    })
  }

  componentWillUnmount() {
    this.messageListener.off()
  }

  changeWindow(){

    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  handleSubmit(e){
    e.preventDefault()

    if (this.textMessage.value.trim().length !== 0) {
      // Add new message
      this.messageRef = this.messageListener.push()

      let message = {
        author: this.props.user.username,
        text: this.textMessage.value,
        id: this.messageRef.key
      }

      // Set new message with data
      this.messageRef.set(message, error => {
        if (!!error) {
          console.log(error.message)
        }
      })

      this.textMessage.value = " "

      // Automatically scroll down when you write a new message
      setTimeout(() => {
        let elem = document.getElementById('chat-box');
        elem.scrollTop = elem.scrollHeight;
      }, 100)
    }

  }

  render() {

    let closed = (
        <div className="chat-min-closed minimized" onClick={this.changeWindow}>
          <h5 className="WHITE-TEXT">Open chat
              <i className="fa fa-expand fa-fw WHITE-TEXT pull-right"></i>
          </h5>
        </div>
      )

    let open = (
      <div id="chat-room" className="chat-room-min">
        <div className="minimized" onClick={this.changeWindow}>
          <h5 className="WHITE-TEXT">Hide chat
          <i className="fa fa-compress fa-fw WHITE-TEXT pull-right"></i>
          </h5>
        </div>
        <div id="chat-box" className="chat-message-box-min">
          <ul className="list-clean">
            {this.state.messages.map(message => {
              if (this.props.user.username === message.author) {
                return (<li className="message-align-left" key={message.id}>
                    <ul className="list-inline">
                      <li className="chat-label">
                        {message.author}
                      </li>
                      <li>
                        <div className="chat-span msg-left">
                          <span className="WHITE-TEXT">{message.text}</span>
                        </div>
                      </li>
                    </ul>
                  </li>)
              } else {
                return (<li className="message-align-right" key={message.id}>
                    <ul className="list-inline">
                      <li>
                        <div className="chat-span msg-right">
                          <span className="WHITE-TEXT">{message.text}</span>
                        </div>
                      </li>
                      <li className="chat-label">
                        {message.author}
                      </li>
                    </ul>
                  </li>)
              }
            })}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit} className="chat-form">
          <input type="text" className="chat-input" placeholder="Chat away!" ref={ref => this.textMessage = ref}/>
          <button type="submit" className="btn btn-primary chat-submit-button">
            <i className="fa fa-paper-plane fa-fw"></i>
          </button>
        </form>
      </div>
    )

    let minChat = (<div>{this.state.isOpen ? open : closed}</div>)

    let chat = (
      <div id="chat-room" className="chat-room">
        <div id="chat-box" className="chat-message-box">
          <ul className="list-clean">
            {this.state.messages.map(message => {
              if (this.props.user.username === message.author) {
                return (<li className="message-align-left" key={message.id}>
                    <ul className="list-inline">
                      <li className="chat-label">
                        {message.author}
                      </li>
                      <li>
                        <div className="chat-span msg-left">
                          <span className="WHITE-TEXT">{message.text}</span>
                        </div>
                      </li>
                    </ul>
                  </li>)
              } else {
                return (<li className="message-align-right" key={message.id}>
                    <ul className="list-inline">
                      <li>
                        <div className="chat-span msg-right">
                          <span className="WHITE-TEXT">{message.text}</span>
                        </div>
                      </li>
                      <li className="chat-label">
                        {message.author}
                      </li>
                    </ul>
                  </li>)
              }
            })}
          </ul>
        </div>
        <form onSubmit={this.handleSubmit} className="chat-form">
          <input type="text" className="chat-input" placeholder="Chat away!" ref={ref => this.textMessage = ref}/>
          <button type="submit" className="btn btn-primary chat-submit-button">
            <i className="fa fa-paper-plane fa-fw"></i>
          </button>
        </form>
      </div>
    )

    return (<div>{this.props.parent.state.minScreen ? minChat : chat}</div>)
  }
}
