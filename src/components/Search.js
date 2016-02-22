import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'
import { Link } from 'react-router'

export class Search extends Component {
  constructor(props) {
    super(props)
    
    this.state = {

      userSearch: {},
      users: []
    }
    
    this.userRef = firebaseRef.child('users/')
    this.userSearch = this.userSearch.bind(this)

  }

  componentDidMount(){

    this.userRef.once("value", snapshot => {

      if (snapshot.exists()) {

        let users = []
        snapshot.forEach(user => {
          users.push(user.val())

        })

        this.setState({
          users: users
        })

      }
    })
  }

  userSearch() {

    this.setState({
      userSearch: this.searchText.value.trim()
    })

  }

  render() {
    let table = (
      <table className="table table-bordered table-striped table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Username</th>
            <th>Rank</th>
            <th>Karma</th>
          </tr>
        </thead>
        <tbody>
          { this.state.users.map((user, index) => {
            if (user.username.indexOf(this.state.userSearch) !== -1 ) {
              return (
                <tr key={user.id}>
                  <td className="WHITE-TEXT">{index + 1}</td>
                  <td><Link to={`/user/${user.username}`} className="GREEN-TEXT">{user.username}</Link></td>
                  <td className="WHITE-TEXT">{ user.level !== undefined ? user.level.rank : null }</td>
                  <td className="WHITE-TEXT">{user.karma}</td>
                </tr>
              )
            } else {
              return null
            }
          })}
        </tbody>
      </table>
      )

    return (
      <div>
            <input type="text" className="form-control" onKeyUp={this.userSearch} placeholder="Search for a username" ref={ref => this.searchText = ref}/>
            <br/>
            { this.state.userSearch.length > 0 ? table : null}

      </div>
    )
  }
}
