import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'

var audio = new Audio('http://www.sheep.com/sounds/baalamb1.wav');
let previousLength = -1

class GiveHelpComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			category: 'TDT4100',
			questions: []
		}
		
		this.changeCourse = this.changeCourse.bind(this)
		this.onValueChange = this.onValueChange.bind(this)
		this.firebaseRef = firebaseRef.child(`questions/`).orderByChild('closed').equalTo(false)
		this.interval = setInterval(() => this.tick(), 60000)
	}
	
	componentWillUnmount() {
		clearInterval(this.interval);
		this.firebaseRef.off('value', this.onValueChange)
		previousLength = -1
	}

	onValueChange(snapshot) {
		
		if (snapshot.exists()) {
			let questions = []
			snapshot.forEach(snap => {
				let question = snap.val()
				if (!question.tutor) {
					questions.push(question)
				}
			})
			if (questions.length > 0) {
				this.setState({questions: questions})

				// Change title of document so tutor can get notified of incoming questions
				document.title = '(' + questions.length + ') ' + 'Thxbro!';
				
				// Check if questions.length is increasing and play notification sound if true
				if (questions.length > previousLength && previousLength !== 0) {
					previousLength = questions.length
					audio.play();
				} else {
					previousLength = questions.length
				}
			} else {
				document.title = 'Thxbro!';
			}

	  }
	}

	componentDidMount() {
		this.firebaseRef.on('value', this.onValueChange)
	}

	changeCourse(event) {
		this.setState({
			category: event.target.value
		})
	}

	tick() {
		this.forceUpdate() // Force the questions to update every minute
	}

	render() {
		return (
			<div className="container">
				<select className="form-control TOP-MARGIN-20" id="select" onChange={this.changeCourse} value={this.state.category}>
				  { CATEGORIES.map(category => <option key={category.id} value={category.id}>{ category.name }</option> )}
				</select>
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
					  				<td>{question.author.username}</td>
					  				<td>{Math.floor((new Date() - new Date(question.createdAt)) / 60000 )} minutes ago</td>
					  			</tr>
					  		)}
				  	})}
				  </tbody>
				</table>
			</div>
		)
	}
}

export const GiveHelp = connect()(GiveHelpComponent)
