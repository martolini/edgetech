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

    this.authorRef = firebaseRef.child(`questions/`).orderByChild('author/id').equalTo(this.props.userId)
    this.tutorRef = firebaseRef.child(`questions/`).orderByChild('tutor/id').equalTo(this.props.userId)
    this.openQuestion = this.openQuestion.bind(this)
    this.sortQuestions = this.sortQuestions.bind(this)
  }

  componentDidMount() {
    this.authorRef.once('value', snapshot => {
      if (snapshot.exists()) {
        let authorQuestions = []
        snapshot.forEach( snap => {
          let authorQuestion = snap.val()
          authorQuestions.push(authorQuestion)
        })
        this.tutorRef.once('value', snapshot => {
          if (snapshot.exists()) {
            let tutorQuestions = []
            snapshot.forEach( snap => {
              let tutorQuestion = snap.val()
              tutorQuestions.push(tutorQuestion)
            })

            if (tutorQuestions.length > 0 || authorQuestions.length > 0) {
              let questions = this.sortQuestions(tutorQuestions, authorQuestions)
              this.setState({
                questions: questions.reverse()
              })
            }
          }
        })

      };
    })
  }

  sortQuestions(tutor, author){
    let questions = []
    while (true) {
      if (tutor[0].createdAt < author[0].createdAt) {
        questions.push(tutor.shift())
        if (tutor === undefined || tutor.length == 0) {
          return questions.concat(author)
        }
      } else {
        questions.push(author.shift())
        if (author === undefined || author.length == 0) {
          return questions.concat(tutor)
        }
      }
    }
  }

  componentWillUnmount() {
    this.authorRef.off()
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
        <h5 className="">Your most recent questions:</h5>
        <div className="recent-question-scrollframe">
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
                  <td className="recent-question-text"><p className="button-link" onClick={this.openQuestion.bind(this, question)}>{question.text}</p></td>
                  <td><Link to={`/user/${connectedWith.username}`} className="GREEN-TEXT" key={connectedWith.id}>{connectedWith.username}</Link></td>
                  <td className="WHITE-TEXT">{Math.floor(((new Date() - new Date(question.createdAt)) / 60000)/1440 )} days ago</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
    )
  }
}

export const RecentQuestions = connect()(RecentQuestionsComponent)
