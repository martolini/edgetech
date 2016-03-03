import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'


class AboutComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){

  }

  componentWillUnmount(){

  }

  render() {
    return (
      <div className="container">
        <br/>
        <br/>
        <div className="col-md-6 col-md-offset-3">
          <h5 className="CENTER-TEXT LIGHT-FONT">
            <i>"Your mind is a bit like soup, it has to be<br/> stirred up all the time
            and then interesting<br/> vegetables float to the surface and so on."</i>
            <br/>
            <br/>
            <p className="pull-right">- Prof. Martyn Poliakoff</p>
          </h5>
          <br/>
          <br/>
          <hr/>
          <h4 className="CENTER-TEXT"><span className="logo-font">Thx bro!</span>
          &nbsp; is brought to you with <i className="fa fa-heart green-heart"></i> from these handsome guys:</h4>
          <br/>
          <br/>
          <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/fists.png" className="fists"/>
          <div className="row">
            <div className="col-md-6 CENTER-TEXT">
              <h4 className="logo-font-dark">Jonas</h4>
              <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/jonas.png" />
              <ul className="list-clean">
                <br/>
                <li>
                  <i>biz & sales</i>
                </li>
                <li>
                <br/>
                <a href="mailto:jonasneraal@gmail.com" className="btn btn-success">Say hello</a>
                </li>
              </ul>
              </div>
              <div className="col-md-6 CENTER-TEXT">
              <h4 className="logo-font-dark">Øyvind</h4>
              <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/oyvind.png" />
              <ul className="list-clean">
                <br/>
                <li>
                  <i>&lt;/code&gt; & design</i>
                </li>
                <li>
                <br/>
                <a href="mailto:hellenes.91@gmail.com" className="btn btn-success">Say hello</a>
                </li>
              </ul>
            </div>
          </div>
          <hr/>
          <h4>Our vision</h4>
          <hr/>
          <h6>If you have any inqueries about <span className="logo-font-dark">Thx bro!</span> for business you can contact us &nbsp;
           <a href="mailto:jonasneraal@gmail.com" className="btn btn-success btn-sm">here</a></h6>
        </div>
      </div>
    )
  }
}

export const About = connect()(AboutComponent)
