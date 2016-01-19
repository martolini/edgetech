import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'
import { firebaseRef, CATEGORIES } from '../config'

class GiveHelpComponent extends Component {

	constructor(props) {
		super(props)
		this.state = {
			category: 'TDT4100',
			questions: [],
			counter: 0
		}

		this.changeCourse = this.changeCourse.bind(this)
		this.firebaseRef = firebaseRef.child(`questions/`).orderByChild('closed').equalTo(false)
		this.convertToDate = this.convertToDate.bind(this)
		this.interval = setInterval(() => this.tick(), 1000)
	}

	componentWillUnmount() {
		clearInterval(this.interval);
		this.firebaseRef.off()
	}

	componentDidMount() {
		this.firebaseRef.on('value', snapshot => {
		  if (snapshot.exists()) {
		      let questions = []
		      snapshot.forEach(question => {

		      	if (!question.val().closed && !question.val().tutor) {
		        	questions.push(question.val())
		      	};
		      })
		      this.setState({questions: questions})
		  }
		})
	}

	changeCourse(event) {
		this.setState({
			category: event.target.value
		})
	}

	convertToDate(stamp) {
		let time = new Date(stamp * 1000)
		let now = Date.now()

		if ((now-stamp) > 3600000)
			return "+60"
		else
			return Math.floor(((now-stamp)/ 1000)/60)
	}

	// This counter is only used to update question.createdAt every minute.
	tick() {
		this.forceUpdate()
	  // this.setState({
	  //   counter: this.state.counter + 1
	  // });
	}

	render() {
		return (
			<div className="container">
				<select className="form-control" id="select" onChange={this.changeCourse} value={this.state.category}>
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
