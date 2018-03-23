import React, { Component } from 'react';
import { render } from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from "react-router-dom";

import '../../css/tabs.css'
import '../../css/map.css'
import { navMenu } from '../menu'

import { jsUcfirst } from '../app'
import { mapArray } from '../data/maps.js'

import extractIcon from '../../assets/map/markers/extract.jpg';

var map = null,
    locations = ['customs','woods','factory','shoreline','resort'],
    locMenu = [];

for (var l = 0; l < locations.length; l++) { locMenu.push('/maps/'+locations[l]) }

var extract = L.icon({
    iconUrl: extractIcon,
    iconSize: [25, 30], // size of the icon
});

// class mapsMenu extends Component {
//   constructor(props) {
//     super();
//     this.onClick = this.postFilter.bind(this);
//   }

//    render() {
//     return (
//      <Router>
//        {locMenu.map(path => 
//            <Route path={path} component={Maps} />
//        )}
//      </Router>
//   )}

// }

const MapMenu = ({Map}) => {

  return (
    <div className="sub-nav-menu"><center>
        {locations.map((btn) =>
               <Link to={`${Map.url}/${btn}`} id={'sort-map-'+btn} onClick={Map.onClick} className={'sub-nav-btn tgl-map-'+btn} key={'location-btn-'+btn}>{jsUcfirst(btn)}</Link>
              )}
        </center></div>
  )
}

export default class Maps extends Component {
  constructor(props) {
    super();
    this.onClick = this.postFilter.bind(this);
  }

  componentDidMount() {
    document.title = "Scav Co 🔸 Maps";
    document.getElementById('fourohfour').style.display = 'none';
    document.getElementById('MainMenu').style.display = 'block';
    initMap(mapArray[0])
  }

  postFilter(event) {
    const {id} = event.target;
    const filterId = id.replace(/sort-map-/gi,'');

    if (map != null) map.remove();
    for (var i = 0; i < mapArray.length; i++)
    {
      if (filterId == mapArray[i].name) { initMap(mapArray[i]) }
    }
  }

//            <MapMenu Map={{params: {id: 0}, url: "/maps"}} />

  render() {
    return (
    <div className="jumbotron contentcontainer tab-container map-container" id="Maps">
    <span className="wipBanner">This page is a Work in Progress!</span>
       <div className="sub-nav-menu"><center>
           {locations.map((btn) =>
                  <button id={'sort-map-'+btn} className={'sub-nav-btn tgl-map-'+btn} onClick={this.onClick} key={'location-btn-'+btn}>{jsUcfirst(btn)}</button>
                 )}
           </center></div>
           <div className="postContainer" style={{marginBottom: "15px"}}>
           <div id="mapid"></div>
          </div>

          <span>Additional Map Sites: <a target="_blank" href="http://www.gamemaps.co.uk/game/tarkov">Game Maps</a> |&nbsp; <a target="_blank" href="https://tarkov.directory/">Tarkov Directory</a>
          <a id="mapSource" style={{color: "#d7b100", float: "right", cursor:"pointer"}} title="Map Source">Map Source</a></span>
    </div>);
  }
}

function markerHandler(array) {
  var temp = [], iconOpac = 1.0;

  if (array.length != 0 || array == '' || array == undefined) {
    for (var e = 0; e < array.length; e++) {
      if (array[e].key != '') { iconOpac = 0.5 }
      temp.push(L.marker(array[e].xy, {icon: extract, opacity: iconOpac}).bindTooltip(array[e].name))
    }
    return L.layerGroup(temp);
  }
}

function initMap(array) {
  var extracts = null , loot = null , spawns = null;

  extracts = markerHandler(array.extracts)
  loot = L.layerGroup();
  spawns = L.layerGroup();

  map = L.map('mapid', {
    minZoom: 1,
    maxZoom: 3.5,
    center: [0, 0],
    zoom: 1,
    crs: L.CRS.Simple,
    layers: [extracts]
  });

  var w = array.size[0],
      h = array.size[1],
      url = array.url;

  var baseMaps = { };
  var overlayMaps = {
      "Extracts": extracts,
      "Spawns": spawns,
      "Loot": loot,
  };
// 
  const southWest = map.unproject([0, h], map.getMaxZoom()-1);
  const northEast = map.unproject([w, 0], map.getMaxZoom()-1);
  const bounds = new L.LatLngBounds(southWest, northEast);

  document.getElementById('mapSource').href = 'https://escapefromtarkov.gamepedia.com/'+array.name;

  if (extracts != null) L.control.layers(baseMaps, overlayMaps).addTo(map);
  L.imageOverlay(url, bounds).addTo(map);

  map.setZoom(2);
  map.setMaxBounds(bounds);
}