import React, { Component } from 'react';
import { render } from 'react-dom';

import discord from '../../assets/social/discord.png';
import gamepedia from '../../assets/social/gamepedia.png';
import reddit from '../../assets/social/reddit.png';
import battlestate from '../../assets/social/battlestate.jpg';

const $ = require('jquery');
$.DataTable = require('datatables.net');


import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import {btnArray} from '../menu'

import '../../css/home.css';

export default class Home extends Component {
  constructor(props) {
    super();

    this.state = {news: null}
  }

  componentDidMount() {
    document.title = "Scav Co";
    this.getNews();
    document.getElementById('MainMenu').style.display = 'none';
    document.getElementById('fourohfour').style.display = 'none';
  }

  getNews() {
    var options = { dataType: 'jsonp'}
    var url = 'http://developertracker.com/escape-from-tarkov/rss/';

   const proxyurl = "https://cors-anywhere.herokuapp.com/";
   // const url = "https://example.com"; // site that doesn’t send Access-Control-*
   fetch(proxyurl + url) // https://cors-anywhere.herokuapp.com/https://example.com
   .then(response => response.text())
   // .then(contents => this.setState({news:JSON.stringify(contents)}) )
   .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
   .then(data => this.setState({news:data})
   // .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
   )  
  }

  render() {
    let news = this.state.news;

    if (news != null) {

      var post = news.getElementsByTagName('item');
      var title = document.createElement('a');
      var posts = []
      var item = [];

      for (var i = 0; i < 5; i++) {
        posts.push({title: post[i].getElementsByTagName('title')[0].innerHTML, 
                    link: post[i].getElementsByTagName('link')[0].innerHTML, 
                    desc: post[i].getElementsByTagName('description')[0].innerHTML, 
                    date: post[i].getElementsByTagName('pubDate')[0].innerHTML})

        title.innerHTML = posts[i].title;
        title.href = posts[i].link;

        document.getElementById('news-block').appendChild(title);
        item.push(title)
      }
     
      // console.log(post[0]);
      // console.log(posts);




      // console.log(item)
      news = item

      // console.log(news);
    };

    console.log(news);

    return (<div>
      <div id='titlescreen'>

      <b className="navbar-brand hidden">SCAV</b><br/>
      <center><img style={{height: '150px', margin: '-45px'}}src="https://s3.amazonaws.com/scavco/scavco_websize.png" />
      <h2>Где мусорщики идут</h2>
      (Where the scavs go!)</center>
      </div>
       <div className="jumbotron contentcontainer" id="Home">
          <center>
         
          <div className='hm-hr' style={{paddingBottom: "0px"}}>
          {btnArray.map((btn) =>
            <NavLink 
              key={"hm-main-"+btn}
              to={"/" + btn.toLowerCase()} 
              activeClassName='active' 
              style={{color: 'white'}} 
              className="hm-nav-btn btn nav-btn">{btn}
            </NavLink>
          )}
          </div>

          <div style={{paddingTop: "0px"}}>
          <h3 style={{paddingTop: "0px"}}>Sites</h3>
            <a target="_blank" href="https://escapefromtarkov.gamepedia.com"><img src={ gamepedia } className="socialicon" title="Gamepedia" alt="Gamepedia" /></a> &nbsp;
            <a target="_blank" href="escapefromtarkov.com"><img src={ battlestate } className="socialicon" title="Official Website" alt="Official Website" /></a>
          <h4>Social</h4>
            <a target="_blank" href="https://www.reddit.com/r/escapefromtarkov/"><img src={ reddit } className="socialicon" title="Subreddit" alt="Subreddit"/></a> &nbsp;
            <a target="_blank" href="https://discord.gg/GUWxkns"><img src="https://cdn.discordapp.com/icons/387998106228097025/7b7a6bf03619e50f9f233c68898cc88c.png" className="socialicon" title="Scav Co Discord" alt="Scav CoDiscord" /></a> &nbsp;
            <a target="_blank" href="https://discord.gg/YFVCGFe"><img src="https://cdn.discordapp.com/icons/372802948775936003/7b8d7d9a78be71e0866bdb9f6f85e32f.png" className="socialicon" title="Official EFT Discord" alt="Official EFTDiscord" /></a>
          </div>   

          </center>
        </div>
        <div className="jumbotron contentcontainer" id="Home">
           <center>
           <div className='hm-hr hm-sub'>
           <h3>News</h3>
           <div id="news-block">{news && news.map((n) => n.title)}</div>
           </div>
           <span>Info Provided by <a href="https://github.com/post-tracker/site">Dev Tracker</a></span>
           </center>
         </div>
        <div className="jumbotron contentcontainer" id="Home">
           <center>
           <h3>Scav Co Development</h3>
             <span>This site is being developed by <a href="http://xianith.com">Xianith</a>.<br />
             Art generously provided by <a href="https://www.instagram.com/tarkovmemes/">TarkovMemes</a>.<br />
             Check out the <a href="https://github.com/Xianith/ScavCo">github repo</a> for more info.</span>
           </center>
         </div>
         </div>);
  }
}

           // <h3>News</h3>
           // {news &&
           //  <p>{news}</p>
           // }