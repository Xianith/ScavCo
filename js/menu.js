import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/menu.css';
import font from '../assets/1escape.ttf';

var BtnArray = [{"name":"Ammo","color":"white","status":""},
  {"name":"Maps","color":"gray","status":"nav-dd"},
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

    for (var i=0; i < content.length; i++) { 
      if (Id == "" || Id == undefined) {}
      if (Id == "Maps" || Id == "Keys") {
        dropDown(Id, 'create');
        break;
      } else { 
        dropDown(Id, 'destroy');
        if (content[i].id == Id) { content[i].style.display = "block"; 
          if (Id == "Home") { document.getElementById('footer').style.display = 'none'; }
          else { document.getElementById('footer').style.display = 'block'; }
        } else {content[i].style.display = "none" } 
      }
    }
}

export function navMenu(id, type) {
  const menu = id.replace('sort-','') + '-row';
  const menuRows = document.getElementsByClassName(type+'-row');
  const menuBtns = document.getElementsByClassName(type+'-btn');

  for (var i=0; i < menuBtns.length; i++) {
    if (menuBtns[i].id.includes(id))
    { menuBtns[i].classList.add(type+'-btn-active'); } else { menuBtns[i].classList.remove(type+'-btn-active'); }
  }

  for (var i=0; i < menuRows.length; i++) {
    if (menuRows[i].className.includes(menu))
    { menuRows[i].style.display = "table"; } else { menuRows[i].style.display = "none"; }
  }
}

export default class Menu extends Component {
  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {
     const {id} = event.target;
     const filterId = id.replace(/tgl-/gi,'');
     const navBtns =  document.getElementsByClassName('nav-btn');

      if (id.length != 0 && id != undefined && filterId != 'Home') {
       for (var i=0; i < navBtns.length; i++) { navBtns[i].parentElement.classList.remove('active'); }
        document.getElementById(id).parentElement.classList.add('active');
      }
      console.log(filterId + ' =>' + event.target);
      menuSelect(filterId);
   }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="sr-only">Toggle navigation</span>
          </button>
          <a href="#Home" style={{color: "white"}} className="navbar-brand" id="tgl-Home" onClick={this.onClick}>SCAV</a>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            {BtnArray.map((btn) =>
                    <li className={btn.status + " nav-btn-brd " + btn.name}>
                      <a href={'#' + btn.name} className="btn nav-btn" style={{color:btn.color}} id={"tgl-" + btn.name} onClick={this.onClick}>
                      {btn.name}</a></li>
                  )}
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>);
  }
}