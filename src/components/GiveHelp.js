import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'

var audio = new Audio('https://dl.dropboxusercontent.com/u/2188934/sound.mp3');

class GiveHelpComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			category: 'Java',
			questions: [],
			emptyTable: true
		}
		
		this.changeCourse = this.changeCourse.bind(this)
		this.onValueChange = this.onValueChange.bind(this)
		this.updateTitle = this.updateTitle.bind(this)
		this.firebaseRef = firebaseRef.child(`questions/`).orderByChild('author/connected').equalTo(true)
		this.interval = setInterval(() => this.tick(), 60000)
		this.enableNotification = this.enableNotification.bind(this)

		this.previousLength = -1
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
		this.firebaseRef.off('value', this.onValueChange)

		// Set navbar link to in-active
		if (document.getElementById("give-help-link") !== null) {
			document.getElementById("give-help-link").className = ""
		}
	}

	onValueChange(snapshot) {
		if (snapshot.exists()) {
			
			let questions = []
			snapshot.forEach(snap => {
				let question = snap.val()
				if (!question.tutor.id) {
					questions.push(question)
				}
			})
			if (questions.length > 0) {
				this.setState({questions: questions})
			} else {
				this.setState({questions: []})
			}
			this.updateTitle(this.state.category)

	  } else {
	  	this.setState({questions: []})
	  	this.updateTitle(this.state.category)
	  }
	}

	componentDidMount() {
		this.firebaseRef.on('value', this.onValueChange)
		if (this.props.user.enabledNotification) {
			document.getElementById('onRadioBtn').checked = true
		} else {
			document.getElementById('offRadioBtn').checked = true
		}

		// Set navbar link to active
		if (document.getElementById("give-help-link") !== null) {
			document.getElementById("give-help-link").className = "active"
		}

		if (this.props.user.hasLeveledUp) {
		  $('#newLevelModal').modal()
		  let hasLeveledUpRef = firebaseRef.child(`users/${this.props.user.id}/hasLeveledUp`) 
		  hasLeveledUpRef.set(false)
		}
	}

	changeCourse(event) {
		this.setState({
			category: event.target.value
		})
		this.previousLength = -1
		this.updateTitle(event.target.value)
	}

	tick() {
		this.forceUpdate() // Force the questions to update every minute
	}

	updateTitle(category){
		if (this.state.questions.length > 0) {
			let questionsLength = 0
			this.state.questions.map(question => {
				if (question.category === category) {
					questionsLength++
				}
			})
			// Change title of document so tutor can get notified of incoming questions
			document.title = '(' + questionsLength + ') ' + 'Thxbro!';
			// Check if questions.length is increasing and play notification sound if true
			if (questionsLength > this.previousLength && this.previousLength !== -1) {
				audio.play()
			}
			
			this.previousLength = questionsLength

			if (questionsLength > 0) {
				this.setState({
					emptyTable: false
				})
			} else {
				this.setState({
					emptyTable: true
				})
			}
		} else {
			document.title = 'Thxbro!';
			this.previousLength = 0
			this.setState({
				emptyTable: true
			})
		}

	}

	enableNotification(){
		let user = firebaseRef.child(`users/${this.props.user.id}`)
		user.update({
			enabledNotification: document.getElementById('onRadioBtn').checked
		})
	}

	render() {
		let noStudentsInNeed = (<h3 className="no-students-in-need">No students in need at the moment!</h3>)
		return (
			<div className="container">
				<div className="TOP-MARGIN-20">
					<div className="modal" id="newLevelModal">
					  <div className="modal-dialog">
					    <div className="modal-content learningroom-modal">
					      <div className="modal-header">
					        <h3 className="modal-title WHITE-TEXT">Congratulations!</h3>
					        <h1><span dangerouslySetInnerHTML={{__html: this.props.user.level.stars}}></span></h1>
					      </div>
					      <div className="modal-body">
					        <h5 className="WHITE-TEXT">You've just been promoted to the rank of {this.props.user.level.rank}!</h5>
					      </div>
					      <div className="modal-footer learningroom-modal-footer">
					        <button type="button" data-dismiss="modal" className="btn btn-success btn-lg">Awesome!</button>
					      </div>
					    </div>
					  </div>
					</div>
					<ul className="list-inline">
						<li className="topics-li">
							<p><strong>Topics: </strong></p>
						</li>
						<li>
							<select className="form-control give-help-select" id="select" onChange={this.changeCourse} value={this.state.category}>
							  { CATEGORIES.map(category => <option key={category.id} value={category.id}>{ category.id }</option> )}
							</select>	
						</li>				
						<li className="pull-right">
							<label className="radio-inline"><input id="onRadioBtn" type="radio" name="optradio" onClick={this.enableNotification}/>On</label>
							<label className="radio-inline"><input id="offRadioBtn" type="radio" onClick={this.enableNotification} name="optradio"/>Off</label>  
						</li>					
						<li className="pull-right">
							<p><strong>Email notifications: </strong></p>
						</li>
					</ul>
				</div>
				<table className="table table-striped table-hover">
				  <thead>
				    <tr>
				      <th>Question</th>
				      <th>Student</th>
				      <th>Time</th>
				    </tr>
				  </thead>
				  <tbody>
				  	{ this.state.questions.map(question => {
				  		if(question.category === this.state.category) {
					  		return (
					  			<tr key={question.id}>
					  				<td><Link className="GREEN-TEXT" to={`/question/${question.id}`}>{question.text}</Link></td>
					  				<td className="WHITE-TEXT">{question.author.username}</td>
					  				<td className="WHITE-TEXT">{Math.floor((new Date() - new Date(question.createdAt)) / 60000 )} minutes ago</td>
					  			</tr>
					  		)}
				  	})}
				  </tbody>
				</table>
				{ this.state.emptyTable ? noStudentsInNeed : null }
			</div>
		)
	}
}

export const GiveHelp = connect()(GiveHelpComponent)
