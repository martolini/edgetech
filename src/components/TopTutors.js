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
          topTutors: users.reverse()
        })
      }
    })
  }

  render() {
    
    return (
      <div>
        <h4 className="logo-font-dark CENTER-TEXT">Who is helping out the most?</h4>
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody className="">
            { this.state.topTutors.map((user, index) => {
              
              return (
                <tr key={user.id}>
                  <td className="WHITE-TEXT">{index + 1}</td>
                  <td><Link to={`/user/${user.username}`} className="GREEN-TEXT">{user.username} <span dangerouslySetInnerHTML={{__html: user.level.stars}}></span></Link></td>
                  <td className="WHITE-TEXT">{user.karma}p</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }
}

