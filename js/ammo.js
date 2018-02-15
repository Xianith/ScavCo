import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Ammo extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {

  }

  render() {
    return ( 
      <div className="jumbotron contentcontainer" id="Ammo" style={{display: "none"}}>
        <center>
        <iframe id="legend" className="trader-frame" width="100%" height="600px" frameBorder="0" scrolling="no" src="html/ammo.html"></iframe>
        </center>
      </div>);
  }
}