import React, { Component } from 'react'

export class VideoRoom extends Component {

  render() {
    if (this.props.questionId) {
      return (
        <iframe src={"https://appear.in/" + this.props.questionId } width="auto" height="600" frameBorder="0"></iframe>
      )
    }
  }
}
