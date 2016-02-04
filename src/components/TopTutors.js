import React, { Component } from 'react';
import { firebaseRef } from '../config'
import { Link } from 'react-router'



export class TopTutors extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topTutors: [] 
    }

    this.tutorsRef = firebaseRef.child(`users/`).orderByChild('karma').limitToLast(10)
  }

  componentDidMount() {
    this.tutorsRef.once('value', snapshot => {
      if (snapshot.exists()) {
        let users = []
        snapshot.forEach( snap => {
          let user = snap.val()
          users.push(user)
        })
        this.setState({
          topTutors: users
        })
      }
    })
  }

  render() {
    
    return (
      <div>

        <h4>Top 10 tutors:</h4>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className="">
            { this.state.topTutors.reverse().map((user, index) => {

              return (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td><Link to={`/user/${user.username}`} className="GREEN-TEXT" key={user.username}>{user.username}</Link></td>
                  <td>{user.karma}p</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}


