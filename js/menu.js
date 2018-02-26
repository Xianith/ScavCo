import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/top-menu.css';
import font from '../assets/1escape.ttf';

var BtnArray = [{"name":"Ammo","color":"white","status":""},
  {"name":"Maps","color":"white","status":"nav-dd"},
  // {"name":"Keys","color":"gray","status":""},
  {"name":"Bartering","color":"white","status":""},
  {"name":"Trading","color":"white","status":""}];

var MapsArray = [{"name":"Game Maps","url":"http://www.gamemaps.co.uk/game/tarkov"},
  {"name":"Tarkov Directory","url":"https://tarkov.directory/"},
  {"name":"Other","url":"https://docs.google.com/presentation/d/15B0UDdvBr7RdOgVph9s9mTHAwdqlaeSflOCJ_uSDJn0"}];

function dropDown(action, id, array) {
  var ddOrigin = document.getElementById('tgl-' + id);
  var dd = document.createElement('ul');

  if (action == 'create' && arguments.length > 2) {
    dd.className = 'dropdown';
    for (var m=0; m < MapsArray.length; m++) {
      let linkList = document.createElement('li');
      linkList.innerHTML = '<a target="_blank" class="dd-item" href="' + array[m].url + '">' + array[m].name + '</a>';
      dd.appendChild(linkList);
    }
    ddOrigin.appendChild(dd);
  } else {
    if (document.getElementsByClassName('dropdown')[0] != undefined) {
      document.getElementsByClassName('dropdown')[0].remove();
    } else {}
  }
}

function menuSelect(id) {
    const filterId = id.replace(/tgl-/gi,'');
    const content =  document.getElementsByClassName('contentcontainer');
    const navBtns =  document.getElementsByClassName('nav-btn');

    if (filterId != "") { 

      for (var i=0; i < navBtns.length; i++) { navBtns[i].parentElement.classList.remove('active'); }
      document.getElementById(id).parentElement.classList.add('active');

      for (var i=0; i < content.length; i++) { 
        if (filterId == "Maps" || filterId == "Keys") {
          dropDown('create', filterId, MapsArray);
          break;
        } else {
          dropDown('destroy', filterId); 
          if (content[i].id == filterId) { content[i].style.display = "block"; 
            if (filterId == "Home") { document.getElementById('footer').style.display = 'none'; }
            else { document.getElementById('footer').style.display = 'block'; }
          } else { content[i].style.display = "none" } 
        }
      }
    } else if (filterId == "Home") { for (var i=0; i < navBtns.length; i++) { navBtns[i].parentElement.classList.remove('active'); }
    } else { dropDown('destroy', filterId); }
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
      menuSelect(id);
   }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="glyphicon glyphicon-menu-hamburger"></span><span className="sr-only">Toggle navigation</span>
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