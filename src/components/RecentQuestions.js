import React, { Component } from 'react';
import { firebaseRef } from '../config'
import { Link } from 'react-router'



export class RecentQuestions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: []
    };

    this.firebaseRef = firebaseRef.child(`questions/`).orderByChild('author/id').equalTo(this.props.userId).limitToLast(5)
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
            questions: questions
          })
        }
      };
    })
  }

  componentWillUnmount() {
    this.firebaseRef.off()
  }

  render() {
    
    return (
      <div>

        <table className="table table-striped table-hover">
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
                  <td>{question.text}</td>
                  <td><Link to={`/user/${connectedWith.id}`}>{connectedWith.username}</Link></td>
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


