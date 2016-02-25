import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'

var audio = new Audio('https://dl.dropboxusercontent.com/u/2188934/edgetech/sound.mp3');

class GiveHelpComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			category: 'Java',
			questions: [],
			emptyTable: true,
			categoryCount: {}
		}

		this.changeCourse = this.changeCourse.bind(this)
		this.onValueChange = this.onValueChange.bind(this)
		this.updateTitle = this.updateTitle.bind(this)
		this.firebaseRef = firebaseRef.child(`questions/`).orderByChild('author/connected').equalTo(true)
		this.interval = setInterval(() => this.tick(), 60000)
		this.enableNotification = this.enableNotification.bind(this)
		this.goToQuestion = this.goToQuestion.bind(this)

		this.previousLength = -1
		this.prevId = 0
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

		this.changeCourse(this.state.category)

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

	changeCourse(id) {
		this.setState({
			category: id
		})
		this.previousLength = -1
		this.updateTitle(id)

		// Toggle active class state
		if (id !== this.prevId) {
			document.getElementById(id).className = "list-group-item give-help-sidenav-active"
			if (this.prevId !== 0) {
				document.getElementById(this.prevId).className = "list-group-item give-help-sidenav GREEN-TEXT"
			}
			this.prevId = id
		}

	}

	tick() {
		this.forceUpdate() // Force the questions to update every minute
	}

	updateTitle(category){
		if (this.state.questions.length > 0) {
			let questionsLength = 0

			let categoryCount = {}

			CATEGORIES.map(cat => {
				categoryCount[cat.id] = 0
			})

			this.state.questions.map(question => {
				categoryCount[question.category]++
			})

			// Change title of document so tutor can get notified of incoming questions
			document.title = '(' + categoryCount[category] + ') ' + 'Thxbro!';
			// Check if questions.length is increasing and play notification sound if true
			if (categoryCount[category] > this.previousLength && this.previousLength !== -1) {
				audio.play()
			}

			this.previousLength = categoryCount[category]

			if (categoryCount[category] > 0) {
				this.setState({
					emptyTable: false,
					categoryCount: categoryCount
				})
			} else {
				this.setState({
					emptyTable: true,
					categoryCount: categoryCount
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

	goToQuestion(question){
		const { dispatch } = this.props
		dispatch(pushPath(`/question/${question.id}`))
	}

	render() {
		let noStudentsInNeed = (<h3 className="no-students-in-need logo-font">No students in need with {this.state.category} at the moment!</h3>)
		return (
			<div className="container">
				<div className="TOP-MARGIN-20"></div>
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
					<div className="col-xs-3">

						<div className="list-group give-help-sidebar">
							<span className="list-group-item give-help-sidenav-top"><strong>Languages</strong></span>
							{ CATEGORIES.map(category => {
								return (
									<h6 key={category.id} id={category.id} className="list-group-item give-help-sidenav GREEN-TEXT" onClick={this.changeCourse.bind(this, category.id)} value={category.id}>
										{ this.state.categoryCount[category.id] > 0 && this.state.category !== category.id ? <span className="badge">{this.state.categoryCount[category.id]}</span> : null }
										{ category.id }
									</h6>
									)
							})}
						</div>
					</div>
					<div className="col-xs-9">
							<ul className="list-inline">

								<li className="pull-right">
									<label className="radio-inline"><input id="onRadioBtn" type="radio" name="optradio" onClick={this.enableNotification}/>On</label>
									<label className="radio-inline"><input id="offRadioBtn" type="radio" onClick={this.enableNotification} name="optradio"/>Off</label>
								</li>
								<li className="pull-right">
									<p><strong>Email notifications: </strong></p>
								</li>
							</ul>

						<table className="table table-bordered table-striped table-hover">
						  <thead>
						    <tr>
						      <th className="give-help-tr">Question</th>
						      <th className="give-help-tr">Student</th>
						      <th className="give-help-tr">Time</th>
						      <th className="give-help-tr"></th>
						    </tr>
						  </thead>
						  <tbody>
						  	{ this.state.questions.map(question => {
						  		if(question.category === this.state.category) {
							  		return (
							  			<tr key={question.id} >
							  				<td className="give-help-tr"><Link className="GREEN-TEXT" to={`/question/${question.id}`}>{question.text}</Link></td>
							  				<td className="give-help-tr WHITE-TEXT">{question.author.username}</td>
							  				<td className="give-help-tr WHITE-TEXT">{Math.floor((new Date() - new Date(question.createdAt)) / 60000 )} minutes ago</td>
							  				<td className="WHITE-TEXT pull-right"><button className="btn btn-success" onClick={this.goToQuestion.bind(this, question)}>Give Help!</button></td>
							  			</tr>
							  		)}
						  	})}
						  </tbody>
						</table>
						{ this.state.emptyTable ? noStudentsInNeed : null }
					</div>
			</div>
		)
	}
}

export const GiveHelp = connect()(GiveHelpComponent)
