import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/menu.css';
import font from '../assets/1escape.ttf';

var BtnArray = [{"name":"Home","color":"white","status":"active"},
  {"name":"Ammo","color":"white","status":""},
  {"name":"Maps","color":"gray","status":"inactive"},
  // {"name":"Keys","color":"gray","status":""},
  {"name":"Bartering","color":"white","status":""},
  {"name":"Trading","color":"white","status":""}];

var MapsArray = [{"name":"Game Maps","url":"http://www.gamemaps.co.uk/game/tarkov"},
  {"name":"Tarkov Directory","url":"https://tarkov.directory/"},
  {"name":"Other","url":"https://docs.google.com/presentation/d/15B0UDdvBr7RdOgVph9s9mTHAwdqlaeSflOCJ_uSDJn0"}];

function dropDown(id, action) {
  var ddOrigin = document.getElementById('tgl-' + id);
  var dd = document.createElement('ul');

  if (action == 'create') {
    dd.className = 'dropdown';
    for (var m=0; m < MapsArray.length; m++) {
      let mapOption = document.createElement('li');
      mapOption.innerHTML = '<a target="_blank" class="dd-item" href="' + MapsArray[m].url + '">' + MapsArray[m].name + '</a>';
      dd.appendChild(mapOption);
    }
    ddOrigin.appendChild(dd);
  } else {
    if (document.getElementsByClassName('dropdown')[0] != undefined) {
      document.getElementsByClassName('dropdown')[0].remove();
    } else {}
  }
}

function menuSelect(Id) {
    const content =  document.getElementsByClassName('contentcontainer');

    let filterId = Id.replace(/post-title-/gi,'');

    for (var i=0; i < content.length; i++) { 
      if (filterId == "" || filterId == undefined) {}
      if (filterId == "Maps" || filterId == "Keys") {
        dropDown(filterId, 'create');
        break;
      } else { 
        dropDown(filterId, 'destroy');
        if (content[i].id == filterId) { content[i].style.display = "block"; 
          if (filterId == "Home") { document.getElementById('footer').style.display = 'none'; }
          else { document.getElementById('footer').style.display = 'block'; }
        } else {content[i].style.display = "none" } 
      }
    }
}

export default class Menu extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {
     const {id} = event.target;

     if (id.length != 0 || id != undefined ) {

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
   }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
          </button>
          <p className="navbar-brand" style={{color: "white"}}>SCAV<b>.CO</b></p>
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