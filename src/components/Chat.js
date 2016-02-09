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
    this.messageListener = this.chatRef.child('messages')
    this.handleSubmit = this.handleSubmit.bind(this)
    this.messages = []
  }

  componentDidMount() {

    // Listen to new messages
    this.messageListener.on('child_added', snapshot => { 

      if (snapshot.exists() && snapshot.val().author !== this.props.userName) {

        // Automatically scroll down when you get a new message
        setTimeout(() => {
          let elem = document.getElementById('chat-box');
          console.log('height2' + elem.scrollHeight)
          elem.scrollTop = elem.scrollHeight;
        }, 100)

        let msg = snapshot.val()
        console.log('it worked again: ' + msg.text)
        this.messages.push(msg)
                
        this.setState({
          messages: this.messages
        })

      } else {
        console.log('something went wrong')
      }
    })

  }

  componentWillUnmount() {
    this.messageListener.off()
  }

  handleSubmit(e){
    e.preventDefault()

    // Add new message
    this.messageRef = this.messageListener.push()

    let message = {
      author: this.props.userName,
      text: this.textMessage.value,
      id: this.messageRef.key()
    }

    // Set new message with data
    this.messageRef.set(message, error => {
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

    // Automatically scroll down when you write a new message
    setTimeout(() => {
      let elem = document.getElementById('chat-box');
      elem.scrollTop = elem.scrollHeight;
    }, 100)

  }

  render() {
 
    return (
      <div id="chat-room" className="chat-room">
        <div id="chat-box" className="chat-message-box">
          <ul className="list-clean">
            {this.state.messages.map(message => {
              if (this.props.userName === message.author) {
                return (<li className="message-align-left" key={message.id}>
                    <ul className="list-inline">
                      <li className="chat-label">
                        {message.author}
                      </li>
                      <li>
                        <div className="chat-span">
                          <span className="WHITE-TEXT">{message.text}</span>
                        </div>
                      </li>
                    </ul>
                  </li>)
              } else {
                return (<li className="message-align-right" key={message.id}>
                    <ul className="list-inline">
                      <li>
                        <div className="chat-span">
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
  }
}

