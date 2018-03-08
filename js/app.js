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
import Menu from '../js/menu';

// tabs
import Home from '../js/tabs/home';
import OldAmmo from '../js/tabs/ammo';
import Ammo from '../js/tabs/new-ammo';
import Bartering from '../js/tabs/barter';
import Trading from '../js/tabs/trading';

// inDev
import Keys from '../js/tabs/keys';
import Maps from '../js/tabs/maps';
import Dev from '../js/_testing/test';

// utils
import '../js/util/dServ';

export function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class MainContainer extends Component {

	// displayName: 'main';

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
          <Route path="/maps" component={Maps} />
          <Route path="/keys" component={Keys} />
          <Route path="/ammo" component={Ammo} />
          <Route path="/dev" component={Dev} />
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