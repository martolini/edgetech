import React, { Component } from 'react'

export class VideoRoom extends Component {

  render() {
    if (this.props.questionId) {
      return (
        <iframe src={"https://appear.in/" + this.props.questionId } frameBorder="0"
          width="100%" height="500px"></iframe>
      )
    }
  }
}
