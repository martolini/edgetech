import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES, LEVELS } from '../config'
import { askQuestion } from '../actions'
import { TopTutors } from './TopTutors'
import { Search } from './Search'

class AskQuestionComponent extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount(){
    // Set navbar link to active
    if (document.getElementById("get-help-link") !== null) {
      document.getElementById("get-help-link").className = "active"
    }
    if (this.props.user.hasLeveledUp) {
      $('#newLevelModal').modal()
      let hasLeveledUpRef = firebaseRef.database().ref(`organizations/${this.props.user.orgId}/users/${this.props.user.id}/hasLeveledUp`)
      hasLeveledUpRef.set(false)
    }
  }

  componentWillUnmount(){
    // Set navbar link to in-active
    if (document.getElementById("get-help-link") !== null) {
      document.getElementById("get-help-link").className = ""
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    const { dispatch } = this.props
    let question = {
      text: this.text.value.trim(),
      category: this.category.value,
      org: this.props.user.organization,
      author: {
        id: this.props.user.id,
        username: this.props.user.username,
        connected: true,
      },
      tutor: {
        id: null,
        username: null,
        email: null,
        connected: false
      }
    }
    if (this.text.value.length > 0) {
      dispatch(askQuestion(question))
    } else {
      document.getElementById('form-error').innerHTML =
        '<br/>' +
        '<div class="alert alert-dismissible alert-warning">' +
          '<strong>You need to specify what you need help with!</strong>' +
        '</div>'
    }
  }


  render() {
    let spinner = <i className="fa fa-fw fa-spin fa-spinner"></i>
    return (
      <div>
        <div className="container">
          <br/>
          <br/>
          <div className="col-md-6 col-md-offset-3">
            <div className="modal" id="newLevelModal">
              <div className="modal-dialog">
                <div className="modal-content learningroom-modal">
                  <div className="modal-header">
                    <h3 className="modal-title WHITE-TEXT">Congratulations!</h3>
                    <h1>
                      <img src={this.props.user.level.badge} />
                    </h1>
                  </div>
                  <div className="modal-body">
                    <h5 className="WHITE-TEXT">
                      You've just been promoted to the rank of {this.props.user.level.rank}!
                    </h5>
                  </div>
                  <div className="modal-footer learningroom-modal-footer">
                    <button type="button" data-dismiss="modal" className="btn btn-success btn-lg">
                      Awesome!
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <img className="seriously scaling" src="https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/seriously.png?alt=media&token=9a3f5167-9118-4792-93e4-9507d063cfc5" />
            <form className="ask-questions-form" onSubmit={this.handleSubmit}>
              <h3 className="logo-font-white">What do you need help with?</h3>
              <div className="form-group">
                <label className="WHITE-TEXT" htmlFor="select">Languages:</label>
                <select className="form-control WHITE-TEXT" id="select"
                  ref={ref => this.category = ref}>
                  { CATEGORIES.map(category => {
                    // Only enable Test option in dev mode
                    if ((window.location.href).indexOf('localhost') !== -1 && category.id !== 'Test') {
                      // Do nothing.
                    } else {
                      return <option key={category.id} className="DARK-TEXT" value={category.id}>{ category.name }</option>
                    }
                    })
                  }
                </select>
              </div>

              <div id="text-input" className="form-group" >
                <label className="WHITE-TEXT" htmlFor="text">Problem:</label>
                <input type="text" className="form-control WHITE-TEXT" id="text"

                  ref={ref => this.text = ref} maxLength="180"/>
                <div id="form-error"></div>
              </div>
              <br/>
              <div className="button-group">
                <button type="submit" className="btn btn-lg btn-default ">
                  { this.props.loading ? spinner : 'Ask question' }
                </button>
              </div>
            </form>
            <br/>
            <br/>

            <ul className="nav nav-tabs">
              <li className="active ask-nav-tabs">
              <a href="#home" data-toggle="tab" aria-expanded="false">Top score list</a>
              </li>
              <li className="ask-nav-tabs">
                <a href="#profile" data-toggle="tab" aria-expanded="true">Search</a>
              </li>
            </ul>
            <div id="myTabContent" className="tab-content">
              <div className="tab-pane fade active in" id="home">
                <br/>
                <TopTutors user={this.props.user}/>
              </div>
              <div className="tab-pane fade" id="profile">
                <br/>
                <Search user={this.props.user}/>
              </div>
            </div>


          </div>
        </div>

      </div>
    )
  }
}

export const AskQuestion = connect()(AskQuestionComponent)
