import React, { Component } from 'react'
import { connect } from 'react-redux'
import { firebaseRef, CATEGORIES } from '../config'


 export class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    } 
    this.chatRef = firebaseRef.child(`chat/${this.props.chatId}`)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.messages = []
  }

  componentDidMount() {
    this.chatRef.set(this.state.messages, error => {
      if (!!error) {
        console.log(error.message)
      } else {

      }
    })
  }

  componentWillUnmount() {

  }

  handleSubmit(){

    let messageRef = this.chatRef.child('messages').push()

    let message = {
      author: this.props.userName,
      text: this.textMessage.value,
      id: messageRef.key()
    }

    messageRef.set(message, error => {
      if (!!error) {
        console.log(error.message)
      } else {
        console.log('it worked')
      }
    })

    this.messages.push(message)
    this.setState({
      messages: this.messages
    })

    this.textMessage.value = " "

  }

  render() {
 
    return (
      <div className="chat-room">
        <ul className="list-clean">
          {this.state.messages.map(message => {
            if (this.props.userName === this.props.authorName) {
              return <li className="message-align-left" key={message.id}><strong>{message.author}:</strong> <span className="WHITE-TEXT">{message.text}</span></li>
            } else {
              return <li className="message-align-right" key={message.id}><span className="WHITE-TEXT">{message.text}</span> <strong>:{message.author}</strong></li>
            }
          })}
        </ul>
        <input type="text" placeholder="Write something" ref={ref => this.textMessage = ref}/>
        <button type="submit" onClick={this.handleSubmit} className="btn btn-success">Send</button>
      </div>
    )
  }
}

