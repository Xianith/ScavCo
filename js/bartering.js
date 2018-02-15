import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Bartering extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;

    let total = 0;
    let tgleBtn = document.getElementById(id);
    let newId = id.replace(/tgl-/gi,'');

    const filter = document.getElementById(newId);
    const traderFrames =  document.getElementsByClassName('trader-frame');

    // if (content[i].id == filterId) { content[i].style.display = "block"; } 

    for (var i=0; i < traderFrames.length; i++) { 
      if (traderFrames[i].id == newId)
      { traderFrames[i].style.display = "block"; } else { traderFrames[i].style.display = "none"; }
      total++; 
    }
  }

  render() {
    return (  
      <div className="jumbotron contentcontainer trader-container" id="Bartering" style={{display: "none"}}>
          <center>
            <iframe id="legend" className="trader-frame" width="100%" height="550px" frameBorder="0" scrolling="no" src="barter.html"></iframe>
          </center>
        </div>);
  }
}