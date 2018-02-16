import React, { Component } from 'react';
import { render } from 'react-dom';

// import '../css/ammo.css'
import '../css/barter.css'

var SHEET_ID = '1t4lA1NCQmM0NpTprGJT7rDVKZXHmQuPzQK5Ul23UoVo';
var RANGE = 'A1:P72';

var API_KEY = 'AIzaSyBuiD7FAD9c7PAj0Np_ZwVsiHLbyTLKoBk';
var CLIENT_ID = '268531681980-bqf0gvhlgt0op2u526ts5ppvoov3hfk3.apps.googleusercontent.com';
var SCOPE = 'https://www.googleapis.com/auth/spreadsheets';

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

    let total = 0;

    const ammo = id.replace('sort-','') + '-row';
    const ammoRows = document.getElementsByClassName('ammo-row');
    const ammoBtns = document.getElementsByClassName('ammo-btn');

    for (var i=0; i < ammoBtns.length; i++) {
      if (ammoBtns[i].id.includes(ammo))
      { ammoBtns[i].classList.add('ammo-btn-active'); } else { ammoBtns[i].classList.remove('ammo-btn-active'); }
    }

    for (var i=0; i < ammoRows.length; i++) {
      if (ammoRows[i].className.includes(ammo))
      { ammoRows[i].style.display = "table"; } else { ammoRows[i].style.display = "none"; }
    }
  }

  render() {
    return (  
      <div className="jumbotron contentcontainer ammo-container" id="Ammo" style={{display: "none"}}>
       <div class="ammo-menu"><center>
             <button id="sort-545x39" class="btn btn-default ammo-btn" onClick={this.onClick}>5.45x39</button>
             <button id="sort-556x45" class="btn btn-default ammo-btn" onClick={this.onClick}>5.56x45</button>
             <button id="sort-762x25" class="btn btn-default ammo-btn" onClick={this.onClick}>7.62x25</button>
             <button id="sort-other-ammo" class="btn btn-default ammo-btn" onClick={this.onClick}>Other</button>
           </center></div>

           <table id="ammo-table" class="table table-fixed table-hover table-bordered table-responsive table-sm" cellspacing="0" width="100%">
             <thead></thead>
             <tbody></tbody>
           </table>

      <span>Data is pulled from the following <a href={'https://docs.google.com/spreadsheets/d/'+SHEET_ID}>spreadsheet</a>.</span>
    </div>);
  }
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

var dnr = [1,2,3,6,11]; //Rows that should not be rendered

function styleHeader(row) {
  var table = document.getElementById('ammo-table');
  var tr = document.createElement('tr');

  for (var y = 0; y < 12; y++) {
    var thead = table.getElementsByTagName('thead')[0];
    var th = document.createElement('th');

    switch (y){
      case 5:
        th.title = 'Armor Penetration Power';
        th.innerHTML = 'Pen';
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

function styleRow(row) {
  var table = document.getElementById('ammo-table');
  var tr = document.createElement('tr'); 

  for (var y = 0; y < 12; y++) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var td = document.createElement('td');

    if (row[0].indexOf('.366') > -1) {
      tr.className = '366-row ammo-row';
      tr.style.display = 'none';
      } else if (row[0].indexOf('5.45x39') > -1) {
        tr.className = '545x39-row ammo-row';
        tr.style.display = 'none';
      } else if (row[0].indexOf('5.56x45') > -1) {
        tr.className = '556x45-row ammo-row';
        tr.style.display = 'none';
      } else if (row[0].indexOf('7.62x25') > -1) {
        tr.className = '762x25-row ammo-row';
      } else {
        tr.className = 'other-ammo-row ammo-row';
        tr.style.display = 'none';
    }

    switch (y) {
      case 0:
        td.title = row[1] + ' / ' + row[2];
        td.innerHTML = row[y];
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