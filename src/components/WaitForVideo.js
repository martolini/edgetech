import React, { Component } from 'react'

export class WaitForVideo extends Component {

  render() {
    let isActive = ( 
      <div>
        <div className="text-center">
          <i className="fa fa-5x fa-refresh fa-spin text-center"></i>
        </div>
        <h3>Searching for a tutor...</h3>
      </div>
    )

    let isNotActive = ( 
      <h3>Tutor has left this question.</h3>
    )

    return (
      <div className="panel panel-default waiting-room">
        <div className="panel-body">
          { this.props.isActive ? isActive : isNotActive}
        </div>
      </div>
    )
  }
}
