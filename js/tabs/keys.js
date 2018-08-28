import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/tabs.css'
import { navMenu } from '../menu'
import { keyArray } from '../data/keys'

import { jsUcfirst } from '../app'

export default class Keys extends Component {
  constructor() {
    super();
    this.onClick = this.postFilter.bind(this);
    this.expandKey = this.expKey.bind(this);

    this.state = {
      locations: ['customs','woods','factory','shoreline','none'],
      keys: keyArray
    }
  }

  componentDidMount() {
    // let kBox = document.getElementsByClassName('keyBox');

    // for (var k = 0; k < kBox.length; k++)
    // {
    //   if (kBox[k].classList.contains('key-loc-customs')) { kBox[k].style.display = 'block' };
    // }
    document.title = "Scav Co 🔸 Keys";
    document.getElementById('MainMenu').style.display = 'block';
  }

  postFilter(event) {
    const {id} = event.target;
    navMenu(id);
  }

  expKey(event) {
    const {id} = event.target;

    let postBtn = document.getElementById(id);
    let newId = id.replace(/tgl-/gi,'tgl-itm');
    let postText = document.getElementById(newId);

    let dBtn = postText.parentNode.getElementsByClassName('dBtn')[0]
    let dBtnShort = postText.parentNode.getElementsByClassName('Short')[0]

    if (postText.style.display == "none") {
      postText.style.display = "block";
      dBtn.style.display = "block";
      dBtnShort.style.display = "none";
      postBtn.innerHTML = 'Hide Post';
    } else {
      postText.style.display = "none";
      dBtn.style.display = "none";
      dBtnShort.style.display = "block";
      postBtn.innerHTML = 'Show Post';
    }
   }

  // expandKey() {
  // }

  // lootBtns(array) {
  //   console.log(array);
  //   var container = document.createElement('div');
  //   var btns = null;
  //   if (array == null || array == undefined) { return };
  //   for (var i = 0; i < array.length; i++) {
  //     btns = ++ array[i] + ' ';
      
  //   }
  //   container.appendChild(btns;

  //   console.log(container);

  //   return container;
  // }

  render() {
    let locs = this.state.locations,
        keys = this.state.keys;

    return (  
      <div className="jumbotron contentcontainer tab-container" id="Keys">
       <div className="sub-nav-menu"><center>
           Used on: {locs.map((btn) =>
                  <button id={'sort-'+btn} className={'sub-nav-btn tgl-'+btn} onClick={this.onClick}>{jsUcfirst(btn)}</button>
                 )}
           </center></div>
           <div className="postContainer" style={{marginBottom: "15px"}}>
           {keys && keys.map((k) =>
                  <div className={"postObj thing itm tgl-itm-" + k.location.toLowerCase()} key={k.name} style={{padding:"8px"}}>
                      <a target="_blank" href={'https://escapefromtarkov.gamepedia.com/'+k.name}><img style={{paddingRight: "10px"}} height="60px" src={k.img} />{k.name}</a>
                      <div style={{display: "none"}}>
                        {k.quest > 0 &&
                        <p>Is apart of Quest: {k.quest}</p>
                        }
                        <p>Obtained from: {k.obtain}</p>
                        <p>Unlocks: {k.unlocks}</p>
                      </div>
                      <a className={"tgl-"+k.name} style={{float: "right", display: "none"}} onClick={this.expandKey}>Show Details</a>
                  </div>
                 )}
          </div>
          Additional Guides: <a target="_blank" href="https://forums.uwsgaming.com/topic/3871-map-keys-and-you/">Full Key List</a> |&nbsp;<a href="https://docs.google.com/presentation/d/1fipxlW4zdGAyXpjRdJvKJUuwMfiX0xZvnsvRj0QX-2w">Customs Dorms Key Guide</a>
    </div>);
  }
}