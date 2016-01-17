import React, { Component } from 'react';
import { firebaseRef } from '../config'

export class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      active: this.props.isTutor
    };

    this.firebaseRef = firebaseRef.child(`sessioncounters/${this.props.questionId}/counter`)
    this.pauseCounter = this.pauseCounter.bind(this)
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
    this.firebaseRef.on('value', snapshot => {
      this.setState({counter: snapshot.val()})
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.questionId !== nextProps.questionId || this.props.isTutor !== nextProps.isTutor || this.state.counter !== nextState.counter || this.active !== this.state.active
  }

  tick() {
    if (this.props.isTutor && this.state.active) {
      this.firebaseRef.transaction(counter => counter + 1)
    }
  }

  pauseCounter() {
    this.setState({
      active: !this.state.active
    })
  }

  componentWillUnmount() {
    clearInterval(this.interval);
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
