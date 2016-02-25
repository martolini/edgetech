import React, { Component } from 'react'

export class VideoRoom extends Component {

	constructor(props){
		super(props)
	}

  render() {
    if (this.props.questionId) {
      return (
				<div>
					<iframe src={"https://appear.in/" + this.props.questionId } frameBorder="0" className="video-room"
						width="100%" height="430px"></iframe>
				</div>
      )
    }
  }
}
