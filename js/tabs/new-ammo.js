import React, { Component } from 'react';
import { render } from 'react-dom';

import '../../css/tabs.css'
import { navMenu } from '../menu';
import { initGapi } from '../util/gapiData'
import { offStyleH, offStyleR, uOffStyleH, uOffStyleR } from '../data/sheetStyles'

// const $ = require('jquery');
// $.DataTable = require('datatables.net');

var sArray = [{
  "name":"Official",
  "color":"#d7b100",
  "id":"1l_8zSZg-viVTZ2bavMEIIKhix6mFTXuVHWcNKZgBrjQ",
  "range":"A1:J67",
  "styler":{
    "header":offStyleH,
    "row":offStyleR
  },
  "dnr": [7]
},{
  "name":"Unofficial",
  "color":"gray",
  "id":"1t4lA1NCQmM0NpTprGJT7rDVKZXHmQuPzQK5Ul23UoVo",
  "range":"A1:P72",
  "styler":{
    "header":uOffStyleH,
    "row":uOffStyleR
  },
  "dnr": [1,2,3,6,11]
}];

var sheet = 0;

var ammoArray = [{"name":"7.62x","id":"762x","status":"ammo-btn-active"},
  {"name":"9x","id":"9x","status":""},
  {"name":"5.45x39","id":"545x39","status":""},
  {"name":"5.56x45","id":"556x45","status":""},
  {"name":".366","id":"366","status":""},
  {"name":"Other","id":"other-ammo","status":""}];

export default class Ammo extends Component {
  constructor(props) {
    super();
    this.onClick = this.handleClick.bind(this);
    this.tableSwap = this.tableSwap.bind(this);
  }

  getGoog(sheetIndex) {
    var goog = initGapi(sArray[sheetIndex].id, sArray[sheetIndex].range, (resp) => {
      tableStylize(resp, 'ammo-table', sArray[sheetIndex].styler.header, sArray[sheetIndex].styler.row, sArray[sheetIndex].dnr);
      // $('#ammo-table').DataTable();
    }); 
  }

  updateFooter(sheetIndex) {
    var swap = document.getElementById('ammoTableSwapper');
    var link = document.getElementById('ammoTableLink');

    swap.innerHTML = 'Switch to '+ sArray[sheetIndex].name +' Data';
    swap.style.color = sArray[sheetIndex].color;
    link.href  = 'https://docs.google.com/spreadsheets/d/'+sArray[sheetIndex].id;
  }

  componentDidMount() {
    this.getGoog(0);
  }

  componentWillMount() {
   if (document.getElementById("footer").style.display != 'block') { document.getElementById("footer").style.display = 'block'; }
   document.title = "Scav Co 🔸 Ammo";
  }

  tableSwap(event) {
    if (sheet == 0) {
      this.getGoog(1);
      this.updateFooter(0);
      sheet = 1;
    } else {
      this.getGoog(0);
      this.updateFooter(1);
      sheet = 0;
    }
  }

  handleClick(event) {
    const {id} = event.target;
    navMenu(id,'ammo');
  }

  render() {
    return (<div>
      <div className="loading-div">Loading...</div>
      <div className="jumbotron contentcontainer tab-container" id="Ammo" style={{display:"none"}}>
       <div className="sub-nav-menu"><center>
           {ammoArray.map((btn) =>
                  <button id={'sort-'+btn.id} className={btn.status} onClick={this.onClick}>{btn.name}</button>
                 )}
           </center></div>

           <table ref="main" id="ammo-table" className="sheets-table table table-fixed sortable table-hover table-responsive table-sm" cellSpacing="0" width="100%">
           </table>

      <span>Data is pulled from the following <a id="ammoTableLink" href={'https://docs.google.com/spreadsheets/d/'+sArray[0].id}>spreadsheet</a>.
      <a id="ammoTableSwapper" style={{color: "#gray", float: "right", cursor:"pointer"}} onClick={this.tableSwap}>Switch to Unofficial Data</a></span>
    </div>
    </div>);
  }
}

function tableStylize(response, table, hStyler, rStyler, dnr) {
  document.getElementById(table).innerHTML = '<thead></thead><tbody></tbody>';
   var range = response.result;
    if (range.values.length > 0) {
      for (var i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        if (i == 0) { styleHeader(row, table, hStyler, dnr); } else { styleRow(row, table, rStyler, dnr); }
      }
      document.getElementsByClassName('loading-div')[0].remove();
      document.getElementById('Ammo').style.display = 'block';
    } else {
      tableFill('No data found.');
    }
}

function styleHeader(row, Table, styler, dnr) {
  var table = document.getElementById(Table);
  var tr = document.createElement('tr');

  for (var y = 0; y < 9; y++) {
    var thead = table.getElementsByTagName('thead')[0];
    var th = document.createElement('th');

    styler(y, row, th);

    if (dnr.indexOf(y) > -1) { } 
    else {
      tr.appendChild(th);
      thead.appendChild(tr);
    }
  }
}

function styleRow(row, Table, styler, dnr) {
  var table = document.getElementById(Table);
  var tr = document.createElement('tr'); 

  for (var y = 0; y < 9; y++) {
    var tbody = table.getElementsByTagName('tbody')[0];
    var td = document.createElement('td');

    for (var a = 0; a < ammoArray.length; a++) {
        if (row[0].includes(ammoArray[a].id) || row[0].includes(ammoArray[a].name)) {
          tr.className = ammoArray[a].id + '-row ammo-row';
          if (ammoArray[a].id == '762x') { tr.style.display = 'table' } else {
            tr.style.display = 'none'; }
        } else if (tr.className.length == 0) {
          tr.className = 'other-ammo-row ammo-row';
          tr.style.display = 'none';
        }
    }

    styler(y, row, td)

    if (dnr.indexOf(y) > -1) { } 
    else {
      tr.appendChild(td);
      tbody.appendChild(tr);
    }
  }
}