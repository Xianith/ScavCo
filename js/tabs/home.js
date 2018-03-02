import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/home.css';

import discord from '../../assets/social/discord.png';
import gamepedia from '../../assets/social/gamepedia.png';
import reddit from '../../assets/social/reddit.png';
import battlestate from '../../assets/social/battlestate.jpg';

export default class Home extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {

  }

  render() {
    return ( 
       <div className="jumbotron contentcontainer" id="Home">
          <center>
          <div>
          <h2>Guides</h2>
            <a target="_blank" href="https://docs.google.com/presentation/d/1fipxlW4zdGAyXpjRdJvKJUuwMfiX0xZvnsvRj0QX-2w/edit#slide=id.p">Keys</a> |&nbsp;
            Maps (<a target="_blank" href="http://www.gamemaps.co.uk/game/tarkov">1</a> - <a target="_blank" href="https://docs.google.com/presentation/d/15B0UDdvBr7RdOgVph9s9mTHAwdqlaeSflOCJ_uSDJn0/edit#slide=id.g1ea126bf8f_5_68">2</a> - <a target="_blank" href="https://tarkov.directory/">3</a>) |&nbsp;
            <a target="_blank" href="http://forum.escapefromtarkov.com/topic/35903-weapons-and-attachments-mega-thread/">Attachments</a> |&nbsp;
            <a target="_blank" href="http://jjames.info/eFT_modCompat.php?tableType=advanced">Mods</a>
          </div>
          <div>
          <h2>Links</h2>
            <a target="_blank" href="https://discord.gg/GUWxkns"><img src={ discord } className="socialicon" title="Discord" alt="Discord" /></a> &nbsp;
            <a target="_blank" href="https://escapefromtarkov.gamepedia.com"><img src={ gamepedia } className="socialicon" title="Gamepedia" alt="Gamepedia" /></a> &nbsp;
            <a target="_blank" href="https://www.reddit.com/r/escapefromtarkov/"><img src={ reddit } className="socialicon" title="Subreddit" alt="Subreddit"/></a> &nbsp;
            <a target="_blank" href="https://developertracker.com/escape-from-tarkov/"><img src={ battlestate } className="socialicon" title="Dev Tracker" alt="Dev Tracker" /></a>
          <h3>Development</h3>
            <span>This site is being developed by <a href="http://xianith.com">Xianith</a>.<br />
            Check out the <a href="https://github.com/Xianith/ScavCo">github repo</a> for more info.</span>
          </div>      
          </center>
        </div>);
  }
}
