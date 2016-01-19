import React, { Component } from 'react'
import { CodeEditor } from './CodeEditor'
import { VideoRoom } from './VideoRoom'
import { Counter } from './Counter'
import { WaitForVideo } from './WaitForVideo'
import { firebaseRef } from '../config'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { Link } from 'react-router'
require('../css/Learningroom.css')

class LearningRoomComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      question: null
    }

    this.questionRef = firebaseRef.child(`questions/${this.props.params.id}`)
    this.questionRef.child(`connected/${this.props.user.id}`).onDisconnect().remove()
    this.leaveRoom = this.leaveRoom.bind(this)
  }

  componentWillUnmount() {
    
    console.log('Number' + Object.keys(this.state.question.connected).length)
    console.log('Tutor' + this.state.question.tutor.username)
    
    // If you are the last person to leave, the question will be closed.
    if (Object.keys(this.state.question.connected).length === 1) {
      console.log('Pass')
      this.questionRef.child('closed').set(true)
    }
  
    this.questionRef.off()
      
  }

  componentDidMount() {
    this.questionRef.on('child_added', snapshot => {
      this.setState({
        question: Object.assign({}, this.state.question, { [snapshot.key()] : snapshot.val()})
      })
    })
    this.questionRef.on('child_changed', snapshot => {
      this.setState({
        question: Object.assign({}, this.state.question, { [snapshot.key()]: snapshot.val()})
      })
    })
    this.questionRef.once('value', snapshot => {
      if (!snapshot.exists()) {
        this.setState({
          loading: false,
          error: 'This is an invalid question'
        })
      } else {
        let question = snapshot.val()
        if (question.author.id !== this.props.user.id) {
          if (question.tutor !== false) {
            if (question.tutor.id !== this.props.user.id) {
              return this.setState({
                loading: false,
                error: 'Someone else is tutoring this...'
              })
            }
          } else {
            setTimeout(() => this.questionRef.child('tutor').set({
              id: this.props.user.id,
              username: this.props.user.username
            }), 100)
          }
        } 
        this.setState({
          question: Object.assign({}, question, { connected: {}}),
          loading: false,
          error: null
        })
        setTimeout(() => this.questionRef.child(`connected/${this.props.user.id}`).set(true), 100)
        
      }
    })
  }

  leaveRoom() {

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
    let connectedWith = this.state.question.author.username
    if (this.state.question.author.id === this.props.user.id) {
      if (this.state.question.tutor === false) {
        connectedWith = 'No one'
      } else {
        connectedWith = this.state.question.tutor.username
      }
    }
    return (

      <div>
        <nav className="navbar navbar-inverse" style={{marginBottom: 0}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/app" className="navbar-brand logo-font">
                Thxbro!
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" >{ this.props.user.email }</a>
                </li>
                <li>
                  <a href="#" >Connected with: { connectedWith }</a>
                </li>
                <li>
                  <a className="counter">
                    <Counter questionId={this.state.question.id} isTutor={ this.state.question.tutor.id === this.props.user.id }/>
                  </a>
                </li>
                <li>
                  <Link to="/ask" onClick={this.leaveRoom} className="btn btn-success btn-lg leave-room-btn">I'm Done!</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container-fluid learningroom-container">
          <div className="col-xs-8">
            <ul className="list-inline">
              <li>
                Question:
              </li>
              <li>
                <h5 className="WHITE-TEXT">{ this.state.question.text }</h5>
              </li>
            </ul>

            <CodeEditor
              questionId={ this.state.question.id }
              category={ this.state.question.category }
              userId={this.props.user.id}
            />
          </div>
          <div className="video-position col-xs-4">
            { Object.keys(this.state.question.connected).length === 2 ? <VideoRoom questionId={ this.props.params.id }/> : <WaitForVideo /> }
          </div>
        </div>
      </div>
    )
  }
}

export const LearningRoom = connect()(LearningRoomComponent)
