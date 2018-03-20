import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/post.css';
import dIcon from '../../assets/social/discord.png';

let postIndex = 0;
let postCount = [{"name":"WTS","count":0},{"name":"WTB","count":0},{"name":"WTT","count":0}];

let items = [{"name":"Gold Chain"},{"name":"Marked Key"},{"name":"Customs Key"}];
let discord = '';

function copy(that){
  var inp =document.createElement('input');
  document.body.appendChild(inp)
  inp.value = that
  inp.select();
  document.execCommand('copy',false);
  inp.remove();
}

export default class Post extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.handleClick.bind(this);
    this.copyDisc = this.cpyDisc.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;

    let postBtn = document.getElementById(id);
    let newId = id.replace(/postBtn/gi,'postText');
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

   cpyDisc(event) {
     const discord = event.target
     var btn = null,
        main = null
     console.log(discord + " => " +discord.tagName);
     let d = discord.getAttribute('discord');
     // d = discord.getElementsByTagName("span")[0]
    if (discord.tagName != 'SPAN') { 
      btn = discord.getElementsByTagName("span")[0]
      main = discord
    } else { btn = discord; main = discord}

     // if (d == '' || d == undefined) d = discord.getElementsByTagName("span")[0]
     copy(d);
     btn.classList.remove('glyphicon-copy');
     btn.classList.add('glyphicon-ok');
     main.style.backgroundColor = 'green';

     setTimeout(function () {
          btn.classList.add('glyphicon-copy');
          btn.classList.remove('glyphicon-ok');
          main.style.backgroundColor = 'black';
        }, 400);
   }

  render() {
    let data = this.props.data.data;

    if (data.link_flair_text == 'Closed' || data.link_flair_text == null) { return ( null )}

    let pTitle = cleanPost(data.title, data.link_flair_text);
    let pText = null;
    let pButton = null;
    let dButton = null;
    let dButtonShort = null;
    let pVisibility = 'hidden';

    if (data.link_flair_text == 'WTS') { pVisibility = 'block'; }
    discord = data.selftext.match(/(?!\S*[*\:])\S*#[0-9]{4}/gi);

    if (discord != null) { 
      dButton = <a style={{display: "none"}} className="dBtn" title={"Copy to Clipboard: " + discord} target="_blank" onClick={this.copyDisc}><span discord={discord} className="glyphicon glyphicon-copy" aria-hidden="true"></span><img src={dIcon} className="discord-icon" alt='Discord Logo'/>{discord}</a> 
      dButtonShort = <a className="dBtn Short" title={"Copy to Clipboard: " + discord} target="_blank"  onClick={this.copyDisc}><span discord={discord} className="glyphicon glyphicon-copy" aria-hidden="true"></span><img src={dIcon} className="discord-icon" alt='Discord Logo'/></a>
      }
    if (data.selftext && data.selftext.length > 3) {  
      pButton = <a id={'postBtn-'+ postIndex} key={"post-tgl-"+postIndex} onClick={this.onClick}>Show Post</a>
      pText = <span className="listing-info" id={'postText-'+ postIndex} style={{display: "none"}}>
        <span className='post-text'>{data.selftext}</span></span>
    }

    postIndex ++
    for (let i=0; i < 3; i++) {
      let menuLi = document.getElementsByClassName(postCount[i].name);
      if (data.link_flair_text == postCount[i].name) {postCount[i].count++}
      // if (postCount[i].count <= 0) { menuLi.style.display = 'none' } else { menuLi.style.display = 'block' };
    }
    return ( 
      <div className={"postObj thing itm tgl-itm-" + data.link_flair_text} style={{display: "block"}} key={"post-key-"+postIndex}>
        <p className="title"><a target="_blank" href={data.url}>{pTitle}</a><span className="post-buttons">{dButton}{dButtonShort}{pButton}</span>{pText}</p>
      </div>)
  }
}

function cleanPost(post, title) {
  if (post.length != 3) { post = post.replace(title, ''); }
  // post = post.replace(/([)|(])|(- )|(: )|(wtb)|(wtt)|(wts)|(discord)|(want to)|(buy)|(sell)|(trade)|/gi, ''); }
  post = post.replace('[','');
  post = post.replace(/discord/gi,'');
  post = post.replace(':','');
  post = post.replace(']','');
  post = post.replace('] ','');
  post = post.replace('&amp;','&');
  discord = post.match(/\S*#[0-9]{4}/gi);
  post = post.replace(/\S*#[0-9]{4}/gi,''); //Remove Discord names
  // post = post.replace(/(,)|(&amp)|(and)/gi,' -')
  // post = post.replace(/key(s)/gi, '🔑');
  // post = post.replace(/(rouble(s))|(rub)/gi, '₽');
  // post = post.replace(/(usd)|(doolar(s))/gi, '$');
  if (post.length > 85) { post = post.substring(0,85) + '...'; }
  return post;  
}