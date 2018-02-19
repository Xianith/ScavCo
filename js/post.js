import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/post.css';

let postIndex = 0;
let postCount = [{"name":"WTS","count":0},{"name":"WTB","count":0},{"name":"WTT","count":0}];

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

    if (postText.style.display === "none") {
      postText.style.display = "block";
      postBtn.innerHTML = 'Hide Post';
    } else {
      postText.style.display = "none";
      postBtn.innerHTML = 'Show Post';
    }
   }

  render() {
    let data = this.props.data.data;

    if (data.link_flair_text == 'Closed') { return ( null )}

    let pTitle = cleanPost(data.title, data.link_flair_text);
    let pText = null;
    let pButton = null;

    if (data.selftext) {  
      pButton = <a id={'postBtn-'+ postIndex} className="btn btn-default btn-sm tgl-txt" onClick={this.onClick} style={{float:"right"}}>Show Post</a>
      pText = <span className="listing-info" id={'postText-'+ postIndex}  style={{display: "none"}}>
        <span className='post-text'>{data.selftext}</span></span>
    }

    postIndex ++
    for (let i=0; i < 3; i++) {
      if (data.link_flair_text == postCount[i].name) {postCount[i].count++}
      // if (postCount[i].count <= 0) {let menuLi = document.getElementsByClassName(postCount[i].name); menuLi[0].style.display = 'none'};
    }

    return ( 
      <div className="postObj thing" style={{display: "none"}}>
        <p className="title"><a target="_blank" className={"post-title-" + data.link_flair_text} href={data.url}>{pTitle}</a>{pButton}{pText}</p>
      </div>)
  }
}

function cleanPost(post, title) {
  post = post.replace(title, '');
  post = post.replace(/([)|(])|(- )|(: )|(wtb)|(wtt)|(wts)|/gi, '');
  post = post.replace('[','');
  post = post.replace(']','');
  post = post.replace('] ','');
  // post = post.replace(/(,)|(&amp)|(and)/gi,' -')
  // post = post.replace(/key(s)/gi, '🔑');
  // post = post.replace(/(rouble(s))|(rub)/gi, '₽');
  // post = post.replace(/(usd)|(doolar(s))/gi, '$');

  return post;  
}