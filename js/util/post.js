import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/post.css';
import dIcon from '../../assets/social/discord.png';

let postIndex = 0;
let postCount = [{"name":"WTS","count":0},{"name":"WTB","count":0},{"name":"WTT","count":0}];

let items = [{"name":"Gold Chain"},{"name":"Marked Key"},{"name":"Customs Key"}];

var discord = '';

export default class Post extends React.Component {

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    const {id} = event.target;

    let postBtn = document.getElementById(id);
    let newId = id.replace(/postBtn/gi,'postText');
    let postText = document.getElementById(newId);

    if (postText.style.display == "none") {
      postText.style.display = "block";
      postBtn.innerHTML = 'Hide Post';
    } else {
      postText.style.display = "none";
      postBtn.innerHTML = 'Show Post';
    }
   }

  render() {
    let data = this.props.data.data;

    if (data.link_flair_text == 'Closed' || data.link_flair_text == null) { return ( null )}

    let pTitle = cleanPost(data.title, data.link_flair_text);
    let pText = null;
    let pButton = null;
    let dButton = null;
    let pVisibility = 'hidden';

    if (data.link_flair_text == 'WTS') { pVisibility = 'block'; }

    discord = data.selftext.match(/\S*#[0-9]{4}/gi);
    data.selftext = data.selftext.replace(/\S*#[0-9]{4}/gi,'');
    data.selftext = data.selftext.replace('discord:','');
    if (discord != null) { 
      dButton = <a target="_blank" href="https://discord.gg/GUWxkns"><img  src={dIcon} className="discord-icon" title={discord} alt={discord} /></a> }

    if (data.selftext && data.selftext.length > 3) {  
      pButton = <a id={'postBtn-'+ postIndex} className="btn btn-default btn-sm tgl-txt" onClick={this.onClick}>Show Post</a>
      pText = <span className="listing-info" id={'postText-'+ postIndex}  style={{display: "none"}}>
        <span className='post-text'>{data.selftext}</span></span>
    }

    postIndex ++
    for (let i=0; i < 3; i++) {
      let menuLi = document.getElementsByClassName(postCount[i].name);
      if (data.link_flair_text == postCount[i].name) {postCount[i].count++}
      // if (postCount[i].count <= 0) { menuLi.style.display = 'none' } else { menuLi.style.display = 'block' };
    }
    return ( 
      <div className="postObj thing" style={{display: "block"}}>
        <p className="title"><a target="_blank" className={"post-title-" + data.link_flair_text} href={data.url}>{pTitle}</a><div style={{float:"right"}}>{dButton}{pButton}</div>{pText}</p>
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