import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/tabs.css'
import { navMenu } from '../menu.js';
// import { tableStylize } from '../js/ammo';

var SHEET_ID = '1l_8zSZg-viVTZ2bavMEIIKhix6mFTXuVHWcNKZgBrjQ';

var RANGE = 'A1:J67';

var API_KEY = 'AIzaSyBuiD7FAD9c7PAj0Np_ZwVsiHLbyTLKoBk';
var CLIENT_ID = '268531681980-bqf0gvhlgt0op2u526ts5ppvoov3hfk3.apps.googleusercontent.com';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

var dnr = [7]; //Rows that should not be rendered
var ammoArray = [{"name":"7.62x","id":"762x","status":"ammo-btn-active"},
  {"name":"9x","id":"9x","status":""},
  {"name":"5.45x39","id":"545x39","status":""},
  {"name":"5.56x45","id":"556x45","status":""},
  {"name":".366","id":"366","status":""},
  {"name":"Other","id":"other-ammo","status":""}];

var active = false;

export default class Ammo extends Component {

  loadGapi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
        gapi.load('client', () => {
            gapi.client.init({
              'apiKey': API_KEY,
              'clientId': CLIENT_ID,
              'scope': SCOPE,
              'discoveryDocs': ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
            }).then(function() {
              gapi.auth2.getAuthInstance().isSignedIn.listen(updateSignInStatus);
              updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            });
        });
    }
    script.onreadystatechange = () => {
      if (this.readyState === 'complete') this.onload();
    }

    document.body.appendChild(script);
  }

  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
    this.tableSwap = this.tableSwap.bind(this);
  }

  componentWillMount() {
   this.loadGapi();
  }

  tableSwap(event) {
    document.getElementById('Ammo').style.display = 'none';
    document.getElementById('Ammo-Two').style.display = 'block';
  }

  handleClick(event) {
    const {id} = event.target;
    navMenu(id,'ammo');
  }

  render() {
    let t = this.state;

    console.log(t);

    // if (t == false) { return (<div className="loading-div">Loading...</div>) }

    return (
      <div className="jumbotron contentcontainer ammo-container" id="Ammo">
       <div className="ammo-menu"><center>
           {ammoArray.map((btn) =>
                  <button id={'sort-'+btn.id} className={'btn btn-default ammo-btn '+btn.status} onClick={this.onClick}>{btn.name}</button>
                 )}
           </center></div>

           <table id="ammo-table-two" className="table table-fixed sortable table-hover table-responsive table-sm" cellSpacing="0" width="100%">
             <thead></thead>
             <tbody></tbody>
           </table>

      <span>Data is pulled from the following <a href={'https://docs.google.com/spreadsheets/d/'+SHEET_ID}>spreadsheet</a>.
      <a href="#" style={{color: "#gray", float: "right"}} onClick={this.tableSwap}>Switch to Unofficial Data</a></span>
    </div>);
  }
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    active = true;
    makeApiCall();
  } else { makeApiCall(); }
}

function makeApiCall() {
  var params = {
    spreadsheetId: SHEET_ID,
    range: RANGE,
    valueRenderOption: 'FORMATTED_VALUE',
    dateTimeRenderOption: 'SERIAL_NUMBER',
  };
  tableStylize(params, 'ammo-table-two');
}

function tableStylize(params, table) {
  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
   var range = response.result;
    if (range.values.length > 0) {
      for (var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        if (i == 0) { styleHeader(row, table); } else { styleRow(row, table); }
      }
    } else {
      tableFill('No data found.');
    }
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function styleHeader(row, Table) {
  var table = document.getElementById(Table);
  var tr = document.createElement('tr');

  for (var y = 0; y < 9; y++) {
    var thead = table.getElementsByTagName('thead')[0];
    var th = document.createElement('th');

    switch (y){
      case 0:
        th.colSpan = 2;
        th.innerHTML = 'Name';
        break;
      case 1:
        th.title = 'Initial Price';
        th.innerHTML = 'Price';
        break;
      case 2:
        th.title = 'Damage';
        th.innerHTML = 'Damage';
        break;
      case 3:
        th.title = 'Penetration Value';
        th.innerHTML = 'Armor Pen';
        break;
      case 4:
        th.title = 'Projectile speed (m/s)';
        th.innerHTML = 'Speed';
        break;
      case 5:
        th.title = 'Richochet Percentage / Chance';
        th.innerHTML = 'Richochet %';
        break;
      case 6:
        th.title = 'Fragmentaiton Percentage / Chance';
        th.innerHTML = 'Frag %';
        break;
      case 8:
        th.title = 'Usefulness Meta Value';
        th.innerHTML = 'Usefullness';
        break;
      default:
        th.innerHTML = row[y];
    }

    if (dnr.indexOf(y) > -1) { } 
    else {
      tr.appendChild(th);
      thead.appendChild(tr);
    }
  }
}

function styleRow(row, Table) {
  var table = document.getElementById(Table);
  var tr = document.createElement('tr'); 

  for (var y = 0; y < 9; y++) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var td = document.createElement('td');

    for (var a = 0; a < ammoArray.length; a++) {
        if (row[0].includes(ammoArray[a].id)) {
          tr.className = ammoArray[a].id + '-row ammo-row';
          if (ammoArray[a].id == '762x') { tr.style.display = 'table' } else {
            tr.style.display = 'none'; }
        } else if (tr.className.length == 0) {
          tr.className = 'other-ammo-row ammo-row';
          tr.style.display = 'none';
        }
    }

    switch (y) {
      case 0:
        td.colSpan = 2;
        td.title = row[y];
        let name = nameClean(row[y]);
        td.innerHTML = '<a target="_blank" href="https://escapefromtarkov.gamepedia.com/'+name+'">'+name+'</a>'; //Swap Item to row 1
        break;
      case 1:
        td.innerHTML = row[y] + '₽';
        break;
      default:
        td.innerHTML = row[y];
    }

    if (dnr.indexOf(y) > -1) { } 
    else {
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
  }
}

function nameClean(name) {

  name = name.replace(/_/gi,' ');

  switch (name.charAt(0)) {
    case '3':
      name = "." + name;
      break;
    case '5':
    case '7':
      name = name.charAt(0) + "." + name.slice(1);
      if (name.includes('tt') == true) { name = name.replace('tt', 'mm TT'); } else { name = name.replace(' ', ' mm '); }
      break;
    case '9':
      if (name.includes('pm') == true) { name = name.replace('pm', ' mm PM'); } else { name = name.replace(' ', ' mm '); }
    default:
  }

  return name;
}