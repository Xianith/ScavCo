import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import '../css/top-menu.css';
import font from '../assets/1escape.ttf';

var BtnArray = [{"name":"Ammo","color":"white","status":""},
  // {"name":"Keys","color":"gray","status":""},
  {"name":"Bartering","color":"white","status":""},
  {"name":"Trading","color":"white","status":""}];

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
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="glyphicon glyphicon-menu-hamburger"></span><span className="sr-only">Toggle navigation</span>
          </button>
          <Link to="/" className="navbar-brand">SCAV</Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            {BtnArray.map((btn) =>
                    <li className={btn.status + " nav-btn-brd " + btn.name}>
                      <NavLink to={"/" + btn.name} activeClassName='active' style={{color:btn.color}} className="btn nav-btn">{btn.name}</NavLink></li>
                  )}
          </ul>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>);
  }
}