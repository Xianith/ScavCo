import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";

import '../../css/tabs.css'
import { navMenu } from '../menu.js';

var SHEET_ID = '1t4lA1NCQmM0NpTprGJT7rDVKZXHmQuPzQK5Ul23UoVo';

var RANGE = 'A1:P72';

var API_KEY = 'AIzaSyBuiD7FAD9c7PAj0Np_ZwVsiHLbyTLKoBk';
var CLIENT_ID = '268531681980-bqf0gvhlgt0op2u526ts5ppvoov3hfk3.apps.googleusercontent.com';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

var dnr = [1,2,3,6,11]; //Rows that should not be rendered
var ammoArray = [{"name":"7.62x","id":"762x","status":"ammo-btn-active"},
  {"name":"9x","id":"9x","status":""},
  {"name":"5.45x39","id":"545x39","status":""},
  {"name":"5.56x45","id":"556x45","status":""},
  {"name":".366","id":"366","status":""},
  {"name":"Other","id":"other-ammo","status":""}];

export default class OldAmmo extends Component {

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

  ComponentDidMount() {
    if (document.getElementById("footer").style.display != 'block') { document.getElementById("footer").style.display = 'block'; }
  }

  tableSwap(event) {
    document.getElementById('Ammo').style.display = 'block';
    document.getElementById('Ammo-Two').style.display = 'none';
  }

  handleClick(event) {
    const {id} = event.target;
    navMenu(id,'ammo');
  }

  render() {
    
    return (  
      <div className="jumbotron contentcontainer ammo-container" id="Ammo-Two" style={{display: "none"}}>
       <div className="ammo-menu"><center>
           {ammoArray.map((btn) =>
                  <button id={'sort-'+btn.id} className={'btn btn-default ammo-btn '+btn.status} onClick={this.onClick}>{btn.name}</button>
                 )}
           </center></div>

           <table id="ammo-table" className="table table-fixed table-hover table-responsive table-sm" cellSpacing="0" width="100%">
             <thead></thead>
             <tbody></tbody>
           </table>

      <span>Data is pulled from the following <a href={'https://docs.google.com/spreadsheets/d/'+SHEET_ID}>spreadsheet</a>.
      <a href="#" style={{color: "#d7b100", float: "right"}} onClick={this.tableSwap}>Switch to Official Data</a></span>
    </div>);
  }
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    makeApiCall();
  } else { makeApiCall(); }
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
      document.getElementById(table).style.display = "table";
    } else {
      tableFill('No data found.');
    }
  }, function(reason) {
    console.log('error: ' + reason.result.error.message);
  });
}

function makeApiCall() {
  var params = {
    spreadsheetId: SHEET_ID,
    range: RANGE,
    valueRenderOption: 'FORMATTED_VALUE',
    dateTimeRenderOption: 'SERIAL_NUMBER',
  };
  tableStylize(params, 'ammo-table');
}

var tableArray = [
  {"id": 0,
  "colspan":2,
  "header":{
      "title":"",
      "html":"Name"
    },
  "row":{
    "title":"row[1] + \' / \' + row[2]",
    "html":"'<a target=\"_blank\" href=\"https://escapefromtarkov.gamepedia.com/'+row[y]+'\">'+row[y]+'</a>'"
  }
}]

function tableBuilder(row, table, num, dnr) {
  for (var y = 0; y < 12; y++) {
    var thead = table.getElementsByTagName('thead')[0];
    var th = document.createElement('th');

    // for (var t = 0; t < tableArray.length; t++) {
    //   th.innerHTML = tableArray[t].header.html;
    //   th.title = tableArray[t].header.title;
    //   th.colSpan = tableArray[t].colspan;
    // }

    if (dnr.indexOf(y) > -1) { } 
    else {
      tr.appendChild(th);
      thead.appendChild(tr);
    }
  }
}

function styleHeader(row, Table) {
  var table = document.getElementById(Table);
  var tr = document.createElement('tr');

  for (var y = 0; y < 12; y++) {
    var thead = table.getElementsByTagName('thead')[0];
    var th = document.createElement('th');

    // for (var t = 0; t < tableArray.length; t++) {
    //   th.innerHTML = tableArray[t].header.html;
    //   th.title = tableArray[t].header.title;
    //   th.colSpan = tableArray[t].colspan;
    // }

    switch (y){
      case 0:
        th.innerHTML = 'Name';
        th.colSpan = 2;
        break;
      case 5:
        th.title = 'Armor Penetration Power';
        th.innerHTML = 'Penetration';
        break;
      case 7:
        th.title = 'Armor Damage';
        th.innerHTML = 'Armor Dmg';
        break;
      case 9:
        th.title = 'Tracer Round';
        th.innerHTML = 'Tracer';
        break;
      case 10:
        th.innerHTML = 'Misfire Chance';
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

  for (var y = 0; y < 12; y++) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var td = document.createElement('td');

    for (var a = 0; a < ammoArray.length; a++) {
      // console.log(row[0] +' => '+ammoArray[a].name);
      // if (row[0].indexOf(ammoArray[a].name) > -1) {
      if (row[0].includes(ammoArray[a].name)) {
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
        td.title = row[1] + ' / ' + row[2];
        td.innerHTML = '<a target="_blank" href="https://escapefromtarkov.gamepedia.com/'+row[y]+'">'+row[y]+'</a>';
        break;
      case 5:
        td.title ='Armor Penetration Power';
        td.innerHTML = row[y] + ' <span class="alert-info" title="Max Armor Penetration Class">(' + row[6] + ')</span>'+
          ' <span class="alert-warning" title="Penetration Power Deveation">' + row[11] + '</span>';
        break;
      case 9:
        if (row[y] == 'TRUE') {
          td.className = 'success';
          td.innerHTML = '✓';
          break;
        } else {
          td.className = 'danger';
          td.innerHTML = '<b>X</b>';
          break;
        }
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