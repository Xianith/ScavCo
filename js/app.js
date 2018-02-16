import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import '../css/main.css';

import Post from '../js/post.js';
import Menu from '../js/menu.js';
import Home from '../js/home.js';
import Ammo from '../js/ammo.js';
import Barter from '../js/barter.js';

class MainContainer extends Component {

	displayName: 'main';

  constructor(props) {
    super(props);
    this.state = {isMainContainerOn: true, posts: []};
    this.frameLoad = this.resizeIframe.bind(this);
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
        <div className="jumbotron contentcontainer" id="Barter" style={{display: "none"}}>
          <div id="content">
          </div>{p}
        </div>
        <Home />
        <Ammo />
        <Barter />
      </div>

      </div>);
  }

  resizeIframe(event) {
    const {id} = event.target;

    const main = document.getElementById(id);

    console.log(id);
    const gglBtns = main.getElementsByClassName('switcherItem');

    for (var i=0; i < gglBtns.length; i++) { gglBtns[i].parentElement.style.display = 'none'; }
    // id.style.height = id.contentWindow.document.body.scrollHeight + 'px';
   }

   frameStylize(obj) {
    console.log("got here");
    console.log(obj);
   }
}

render(<MainContainer />, document.getElementById('main'));