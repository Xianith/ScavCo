import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import '../css/main.css';

import Menu from '../js/menu.js';

// tabs
import Home from '../js/tabs/home.js';
import OldAmmo from '../js/tabs/ammo.js';
import Ammo from '../js/tabs/new-ammo.js';
import Bartering from '../js/tabs/barter.js';
import Trading from '../js/tabs/trading.js';

// utils
import '../js/util/dServ.js';

class MainContainer extends Component {

	displayName: 'main';

  constructor(props) {
    super(props);
  }

  render() {
    return (<Router>
    <div>
      <Menu />
        <div className="container">
        <Switch>
          {["/home", "/"].map(path => 
               <Route exact path={path} component={Home} />
           )}
          <Route path="/ammo" component={Ammo} />
          <Route path="/bartering" component={Bartering} />
          <Route path="/trading" component={Trading} />
        </Switch>
        <OldAmmo />
        </div>
      </div>
    </Router>);
  }
}

render(<MainContainer />, document.getElementById('main'));