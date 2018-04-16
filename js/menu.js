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

export var btnArray = ["Ammo","Bartering","Trading","Maps","Keys","Mods"]

export function navMenu(id) {
   const filterId = id.replace(/sort-/gi,'tgl-itm-');
   const clickedBtn = document.getElementById(id);
   const filter = document.getElementsByClassName(filterId);
   const item = document.getElementsByClassName('itm');
   const navBtns = document.getElementsByClassName('sub-nav-btn')

   for (var i=0; i < navBtns.length; i++) {
     navBtns[i].classList.remove('sub-nav-btn-active');
   }      
   clickedBtn.classList.add('sub-nav-btn-active');


   for (var i=0; i < item.length; i++) { item[i].style.display = "none"; }
   for (var i=0; i < filter.length; i++) { filter[i].style.display = "grid"; }
}

export default class Menu extends Component {
  constructor(props) {
    super();
  }
  
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top" id="MainMenu">
      <div className="container">
        <div className="navbar-header">
          <button 
            type="button" 
            className="navbar-toggle collapsed" 
            data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span className="glyphicon glyphicon-menu-hamburger"></span><span className="sr-only">Toggle navigation</span>
          </button>
          <Link to="/"><img style={{height: "55px", marginTop: "-8px", marginBottom: "-15px", marginRight: "15px"}}src="https://s3.amazonaws.com/scavco/scavco_websize.png" /></Link>
          <Link to="/" className="navbar-brand hidden">SCAV</Link>
        </div>
        <div id="navbar" className="navbar-collapse collapse">
          <ul className="nav navbar-nav">
            {btnArray.map((btn) =>
                    <li className={"nav-btn-brd " + btn} key={btn}>
                      <NavLink
                        key={"navLink-"+btn} 
                        to={"/" + btn.toLowerCase()} 
                        activeClassName='active' 
                        style={{color: 'white'}} 
                        className="btn nav-btn">{btn}
                      </NavLink>
                    </li>
                  )}
          </ul>
          <div style={{padding: "9px", float: "right"}}>
            <a style={{color: "rgb(215, 177, 0)"}} target="_blank" href="https://www.reddit.com/r/EscapefromTarkov/comments/8c1jz2/patch_08_is_scheduled_for_april_19th/">0.8 on 4/19!</a></div>
          <ul className="nav navbar-nav navbar-right">
          </ul>
        </div>
      </div>
    </nav>);
  }
}