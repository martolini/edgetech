import React, { Component } from 'react'

export class VideoRoom extends Component {

	constructor(props){
		super(props)
		this.changeWindow = this.changeWindow.bind(this)
	}

	changeWindow(){

		if ($(window).height() < 775 && !this.props.parent.state.isOpenWindow) {
			this.props.parent.setState({
				minScreen: true
			})
		} else if (this.props.parent.state.isOpenWindow) {
			this.props.parent.setState({
				minScreen: false
			})

			setTimeout(() => {
			  if (this.props.parent.state.isOpenWindow && document.getElementById("chat-room")) {
			    document.getElementById("chat-room").className = "chat-room"
			    document.getElementById("chat-box").className = "chat-message-box"
			  } else if (document.getElementById("chat-room")){
			    document.getElementById("chat-room").className = "chat-room-min"
			    document.getElementById("chat-box").className = "chat-message-box-min"
			  }
			}, 500)
		}

		this.props.parent.setState({
			isOpenWindow: !this.props.parent.state.isOpenWindow
		})

		if (!this.props.parent.state.isOpenWindow && document.getElementById("chat-room")) {
			document.getElementById("chat-room").className = "chat-room"
			document.getElementById("chat-box").className = "chat-message-box"
		} else if (document.getElementById("chat-room")){
			document.getElementById("chat-room").className = "chat-room-min"
			document.getElementById("chat-box").className = "chat-message-box-min"
		}
	}

  render() {
    if (this.props.questionId) {
    	let min = ( <div className="minimized " onClick={this.changeWindow}>
    			<h5 className="WHITE-TEXT">Click to show video room
	    			  <i className="fa fa-expand fa-fw WHITE-TEXT pull-right"></i>
    			</h5>
    		</div> )
    	let max = ( <div><button onClick={this.changeWindow} className="input-group-addon WHITE-TEXT hide-room-button">Hide video room <i className="fa fa-compress fa-fw"></i></button>
    		<iframe src={"https://appear.in/" + this.props.questionId } frameBorder="0" className="video-room"
          width="100%" height="430px"></iframe></div> )
      return (
      	<div>
      	{ this.props.parent.state.isOpenWindow ? max : min }
      	</div>
      )
    }
  }
}
