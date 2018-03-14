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
  }

  componentDidMount() {
    document.title = "Scav Co";
    this.getNews();
    document.getElementById('MainMenu').style.display = 'none';
    document.getElementById('fourohfour').style.display = 'none';
  }

  getNews() {
    var options = { mode: 'no-cors', headers: 'Access-Control-Allow-Origin' }

    $.get("http://developertracker.com/escape-from-tarkov/rss/", options, function(data) {    

        var $xml = $(data);   
        var items = [];

        $xml.find("item").each(function() {
            var $this = $(this);
            items.push({
                title: $this.find("title").text(),
                link: $this.find("link").text(),
                description: $this.find("description").text(),
                pubDate: $this.find("pubDate").text(),
            });
        });

        this.setState({ news: items });

    }.bind(this),'xml');    
  }

  render() {
    return (<div>
      <div id='titlescreen'>

      <b className="navbar-brand hidden">SCAV</b><br/>
      <center><img style={{height: '150px', margin: '-45px'}}src="https://i.imgur.com/PJk5HdP.png" />
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

          <div className='hm-hr' style={{paddingBottom: "0px"}}>
          <h3 style={{paddingTop: "0px"}}>Latest News:</h3>
          </div>

          <div style={{paddingTop: "0px"}}>
          <h3 style={{paddingTop: "0px"}}>Sites</h3>
            <a target="_blank" href="https://escapefromtarkov.gamepedia.com"><img src={ gamepedia } className="socialicon" title="Gamepedia" alt="Gamepedia" /></a> &nbsp;
            <a target="_blank" href="https://www.reddit.com/r/escapefromtarkov/"><img src={ reddit } className="socialicon" title="Subreddit" alt="Subreddit"/></a> &nbsp;
            <a target="_blank" href="https://developertracker.com/escape-from-tarkov/"><img src={ battlestate } className="socialicon" title="Dev Tracker" alt="Dev Tracker" /></a>
          <h4>Discords</h4>
            <a target="_blank" href="https://discord.gg/GUWxkns"><img src="https://cdn.discordapp.com/icons/387998106228097025/7b7a6bf03619e50f9f233c68898cc88c.png" className="socialicon" title="Scav Co Discord" alt="Scav CoDiscord" /></a> &nbsp;
            <a target="_blank" href="https://discord.gg/YFVCGFe"><img src="https://cdn.discordapp.com/icons/372802948775936003/7b8d7d9a78be71e0866bdb9f6f85e32f.png" className="socialicon" title="Official EFT Discord" alt="Official EFTDiscord" /></a>
          </div>   

          </center>
        </div>
        <div className="jumbotron contentcontainer" id="Home">
           <center>
           <div className='hm-hr hm-sub'>
           <h3>Additional Guides</h3>
             <a target="_blank" href="https://forums.uwsgaming.com/topic/3871-map-keys-and-you/">Keys</a> |&nbsp;
             <a target="_blank" href="http://forum.escapefromtarkov.com/topic/35903-weapons-and-attachments-mega-thread/">Attachments</a> |&nbsp;
             <a target="_blank" href="http://jjames.info/eFT_modCompat.php?tableType=advanced">Mods</a>
             <br /><a target="_blank" href="https://docs.google.com/presentation/d/1fipxlW4zdGAyXpjRdJvKJUuwMfiX0xZvnsvRj0QX-2w">Customs Dorms Keys</a>
           </div>
           <div>
           <h3>Scav Co Development</h3>
             <span>This site is being developed by <a href="http://xianith.com">Xianith</a>.<br />
             Check out the <a href="https://github.com/Xianith/ScavCo">github repo</a> for more info.</span>
           </div>
           </center>
         </div>
         </div>);
  }
}
