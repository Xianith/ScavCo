import React, { Component } from 'react';
import { render } from 'react-dom';

import { jsUcfirst } from '../app'
import { navMenu } from '../menu'

import { questsShortArray } from '../data/quests'

export default class Quests extends Component {

  constructor(props) {
    super();
    this.onClick = this.postFilter.bind(this);

    this.state = {
      traders: ['prapor','therapist','skier','peacekeeper','mechanic'],
      quests: questsShortArray
    }
  }

  componentDidMount() {
    document.title = "Scav Co 🔸 Quests";
    document.getElementById('MainMenu').style.display = 'block';
  }

  postFilter(event) {
    const {id} = event.target;
    navMenu(id);
  }

  render() {
    let tra = this.state.traders,
        quests = this.state.quests,
        items = this.state.quests.items;

    return (  
      <div className="jumbotron contentcontainer tab-container" id="Quests">
      <span className="wipBanner">This page is a Work in Progress!</span>
       <div className="sub-nav-menu"><center>
       {tra.map((btn) =>
                         <button id={'sort-'+btn} className={'sub-nav-btn tgl-'+btn} onClick={this.onClick}>{jsUcfirst(btn)}</button>
                        )}
      </center></div>
       <div className="postContainer" style={{marginBottom: "15px"}}>
       {quests && quests.map((q) =>
              <div className={"postObj thing itm tgl-itm-" + q.name.toLowerCase()} key={q.name} style={{padding:"8px"}}>
                  <a href={'https://escapefromtarkov.gamepedia.com/'+q.name}>{q.name}</a>
                  <a className={"tgl-"+q.name} style={{float: "right", display: "none"}}>Show Details</a>
              </div>
             )}
       {items}
      </div>
          Additional Guides: <a target="_blank" href="https://escapefromtarkov.gamepedia.com/Quests#Items_to_keep">Items to Keep</a>
    </div>);
  }
}