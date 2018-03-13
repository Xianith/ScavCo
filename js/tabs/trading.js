import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/tabs.css'

import Post from '../util/post.js';

var tradingArray = [{"name":"WTS","color":"green", "status": "", "count":0},
  {"name":"WTB","color":"orange", "status": "", "count":0},
  {"name":"WTT","color":"#b557b5", "status": "", "count":0}];

export default class Trading extends Component {

  constructor(props) {
    super();
    this.pstFltr = this.postFilter.bind(this);
    this.state = {isMainContainerOn: true, posts: []};
  }

  componentDidMount() {
    fetch('https://www.reddit.com/r/TarkovTrading/new/.json?limit=100').then((e) => {
      e.json().then((f) => { this.setState({ posts: f.data.children })})
    });
    // if (document.getElementById("footer").style.display != 'block') { document.getElementById("footer").style.display = 'block'; }
    document.title = "Scav Co 🔸 Trading";
    document.getElementById('fourohfour').style.display = 'none';
    document.getElementById('MainMenu').style.display = 'block';
  }

  postFilter(event) {
    const {id} = event.target;

    const filterId = id.replace(/sort-/gi,'post-title-');

    const filter = document.getElementsByClassName(filterId);
    const posts = document.getElementsByClassName('postObj');

    for (var i=0; i < posts.length; i++) { posts[i].style.display = "none"; }
    for (var i=0; i < filter.length; i++) { filter[i].parentElement.parentElement.style.display = "block"; }
  }

  render() { 
    let p = this.state.posts.map((e) => (<Post data={e}/>));

    if (p.length == 0) { return (<div className="loading-div">Loading...</div>) }
    return (  
      <div className="jumbotron contentcontainer tab-container" id="Trading">
       <div className="sub-nav-menu"><center>
           {tradingArray.map((btn) =>
                  <button id={'sort-'+btn.name} className={btn.name} style={{color:btn.color}} onClick={this.pstFltr} key={'trade-btn-'+btn.name}>{btn.name}</button>
                 )}
           </center></div>

           <div className="postContainer">
             {p}
          </div>

      <span>Posts are pulled from <a href='https://www.reddit.com/r/TarkovTrading/'>Tarkov Trading</a>. <i>Additional posts will eventually be pulled from EFT Trading discord channels.</i></span>
    </div>);
  }
}