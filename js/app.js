import React, { Component } from 'react'
import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom"

import '../css/main.css'
import Menu from '../js/menu'

// tabs
import Home from '../js/tabs/home'
import Ammo from '../js/tabs/ammo'
import Maps from '../js/tabs/maps'
import Quests from '../js/tabs/quests'
import Bartering from '../js/tabs/barter'
import Trading from '../js/tabs/trading'

// inDev
import Art from '../js/tabs/art'
import Mods from '../js/tabs/mods'
import Keys from '../js/tabs/keys'

// Testing
import Dev from '../js/_testing/test'

// utils
import '../js/util/dServ';
import { loadGapi } from '../js/util/gapiData'

export function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class MainContainer extends Component {

	displayName: 'main';

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    loadGapi()
  }

  render() {
    return (<Router>
    <div>
      <Menu />
        <div className="container">
        <Switch>
          {["/home", "/"].map(path => 
               <Route exact path={path} component={Home} key="homePanel"/>
           )}
          {["/maps", "/maps/customs", "/maps/factory", "/maps/woods", "/maps/resort", "/maps/shoreline"].map(path => 
               <Route exact path={path} component={Maps} key="mapsPanel"/>
           )}
          <Route exact path="/keys" component={Keys}  key="keyPanel"/>
          <Route exact path="/ammo" component={Ammo}  key="ammoPanel"/>
          <Route exact path="/bartering" component={Bartering}  key="barterPanel"/>
          <Route exact path="/trading" component={Trading}  key="tradingPanel"/>
          <Route exact path="/art" component={Art}  key="artPanel"/>
          <Route exact path="/mods" component={Mods}  key="modsPanel"/>
          <Route exact path="/quests" component={Quests}  key="questsPanel"/>
          <Route exact path="/dev" component={Dev}  key="devPanel"/>
          <Route component={NoMatch} />
        </Switch>
        </div>
      <a id="art-tag" href="" style={{display: 'none'}}>Art by TarkovMemes</a>
      </div>
    </Router>);
  }
}

class NoMatch extends Component {

  displayName: 'nomatch';

  constructor(props) {
    super(props);
  }

  render() {
    return (<div>
      <div>
      <center><img style={{height: '150px', margin: '-45px', marginTop:'-35px'}}src="https://s3.amazonaws.com/scavco/scavco_websize.png" /></center>
      </div>

      <div className="notfound-div">
        <p style={{fontSize:"18px"}}>
        The Cheeki Breeki <b style={{fontSize:"20px", color:"white", font:"sans-serif"}}>404</b> page!</p>
        <p style={{fontSize:"10px"}}>ну, чики-брики и в дамки</p>
        <br />
        <p>INSERT TARKOV MEME HERE</p>
        <br />
        <p style={{fontSize:"12px"}}>For now...
        <br />
        Check out <a href="https://www.instagram.com/tarkovmemes/">TarkovMemes</a></p>
        <hr />
        <a href="/">Get me outta here!</a>
      </div>
      </div>);
  }
}

render(<MainContainer />, document.getElementById('main'));
