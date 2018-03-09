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
import Ammo from '../js/tabs/ammo';
import Maps from '../js/tabs/maps';
import Bartering from '../js/tabs/barter';
import Trading from '../js/tabs/trading';

import {API_KEY, SCOPE, CLIENT_ID } from '../js/util/gapiData'

// inDev
import Keys from '../js/tabs/keys';
import Dev from '../js/_testing/test';

// utils
import '../js/util/dServ';

export function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

class MainContainer extends Component {

	displayName: 'main';

  loadGapi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
        gapi.load('client', () => {
            gapi.client.init({
              'apiKey': API_KEY,
              'clientId': CLIENT_ID,
              'scope': SCOPE,
              'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            })
        });
    }
    script.onreadystatechange = () => {
      if (this.readyState === 'complete') this.onload();
    }
    document.body.appendChild(script);
  }

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadGapi()
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
        </div>
      </div>
    </Router>);
  }
}

render(<MainContainer />, document.getElementById('main'));