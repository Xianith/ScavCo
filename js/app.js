import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom'

import '../css/main.css';

import Post from '../js/post.js';
import Menu from '../js/menu.js';
import Home from '../js/home.js';
import Ammo from '../js/ammo.js';
import Bartering from '../js/bartering.js';

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

    $('#barterframe').hide();
    $('#barterframe').on('load', function () {
           $('#top-bar', $(this).contents()).hide();
           $(this).contents().find('body').css({
               background: 'red'
           });
           $(this).show();
           $(this)[0].contentWindow.onbeforeunload = function () {
               $('#barterframe').hide();
           };
       });
  }

  componentDidMount() {
    $('#barterframe').hide();
    $('#barterframe').on('load', function () {
           $('#top-bar', $(this).contents()).hide();
           $(this).contents().find('body').css({
               background: '#f4f5f8'
           });
           $(this).show();
           $(this)[0].contentWindow.onbeforeunload = function () {
               $('#barterframe').hide();
           };
       });

      // let postCounts = postCount;

      // console.log(postCounts);
      // for (let i=0; i < 3; i++) {
      //   console.log(postCounts[i].name + " -> " + postCounts[i].count + " --> " + i);
      //   if (postCounts[i].count == 0) { };
      // }
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
        <Bartering />
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