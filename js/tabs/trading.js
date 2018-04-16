import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/tabs.css'

import { navMenu } from '../menu'
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
      e.json().then((f) => { 
        // this.setState({ posts: f.data.children });

        let tempArray = [];

        f.data.children.map(function(i){
          if (i.data.link_flair_text != "Closed") {
            tempArray.push(i);
          }
        })

        console.log (tempArray);
        this.setState({ posts: tempArray });
      })
    });
    // if (document.getElementById("footer").style.display != 'block') { document.getElementById("footer").style.display = 'block'; }
    document.title = "Scav Co 🔸 Trading";
    document.getElementById('MainMenu').style.display = 'block';
  }

  postFilter(event) {
    const {id} = event.target;
    navMenu(id);
  }

  render() { 
    let p = this.state.posts.map((e) => (<Post data={e}/>));
    if (p.length == 0) { 
      setTimeout(function(){ document.getElementById("post-messanger").innerHTML = 
        "<center>\
            <span>Trading Closed</span>\
              <br /><span style='font-size:12px; color: #bcb9a9'>This usually means a wipe is near!<br />\
              Check <a target='_blank' href='https://www.reddit.com/r/TarkovTrading/'>here</a> for more info</span>\
          </center>"; document.getElementById("post-messanger").style.height = 150;
        }, 1500); 
      return (<div className="loading-div" id="post-messanger">Loading...</div>); }

    return (  
      <div className="jumbotron contentcontainer tab-container" id="Trading">
       <div className="sub-nav-menu"><center>
           {tradingArray.map((btn) =>
                  <button id={'sort-'+btn.name} className={'sub-nav-btn tgl-'+btn.name} onClick={this.pstFltr} key={'trade-btn-'+btn.name}>{btn.name}</button>
                 )}
           </center></div>

           <div className="postContainer">
             {p}
          </div>

      <span>Posts are pulled from <a href='https://www.reddit.com/r/TarkovTrading/'>Tarkov Trading</a>. <i>Additional posts will eventually be pulled from EFT Trading discord channels.</i></span>
    </div>);
  }
}