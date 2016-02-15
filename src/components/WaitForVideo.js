import React, { Component } from 'react'

export class WaitForVideo extends Component {

  render() {
    let isActive = ( 
      <div className="panel panel-default waiting-room">
        <div className="panel-body">
          <div className="text-center">
            <i className="fa fa-5x fa-refresh fa-spin text-center"></i>
          </div>
          <h3>Searching for a tutor...</h3>
        </div>
      </div>
    )

    let isNotActive = ( 
      <div className="minimized">
          <h5 className="WHITE-TEXT">Tutor has left this question.</h5>
      </div>
    )

    return this.props.isActive ? isActive : isNotActive
  }
}
