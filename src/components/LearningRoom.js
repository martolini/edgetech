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
    this.leaveRoom = this.leaveRoom.bind(this)
  }

  componentWillUnmount() {
  
    // If you are the last person to leave, the question will be closed.
    if (this.props.user.id === this.state.question.author.id) {
      this.questionRef.child('author/connected').set(false)
      this.questionRef.child('tutor/connected').set(false)
    } else {
      this.questionRef.child('tutor/connected').set(false)
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
              username: this.props.user.username,
              connected: true
            }), 100)
            this.questionRef.child('tutor/connected').onDisconnect().set(false)
          }
        } else {
          this.questionRef.child('author/connected').onDisconnect().set(false)
        }
        this.setState({
          question: Object.assign({}, question, {}),
          loading: false,
          error: null
        })
        
      } 
    })
  }

  leaveRoom() {
    if (this.state.question.author.id === this.props.user.id && this.state.question.tutor.connected) {
      // trigger modal
      $('#leaveModal').modal()
    } else {
      // leave room
      const { dispatch } = this.props
      dispatch(pushPath('/ask'))
    }
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
    } else if (this.state.question.author.connected === false) {
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
        <nav className="navbar navbar-inverse learningroom-nav" style={{marginBottom: 0}}>
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-2">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to="/ask" className="navbar-brand logo-font">
                Thx bro!
              </Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-2">
              <ul className="nav navbar-nav navbar-right">
                <li>
                  <a href="#" >{ this.props.user.username }</a>
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
                  <button data-toggle="modal" onClick={this.leaveRoom} className="btn btn-success btn-lg leave-room-btn">I'm Done!</button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="modal" id="leaveModal">
          <div className="modal-dialog">
            <div className="modal-content learningroom-modal">
              <div className="modal-header">
                <h3 className="modal-title WHITE-TEXT">Before you leave</h3>
              </div>
              <div className="modal-body">
                <h5 className="WHITE-TEXT">Are you happy with the help you got?</h5>
              </div>
              <div className="modal-footer learningroom-modal-footer">
                <Link to="/ask" type="button" className="btn btn-success btn-lg" data-dismiss="modal">Yes</Link>
                <Link to="/ask" type="button" className="btn btn-success btn-lg">No</Link>
              </div>
            </div>
          </div>
        </div>
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
            { this.state.question.tutor.connected ? <VideoRoom questionId={ this.props.params.id }/> : <WaitForVideo /> }
          </div>
        </div>
      </div>
    )
  }
}

export const LearningRoom = connect()(LearningRoomComponent)
