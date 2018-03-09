import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/tabs.css';
import mods from '../../assets/categories/mods.png'
import { navMenu } from '../menu'
import { initGapi } from '../util/gapiData.js'
import { jsUcfirst } from '../app'

var SHEET_ID = '1Yk-VriCy_8vDH4V9SsLwRYxem2mkzoDrULiaHZY5UGQ'
var RANGE = 'A3:L189'

var dnr = [3,4,5,7,8] //Rows that should not be rendered

var barterArray = [{"name":"prapor","status":"barter-btn-active"},
{"name":"therapist","status":""},
{"name":"fence","status":""},
{"name":"skier","status":""},
{"name":"peacekeeper","status":""},
{"name":"tradeable","status":""},
{"name":"buyable","status":""}];

var catArray = ['tradeable','buyable'];

export default class Barter extends Component {
  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    var goog = initGapi(SHEET_ID, RANGE, (resp) => {
      tableStylize(resp, 'barter-table');
    }); 
  }

  componentDidMount() {
   // if (document.getElementById("footer").style.display != 'block') { document.getElementById("footer").style.display = 'block'; }
  document.title = "Scav Co 🔸 Barter";
  }

  handleClick(event) {
    const {id} = event.target;
    navMenu(id,'barter');
  }

  render() {
    return (<div>
        <div className="loading-div">Loading...</div>  
      <div className="jumbotron contentcontainer tab-container" id="Bartering" style={{display:"none"}}>
        <div className="sub-nav-menu"><center>
        {barterArray.map((btn) =>
               <button id={'sort-'+btn.name} className={btn.status} onClick={this.onClick}>{jsUcfirst(btn.name)}</button>
            )}
        </center></div>

      <table data-toggle="table" id="barter-table" className="sheets-table table table-fixed table-hover table-responsive table-sm" cellSpacing="0" width="100%">
        <thead></thead>
        <tbody></tbody>
      </table>

      <span>Data is pulled from the following <a href={'https://docs.google.com/spreadsheets/d/'+SHEET_ID}>spreadsheet</a>. <i>Which is maintained by <a href="https://www.reddit.com/user/Gieke85">/u/Gieke85</a></i></span>
    </div></div>);
  }
}

function updateSignInStatus(isSignedIn) {
  if (isSignedIn) {
    makeApiCall();
  } else { makeApiCall(); }
}

function tableStylize(response, table) {
  document.getElementById(table).innerHTML = '<thead></thead><tbody></tbody>';
   var range = response.result;
    if (range.values.length > 0) {
      for (var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        if (i == 0) { styleHeader(row,); } else { styleRow(row); }
      }
      document.getElementsByClassName('loading-div')[0].remove();
      document.getElementById('Bartering').style.display = 'block';
    } else {
      tableFill('No data found.');
    }
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
      if (row.indexOf(jsUcfirst(barterArray[a].name)) > -1) {
        tr.className = barterArray[a].name + '-row barter-row';
        if (barterArray[a].name == 'prapor') { tr.style.display = 'table' } else {
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