import React, { Component } from 'react';
import { render } from 'react-dom';

export default class Mods extends Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.title = "Scav Co 🔸 Mods";
    document.getElementById('MainMenu').style.display = 'block';
  }

  handleClick(event) {
    const {id} = event.target;
  }

  render() {
    return (  
      <div className="jumbotron contentcontainer tab-container" id="Mods">
      <span className="wipBanner">This page is a Work in Progress!</span>
       <div className="sub-nav-menu"><center>           <button className="disabled" disabled>Pistols</button>
              <button className="disabled" disabled>Assault Rifles</button>
              <button className="disabled" disabled>Shotguns</button>
              <button className="disabled" disabled>PDWs</button>
              <button className="disabled" disabled>Sniper Riffles</button>       </center>   </div>
           <div className="postContainer" style={{marginBottom: "15px", display:"none"}}>

          </div>
          Additional Guides: <a target="_blank" href="http://forum.escapefromtarkov.com/topic/35903-weapons-and-attachments-mega-thread/">Full Attachment List</a> |&nbsp; <a target="_blank" href="http://jjames.info/eFT_modCompat.php?tableType=advanced">Mod Guide</a> |&nbsp; <a target="_blank" href="https://www.eftdb.one/">Modding Tool</a>
    </div>);
  }
}