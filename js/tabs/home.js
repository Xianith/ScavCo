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
    // this.getNews();
    document.getElementById('MainMenu').style.display = 'none';
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
        item.push(post[i])
      }
      news = item
    };

    // console.log(news);

    return (<div>
      <div id='titlescreen'>

      <center><img style={{height: '150px', margin: '-45px', marginTop:'-35px'}}src="https://s3.amazonaws.com/scavco/scavco_websize.png" />
      <h2>Где мусорщики идут</h2>
      (Where the scavs go!)</center>
      </div>
      <div id="Home">
      <center>
      <div>
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
      </center>
       <div className="jumbotron contentcontainer hidden"> 
          <center>
         
          <h3>News</h3>
          <h3 style={{display: 'none'}}><a style={{color: "rgb(215, 177, 0)"}} href="https://www.reddit.com/r/EscapefromTarkov/comments/8c1jz2/patch_08_is_scheduled_for_april_19th/?utm_content=comments&utm_medium=hot&utm_source=reddit&utm_name=EscapefromTarkov">Wipe scheduled for April 19th!</a></h3>

          <span style={{fontSize: "15px"}} id="news-block"></span>

          <br/ ><span style={{fontSize: "12px"}}>Info provided by <a href="https://github.com/post-tracker/site">Dev Tracker</a></span>

          </center>
        </div>
        <div className="jumbotron contentcontainer" style={{marginTop:"2px"}}>
           <center>
           <div className='m-sub'>
           <h3 style={{paddingTop: "0px"}}>Sites</h3>
             <a target="_blank" href="https://escapefromtarkov.gamepedia.com"><img src={ gamepedia } className="socialicon" title="Gamepedia" alt="Gamepedia" /></a> &nbsp;
             <a target="_blank" href="https://escapefromtarkov.com"><img src={ battlestate } className="socialicon" title="Official Website" alt="Official Website" /></a>
           <h4>Social</h4>
             <a target="_blank" href="https://www.reddit.com/r/escapefromtarkov/"><img src={ reddit } className="socialicon" title="Subreddit" alt="Subreddit"/></a> &nbsp;
             <a target="_blank" href="https://discord.gg/GUWxkns"><img src="https://cdn.discordapp.com/icons/387998106228097025/7b7a6bf03619e50f9f233c68898cc88c.png" className="socialicon" title="Scav Co Discord" alt="Scav CoDiscord" /></a> &nbsp;
             <a target="_blank" href="https://discord.gg/YFVCGFe"><img src="https://cdn.discordapp.com/icons/372802948775936003/7b8d7d9a78be71e0866bdb9f6f85e32f.png" className="socialicon" title="Official EFT Discord" alt="Official EFTDiscord" /></a>
           </div>   
           </center>
         </div>
        <div className="jumbotron contentcontainer">
           <center>
           <h3>Scav Co Development</h3>
             <span>This site is being developed by <a href="http://xianith.com">Xianith</a>.<br />
             Check out the <a href="https://github.com/Xianith/ScavCo">github repo</a> for more info.</span>
          <h4>Credit</h4>
            <a href="/art">Art</a> generously provided by <a href="https://www.instagram.com/tarkovmemes/">TarkovMemes</a>.<br />
            Most other images are from the <a target="_blank" href="https://escapefromtarkov.gamepedia.com">EFT Gamepedia</a>.
           </center>
         </div>
        </div>
         </div>);
  }
}

           // <h3>News</h3>
           // {news &&
           //  <p>{news}</p>
           // }