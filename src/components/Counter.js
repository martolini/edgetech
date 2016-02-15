import React, { Component } from 'react';
import { firebaseRef, LEVELS } from '../config'

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      active: this.props.isTutor,
      karmaUpdate: 10
    }

    this.firebaseRef = firebaseRef.child(`sessioncounters/${this.props.question.id}/counter`)
    this.pauseCounter = this.pauseCounter.bind(this)
    this.updateCallback = snapshot => this.setState({counter: snapshot.val()})
    this.interval = setInterval(() => this.tick(), 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isTutor === false && this.props.isTutor === true) {
      this.setState({
        active: true
      })
    }
  }

  componentDidMount() {
    this.firebaseRef.on('value', this.updateCallback)
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.question.id !== nextProps.question.id || this.props.isTutor !== nextProps.isTutor || this.state.counter !== nextState.counter || this.active !== this.state.active
  }

  tick() {
    if (this.props.isTutor && this.state.active) {
      // Increment the counter
      this.firebaseRef.transaction(counter => counter + 1)

      // Check if we should give new karmapoints
      if (this.state.counter === this.state.karmaUpdate && this.props.question.isActive) {

        // Fetch karma reference
        let karmaRef = firebaseRef.child(`users/${this.props.question.tutor.id}/karma`)
        karmaRef.transaction(karma => {

          // Check if tutor should be given a new rank
          if (this.props.thisUser.karma >= this.props.thisUser.level.nextLevel - 5) {
            
            // Fetch level reference
            let levelRef = firebaseRef.child(`users/${this.props.question.tutor.id}/level`)
            
            // Increment level by one
            levelRef.set(LEVELS[this.props.thisUser.level.id + 1])
          }
          return karma + 5 // Increment karma by 5 points
        })
        this.setState({
          karmaUpdate: this.state.karmaUpdate + 300 // Adding 5p karma every 5 minute
        }) 
      }
    }
  }

  pauseCounter() {
    this.setState({
      active: !this.state.active
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.firebaseRef.off('value', this.updateCallback)
  }

  render() {
    let pauseButton = null
    if (this.props.isTutor) {
      pauseButton = (
        <li>
          <button type="button" className="btn btn-default" onClick={this.pauseCounter}>
            {this.state.active ? <i className="fa fa-pause"></i> : <i className="fa fa-play"></i>}
          </button>
        </li>
      )
    }
    let minutes = Math.floor(this.state.counter / 60)
    let seconds = this.state.counter % 60;
    if (seconds < 10)
      seconds = '0' + seconds
    return (
      <div>
        <ul className="list-inline">
          { pauseButton}
          <li>
            <h5 className="WHITE-TEXT">
              { minutes }:{ seconds }
            </h5>
          </li>
        </ul>
      </div>
    );
  }
}
