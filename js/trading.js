import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/barter.css'

import Post from '../js/post.js';

var tradingArray = [{"name":"WTS","color":"green", "status": "", "count":0},
  {"name":"WTB","color":"orange", "status": "", "count":0},
  {"name":"WTT","color":"#b557b5", "status": "", "count":0}];

export default class Trading extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
    this.state = {isMainContainerOn: true, posts: []};
  }

  componentWillMount() {
    fetch('https://www.reddit.com/r/TarkovTrading/new/.json?limit=100').then((e) => {
      e.json().then((f) => { this.setState({ posts: f.data.children })})
    });
  }

  componentDidMount() {
    // document.getElementsByClassName('post-title-WTS').parentElement.parentElement.style.display = "block";
  }

  handleClick(event) {
    const {id} = event.target;

    const filterId = id.replace(/sort-/gi,'post-title-');

    const filter = document.getElementsByClassName(filterId);
    const posts = document.getElementsByClassName('postObj');

    for (var i=0; i < posts.length; i++) { posts[i].style.display = "none"; }
    for (var i=0; i < filter.length; i++) { filter[i].parentElement.parentElement.style.display = "block"; }
  }

  render() { 
    let p = this.state.posts.map((e) => (<Post data={e}/>));

    return (  
      <div className="jumbotron contentcontainer trading-container" id="Trading" style={{display: "none"}}>
       <div className="trading-menu"><center>
           {tradingArray.map((btn) =>
                  <button id={'sort-'+btn.name} className={'nav-btn-brd nav-btn trading-btn '+btn.name} style={{color:btn.color}} onClick={this.onClick}>{btn.name}</button>
                 )}
           </center></div>

           <div className="postContainer">
             {p}
          </div>

      <span>Posts are pulled from <a href='https://www.reddit.com/r/TarkovTrading/'>Trading Tarkov</a>. <i>Additional posts will eventually be pulled from EFT Trading discord channels.</i></span>
    </div>);
  }
}