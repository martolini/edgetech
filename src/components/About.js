import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pushPath } from 'redux-simple-router'


class AboutComponent extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount(){
    // Set navbar link to active
    if (document.getElementById("about-link") !== null) {
      document.getElementById("about-link").className = "active"
    }
  }

  componentWillUnmount(){
    // Set navbar link to in-active
    if (document.getElementById("about-link") !== null) {
      document.getElementById("about-link").className = ""
    }
  }

  render() {
    return (
      <div className="container">
        <br/>
        <br/>
        <div className="col-md-6 col-md-offset-3">
          <blockquote className="blockquote-reverse">
            <p className="lead">"Your mind is a bit like soup, it has to be stirred up all the time
            and then interesting vegetables float to the surface and so on."</p>
            <small>Prof. Martyn Poliakoff</small>
          </blockquote>
          <br/>
          <hr/>
          <img className="code-badge" src="https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/symbol-white.png?alt=media&token=897068c0-a50b-4a66-9d8f-2721b6983502" />

          <br/>
          <p className="CENTER-TEXT lead">
            <img src="https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/logo-main.svg?alt=media&token=e01c0cf0-4918-4384-9f0a-fc81a318c760" className="paragraphLogo"/>

            &nbsp; is brought to you with <i className="fa fa-heart green-heart"></i> from
            these handsome bros:</p>
          <br/>
          <div className="row">
            <div className="col-md-6 CENTER-TEXT">
              <h4 className="logo-font-dark">Jonas</h4>
              <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/jonas.svg" />
              <ul className="list-clean">
                <br/>
                <li>
                  <p className="lead"><i>"the biz & sales guy"</i></p>
                </li>
                <li>
                <a href="mailto:jonasneraal@gmail.com" className="btn btn-success">Say hello</a>
                </li>
              </ul>
              </div>
              <div className="col-md-6 CENTER-TEXT">
              <h4 className="logo-font-dark">Øyvind</h4>
              <img src="https://dl.dropboxusercontent.com/u/2188934/edgetech/oyvind.svg" />
              <ul className="list-clean">
                <br/>
                <li>
                  <p className="lead"><i>"the code & design guy"</i></p>
                </li>
                <li>
                <a href="mailto:hellenes.91@gmail.com" className="btn btn-success">Say hello</a>
                </li>
              </ul>
            </div>
          </div>
          <br/>
          <hr/>
          <img className="code-badge" src="https://firebasestorage.googleapis.com/v0/b/project-1024656250083069122.appspot.com/o/symbol-white.png?alt=media&token=897068c0-a50b-4a66-9d8f-2721b6983502" />
          <br/>
          <h4 className="CENTER-TEXT logo-font-dark">Our vision</h4>
          <p className="lead">At <s>IKEA</s> Thx Bro, our vision is to create a better everyday life for the many people.
          Our business idea supports this vision by offering a wide range of well-designed,
          functional home furnishing products at prices so low that as many people as possible will be
          able to afford them.</p>
          <hr/>

        </div>
      </div>
    )
  }
}

export const About = connect()(AboutComponent)
