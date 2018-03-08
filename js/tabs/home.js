import React, { Component } from 'react';
import { render } from 'react-dom';

import discord from '../../assets/social/discord.png';
import gamepedia from '../../assets/social/gamepedia.png';
import reddit from '../../assets/social/reddit.png';
import battlestate from '../../assets/social/battlestate.jpg';

export default class Home extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
    document.getElementById('footer').style.display = 'none';
    // if (document.getElementById("Ammo-Two").style.display != 'none') { document.getElementById("Ammo-Two").style.display = 'none'; }
    document.title = "Scav Co";
  }

  render() {
    return ( 
       <div className="jumbotron contentcontainer" id="Home">
          <center>
          <div style={{'borderBottom': '1px solid #6f6a5b','paddingBottom':'15px'}}>
          <h2>Guides</h2>
            <a target="_blank" href="https://forums.uwsgaming.com/topic/3871-map-keys-and-you/">Keys</a> |&nbsp;
            <a target="_blank" href="http://forum.escapefromtarkov.com/topic/35903-weapons-and-attachments-mega-thread/">Attachments</a> |&nbsp;
            <a target="_blank" href="http://jjames.info/eFT_modCompat.php?tableType=advanced">Mods</a>
            <br /><a target="_blank" href="https://docs.google.com/presentation/d/1fipxlW4zdGAyXpjRdJvKJUuwMfiX0xZvnsvRj0QX-2w">Customs Dorms Keys</a>
          <h4>Maps</h4>
            <a target="_blank" href="http://www.gamemaps.co.uk/game/tarkov">Game Maps</a> |&nbsp;
            <a target="_blank" href="https://tarkov.directory/">Tarkov Directory</a>
          </div>

          <div style={{'borderBottom': '1px solid #6f6a5b','paddingBottom':'15px'}}>
          <h2>Sites</h2>
            <a target="_blank" href="https://escapefromtarkov.gamepedia.com"><img src={ gamepedia } className="socialicon" title="Gamepedia" alt="Gamepedia" /></a> &nbsp;
            <a target="_blank" href="https://www.reddit.com/r/escapefromtarkov/"><img src={ reddit } className="socialicon" title="Subreddit" alt="Subreddit"/></a> &nbsp;
            <a target="_blank" href="https://developertracker.com/escape-from-tarkov/"><img src={ battlestate } className="socialicon" title="Dev Tracker" alt="Dev Tracker" /></a>
          <h4>Discords</h4>
            <a target="_blank" href="https://discord.gg/GUWxkns"><img src="https://cdn.discordapp.com/icons/387998106228097025/7b7a6bf03619e50f9f233c68898cc88c.png" className="socialicon" title="Scav Co Discord" alt="Scav CoDiscord" /></a> &nbsp;
            <a target="_blank" href="https://discord.gg/YFVCGFe"><img src="https://cdn.discordapp.com/icons/372802948775936003/7b8d7d9a78be71e0866bdb9f6f85e32f.png" className="socialicon" title="Official EFT Discord" alt="Official EFTDiscord" /></a>
          </div>   

          <div>
          <h3>Scav Co Development</h3>
            <span>This site is being developed by <a href="http://xianith.com">Xianith</a>.<br />
            Check out the <a href="https://github.com/Xianith/ScavCo">github repo</a> for more info.</span>
          </div>
          </center>
        </div>);
  }
}
