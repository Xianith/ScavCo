import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/menu.css';

var BtnArray = [{"name":"Home","color":"white","status":"active"},{"name":"Bartering","color":"white","status":""},{"name":"WTS","color":"green", "status": ""},{"name":"WTB","color":"orange", "status": ""},{"name":"WTT","color":"purple", "status": ""}];
// {"name":"Ammo","color":"white","status":""}

function menuSelect(Id) {
    const content =  document.getElementsByClassName('contentcontainer');

    let filterId = Id.replace(/post-title-/gi,'');

    if (filterId == "WTS" || filterId == "WTB" || filterId == "WTT") { filterId = "Barter"; }

    for (var i=0; i < content.length; i++) { 
      if (content[i].id == filterId) { content[i].style.display = "block"; }
      else {content[i].style.display = "none" } 
    }
}

export default class Menu extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {
     const {id} = event.target;

     const filterId = id.replace(/tgl-/gi,'post-title-');

     let total = 0;

     const filter = document.getElementsByClassName(filterId);
     const posts = document.getElementsByClassName('postObj');
     const navBtns =  document.getElementsByClassName('nav-btn');

     for (var i=0; i < navBtns.length; i++) { navBtns[i].parentElement.classList.remove('active'); }

     menuSelect(filterId);

     document.getElementById(id).parentElement.classList.add('active');

     for (var i=0; i < posts.length; i++) { posts[i].style.display = "none"; }
     for (var i=0; i < filter.length; i++) { filter[i].parentElement.parentElement.style.display = "block"; total++; }
   }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
          </button>
          <p className="navbar-brand" style={{color: "white"}}>Scav <b>CO</b></p>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            {BtnArray.map((btn) =>
                    <li className={btn.status + " nav-btn-brd " + btn.name}><a className="btn nav-btn" style={{color:btn.color}} id={"tgl-" + btn.name} onClick={this.onClick}>
                      {btn.name}
                    </a></li>
                  )}
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>);
  }
}