import React, { Component } from 'react';
import { render } from 'react-dom';

import '../css/barter.css';
import mods from '../assets/categories/mods.png';
import { navMenu } from '../js/menu.js';

var SHEET_ID = '1Yk-VriCy_8vDH4V9SsLwRYxem2mkzoDrULiaHZY5UGQ';
var RANGE = 'A2:L184';

var API_KEY = 'AIzaSyBuiD7FAD9c7PAj0Np_ZwVsiHLbyTLKoBk';
var CLIENT_ID = '268531681980-bqf0gvhlgt0op2u526ts5ppvoov3hfk3.apps.googleusercontent.com';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

var dnr = [3,4,5,7,8]; //Rows that should not be rendered

var barterArray = ['prapor','therapist','fence','skier','peacekeeper','tradeable','buyable'];
var catArray = ['tradeable','buyable'];

export default class Barter extends Component {

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
  }

  componentDidMount() {
   this.loadGapi();
  }

  handleClick(event) {
    const {id} = event.target;
    navMenu(id,'barter');
  }

  render() {
    return (  
      <div className="jumbotron contentcontainer barter-container" id="Bartering" style={{display: "none"}}>
        <div className="barter-menu"><center>
        {barterArray.map((btn) =>
               <button id={'sort-'+btn} className='btn btn-default barter-btn' onClick={this.onClick}>{jsUcfirst(btn)}</button>
            )}
        </center></div>

      <table data-toggle="table" id="barter-table" className="table table-fixed table-hover table-bordered table-responsive table-sm" cellSpacing="0" width="100%">
        <thead></thead>
        <tbody></tbody>
      </table>

      <span>Data is pulled from the following <a href={'https://docs.google.com/spreadsheets/d/'+SHEET_ID}>spreadsheet</a>. <i>Which is maintained by <a href="https://www.reddit.com/user/Gieke85">/u/Gieke85</a></i></span>
    </div>);
  }
}

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
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

  var request = gapi.client.sheets.spreadsheets.values.get(params);
  request.then(function(response) {
   var range = response.result;
    if (range.values.length > 0) {
      for (var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        if (i == 0) { styleHeader(row); } else { styleRow(row); }
      }
    } else {
      tableFill('No data found.');
    }
  }, function(reason) {
    console.error('error: ' + reason.result.error.message);
  });
}

function styleHeader(row) {
  var table = document.getElementById('barter-table');
  var tr = document.createElement('tr')

  for (var y = 0; y < 12; y++) {
    var thead = table.getElementsByTagName('thead')[0];
    var th = document.createElement('th');

    if (y == 0) {
      var text = document.createTextNode(row[1]);
    } else if (y == 1) { 
      var text = document.createTextNode(row[0]);
      th.colSpan = 2;
    } else if (y == 2) {
        var text = document.createTextNode('Sell Price');
        th.colSpan = 2;
    } else if (y == 6) {
        var text = document.createTextNode('Value (WxH:Slot Total) ');
        th.colSpan = 2;
    } else {  
      var text = document.createTextNode(row[y]);
    }

    if (dnr.indexOf(y) > -1) { } 
    else {
      th.appendChild(text);
      tr.appendChild(th);
      thead.appendChild(tr);
    }
  }
}

function styleRow(row) {
  var table = document.getElementById('barter-table');
  var tr = document.createElement('tr'); 

  for (var y = 0; y < 12; y++) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var td = document.createElement('td');
    var text = document.createTextNode(row[y]);

    for (var a = 0; a < barterArray.length; a++) {
      if (row.indexOf(jsUcfirst(barterArray[a])) > -1) {
        tr.className = barterArray[a] + '-row barter-row';
        if (barterArray[a] == 'prapor') { tr.style.display = 'table' } else {
          tr.style.display = 'none'; }
      } else if (tr.className.length == 0) {
        tr.className = 'other-barter-row ammo-row';
        tr.style.display = 'none';
      }
    }

    if (y == 6) {td.className = 'success';}

    if (typeof row[10] != 'undefined' && row[10].length > 0) {tr.className = tr.className + ' tradeable-row'; }
    if (typeof row[9] != 'undefined' && row[9].length > 0) {tr.className = tr.className + ' quest-row'; }
    if (typeof row[11] != 'undefined' && row[11].length > 0) {tr.className = tr.className + ' buyable-row'; }
    if (typeof row[y] == 'undefined') { 
      var td = document.createElement('td');
      var text = document.createTextNode('');
    }

    var value = document.createElement('span');

    switch (y) {
      case 0:
        td.appendChild(styleCat(row[1])); //Swap Category to row 0
        break;
      case 1:
        td.colSpan = 2;
        let cleanTitle = row[0].replace(/\([^)]*\)/gi,'');
        td.innerHTML = '<a target="_blank" href="https://escapefromtarkov.gamepedia.com/'+cleanTitle+'">'+row[0]+'</a>'; //Swap Item to row 1
        break;
      case 2:
        if (row[3] == row[4]) { 
          value.innerHTML = row[2] +'₽';
          } else {
          value.innerHTML = '<span title="Maximum Price" class="alert-success"><span class="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span class="sell-min">' + 
            row[3] + '₽</span> <br /> <span title="Average Price" class="alert-info"><span class="glyphicon glyphicon-minus" aria-hidden="true"></span><span class="sell-max">' + 
            row[4] + '₽</span> <br /> <span title="Minimum Price" class="alert-danger"><span class="glyphicon glyphicon-chevron-down" aria-hidden="true"></span><span class="sell-avg">' + 
            row[2] + '₽</span></span>';
        }
        td.appendChild(value);
        td.colSpan = 2;
        tr.appendChild(td);
        tbody.appendChild(tr);
        break;
      case 6:
        value.innerHTML = row[6] +  
          '₽ (' + row[7] + ':' + row[5] + ')';
        td.colSpan = 2;
        td.appendChild(value);
        break;
      default:
        td.appendChild(text);
    }

    if (dnr.indexOf(y) > -1) { 
    } else {
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
  }
}

function styleCat(row) {
  if (row == 'Mod') {
    var img = document.createElement('img');
    img.src = mods;
    img.alt = row;
    img.title = row;
    return img;
  } else { return document.createTextNode(row); }
}