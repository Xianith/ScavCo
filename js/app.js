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
          <Route path="/maps" render={() => (
                  <Maps>
                    <Switch>
                      <Route exact path="." component={Maps}/>
                      <Route path="customs" component={Maps}/>
                    </Switch>
                  </Maps>
                )}/>
          <Route path="/keys" component={Keys}  key="keyPanel"/>
          <Route path="/ammo" component={Ammo}  key="ammoPanel"/>
          <Route path="/bartering" component={Bartering}  key="barterPanel"/>
          <Route path="/trading" component={Trading}  key="tradingPanel"/>
          <Route path="/art" component={Art}  key="artPanel"/>
          <Route path="/mods" component={Mods}  key="modsPanel"/>
          <Route path="/dev" component={Dev}  key="devPanel"/>
        </Switch>
        </div>
      <a id="art-tag" href="" style={{display: 'none'}}>Art by TarkovMemes</a>
      </div>
    </Router>);
  }
}
render(<MainContainer />, document.getElementById('main'));
