import React, { Component } from 'react';
import { firebaseRef } from '../config'
import { Link } from 'react-router'
import { pushPath } from 'redux-simple-router'
import { connect } from 'react-redux';


export class RecentQuestionsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    };

    this.firebaseRef = firebaseRef.child(`questions/`).orderByChild('author/id').equalTo(this.props.userId).limitToLast(5)
    this.openQuestion = this.openQuestion.bind(this)
  }

  componentDidMount() {
    this.firebaseRef.on('value', snapshot => {
      if (snapshot.exists()) {
        let questions = []
        snapshot.forEach( snap => {
          let question = snap.val()
          questions.push(question)
        })
        if (questions.length > 0) {
          this.setState({
            questions: questions.reverse()
          })
        }
      };
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  openQuestion(question){
    const { dispatch } = this.props

    let openRef = firebaseRef.child(`questions/${question.id}/author/connected`)
    openRef.set(true)

    dispatch(pushPath(`/question/${question.id}`))
  }

  render() {
    
    return (
      <div>
        <h5 className="">Your 5 most recent questions:</h5>
        <table className="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Question</th>
              <th>Connected with</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            { this.state.questions.map(question => {
              let connectedWith = {
                id: null,
                username: null
              }
              if (question.author.id === this.props.userId) {
                connectedWith.username = question.tutor.username
                connectedWith.id = question.tutor.id
              } else {
                connectedWith.username = question.author.username
                connectedWith.id = question.author.id
              }
              return (
                <tr key={question.id}>
                  <td><p className="button-link" onClick={this.openQuestion.bind(this, question)}>{question.text}</p></td>
                  <td><Link to={`/user/${connectedWith.username}`} className="GREEN-TEXT" key={connectedWith.id}>{connectedWith.username}</Link></td>
                  <td>{Math.floor((new Date() - new Date(question.createdAt)) / 60000 )} minutes ago</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

export const RecentQuestions = connect()(RecentQuestionsComponent)
