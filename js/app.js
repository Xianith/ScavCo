import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import '../css/main.css';

import Menu from '../js/menu.js';

// tabs
import Home from '../js/tabs/home.js';
import Ammo from '../js/tabs/ammo.js';
import NewAmmo from '../js/tabs/new-ammo.js';
import Barter from '../js/tabs/barter.js';
import Trading from '../js/tabs/trading.js';

// utils
import Post from '../js/util/post.js';
import '../js/util/dServ.js';

class MainContainer extends Component {

	displayName: 'main';

  constructor(props) {
    super(props);
    this.state = {isMainContainerOn: true, posts: []};
  }

  componentWillMount() {
    fetch('https://www.reddit.com/r/TarkovTrading/new/.json?limit=100').then((e) => {
      e.json().then((f) => { this.setState({ posts: f.data.children })})
    });
  }

  render() {
    let p = this.state.posts.map((e) => (<Post data={e}/>));

    if (p.length == 0) { return (<div className="loading-div">Loading...</div>) }
    return (<div>
      <Menu />
        <div className="container">
          <Home />
          <Ammo />
          <NewAmmo />
          <Barter />
          <Trading />
        </div>
      </div>);
  }
}

render(<MainContainer />, document.getElementById('main'));