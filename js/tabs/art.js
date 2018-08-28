import React, { Component } from 'react';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
// import Lightbox from 'react-images';
import Lightbox from 'react-image-lightbox';

import '../../css/tabs.css'
import { navMenu } from '../menu'

import { jsUcfirst } from '../app'

function importAllNames(r) {
  return r.keys();
}

function importAllSrcs(r) {
  return r.keys().map(r);
}


let imgNames = importAllNames(require.context('../../assets/art/', false, /\.(png|jpe?g|svg)$/));
let imgSrcs = importAllSrcs(require.context('../../assets/art/', false, /\.(png|jpe?g|svg)$/));
let thmbSrcs = importAllSrcs(require.context('../../assets/art/thumbnails/', false, /\.(png|jpe?g|svg)$/));

var images = [];
var thumbs = [];

for (var i=0; i < imgSrcs.length; i++) {
  imgNames[i] = imgNames[i].replace('./','');
  imgNames[i] = imgNames[i].replace(/[0-9]{1}-/gi,'');
  imgNames[i] = imgNames[i].replace('.png','');
    images.push({'src':imgSrcs[i], width: 2, height: 1, caption: ['Image by ',<a href="https://www.instagram.com/tarkovmemes/">,
      <img src="https://i.imgur.com/D4If6ei.png" height="20px" title="TarkoveMemes"/></a>], title: imgNames[i]})
    thumbs.push({'src': thmbSrcs[i], width: 0.5, height: 0.25, title: imgNames[i]})
}

export default class Art extends Component {
  constructor(props) {
    super();

    this.state = {
      photoIndex: 0,
      isOpen: false,
      images: images,
    };

    this.openLightbox = this.openLightbox.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.moveNext = this.moveNext.bind(this);
    this.movePrev = this.movePrev.bind(this);
  }

  componentDidMount() {
    document.title = "Scav Co 🔸 Art";
    document.getElementById('MainMenu').style.display = 'block';
  }

  openLightbox() {
    this.setState({ isOpen: true });
    document.getElementById('MainMenu').style.display = 'none';
  }

  moveNext() {
    this.setState({ photoIndex: (this.state.photoIndex + 1) % images.length });
  }

  movePrev() {
    this.setState({
      photoIndex: (this.state.photoIndex + images.length - 1) % images.length,
    });
  }

  closeLightbox() {
    this.setState({ isOpen: false });
    document.getElementById('MainMenu').style.display = 'block';
  }

render() {
    const { photoIndex, isOpen, images } = this.state;

    return (  
      <div className="jumbotron contentcontainer tab-container" id="Art">
       <div className="sub-nav-menu"><center>
       </center></div><center>
          <Gallery photos={thumbs} onClick={this.openLightbox} />
          {isOpen && (
            <Lightbox
              mainSrc={images[photoIndex].src}
              nextSrc={images[(photoIndex + 1) % images.length].src}
              prevSrc={images[(photoIndex + images.length - 1) % images.length].src}
              onCloseRequest={this.closeLightbox}
              onMovePrevRequest={this.movePrev}
              onMoveNextRequest={this.moveNext}
              imageTitle={images[photoIndex].title}
              mainSrcThumbnail={images[photoIndex].thmb}
              imageCaption={images[photoIndex].caption}
            />
          )}
    </center></div>);
  }
}