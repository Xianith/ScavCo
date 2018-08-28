import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Modding extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  componentWillMount() {
   this.loadGapi();
  }

  handleClick(event) {
    const {id} = event.target;
  }

  render() {
    return (  
    <div className="jumbotron contentcontainer mod-container" id="mod" style={{display: "none"}}>
       
    </div>);
  }
}