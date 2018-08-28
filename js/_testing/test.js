/* eslint max-len: 0 */
import React from 'react';
import ReactTable from 'react-table'
import { initGapi, loadGapi } from '../util/gapiData'
import { nameClean } from '../data/sheetStyles'
// import {sArray} from '../data/headers'

import '../../css/sheets.css'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function priceExpand(t) {
  console.log(t)
}

var sArray = [{
  "name":"Official",
  "color":"#d7b100",
  "id":"1l_8zSZg-viVTZ2bavMEIIKhix6mFTXuVHWcNKZgBrjQ",
  "range":"A1:J67",
  "credit":"",
  "header": [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      width: 250, 
      Cell: props => {let name = nameClean(props.value);
        let url = "https://escapefromtarkov.gamepedia.com/" + name;

        return <a target="_blank" href={url}>{name}</a>}
    }, {
      Header: 'Price',
      accessor: 'price',
      minWidth: 100,
      sortFunc:  (a, b) => {
                           return a > b;
                       }, 
      Cell: props => <span className='number'>{props.value} ₽</span> // Custom cell components!
    }, {
      accessor: 'damage', // Required because our accessor is not a string
      Header: 'Damage',
      minWidth: 100
    }, {
      accessor: 'armorpen', // Required because our accessor is not a string
      Header: 'Armor Pen',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'speed', // Required because our accessor is not a string
      Header: 'Speed',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'richo', // Required because our accessor is not a string
      Header: 'Richochet %',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'frag', // Required because our accessor is not a string
      Header: 'Frag %',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'meta', // Required because our accessor is not a string
      Header: 'Usefullness',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }],
  "dnr": [7]
},{
  "name":"Unofficial",
  "color":"gray",
  "credit":"",
  "id":"1t4lA1NCQmM0NpTprGJT7rDVKZXHmQuPzQK5Ul23UoVo",
  "range":"A1:P72",
  "header": [{
      Header: 'Name',
      accessor: 'name', // String-based value accessors!
      width: 250, 
      Cell: props => <a target="_blank" href="https://escapefromtarkov.gamepedia.com/{props.value}">{props.value}</a>
    }, {
      accessor: 'damage', // Required because our accessor is not a string
      Header: 'Damage',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'armorpen', // Required because our accessor is not a string
      Header: 'Armor Pen',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'speed', // Required because our accessor is not a string
      Header: 'Speed',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'tracer', // Required because our accessor is not a string
      Header: 'Tracer',
      Cell: props =>{ if (props.row.tracer == 'TRUE') {return <span>✓</span>} else {return <span>X</span>}} ,
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }, {
      accessor: 'armordmg', // Required because our accessor is not a string
      Header: 'Armor Damage',
      minWidth: 100,
      sortFunc:  (a, b) => {
                         if (a.length === b.length) {
                           return a > b ? 1 : -1;
                         }
                         return a.length > b.length ? 1 : -1;
                       }, 
    }],
  "dnr": [1,2,3,6,11]
},{
  "name":"Barter",
  "color":"green",
  "credit": "Which is maintained by /u/Gieke85", //<i>Which is maintained by <a href="https://www.reddit.com/user/Gieke85">/u/Gieke85</a></i>
  "id":"1Yk-VriCy_8vDH4V9SsLwRYxem2mkzoDrULiaHZY5UGQ",
  "range":"A3:L189",
  "dnr": [3,4,5,7,8],
  "header": [{
      Header: 'Category',
      accessor: 'cat', 
      filterable: false,
      filterall: false,
      width: 100
    }, {
      Header: 'Item',
      accessor: 'item',
      width: 250, 
      Cell: props => {let name = props.value.replace(/\([^)]*\)/gi,'');
        let url = "https://escapefromtarkov.gamepedia.com/" + name;

        return <a target="_blank" href={url}>{name}</a>}
    }, {
      accessor: 'price', // Required because our accessor is not a string
      Header: 'Price',
      minWidth: 100,
      filterable: false,
      filterall: false,
        Cell: props => {
        if (props.value[1] == props.value[2]) { 
          return <span>{props.value[0]}₽</span>;
          } else { 
            return <span style={{display: "flex"}}>
              <span style={{display: "none"}} title="Maximum Price" className="alert-success"><span className="glyphicon glyphicon-chevron-up" aria-hidden="true"></span><span className="sell-min">{props.value[1]} ₽</span></span><br />
              <span title="Average Price" style={{cursor:"pointer"}} className="alert-info" onClick={priceExpand(this)}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span><span className="sell-max">{props.value[2]} ₽</span></span><br />
              <span style={{display: "none"}}title="Minimum Price" className="alert-danger"><span className="glyphicon glyphicon-chevron-down" aria-hidden="true"></span><span className="sell-avg">{props.value[0]} ₽</span></span>
              </span>
          }
        }
    }, {
      accessor: 'value', // Required because our accessor is not a string
      Header: 'Value',
      minWidth: 100,
      className: 'value-row',
      filterable: false,
      filterall: false,
      Cell: props => { return <span>{props.value[1]}₽ ({props.value[2]}:{props.value[0]})</span>}
    }, {
      accessor: 'quest', // Required because our accessor is not a string
      Header: 'Quest',
      id: 'quest',
      minWidth: 100,
      Cell: ({ value }) => (value == '' || value == undefined ? "No" : value),
      filterMethod: (filter, row) => {
        console.log(row);
        console.log(row[filter.id]);
         if (filter.value === "all") {
           return true;
         }
         if (filter.value === "true") {
           return row[filter.id] != 'No' && row[filter.id] != undefined && row[filter.id] != "" ;
         }
         return row[filter.id] == "";
       },
       Filter: ({ filter, onChange }) =>
         <select
           onChange={event => onChange(event.target.value)}
           style={{ width: "100%" }}
           value={filter ? filter.value : "all"}
         >
           <option value="all">Show All</option>
           <option value="true">Yes</option>
           <option value="false">No</option>
         </select>
    }, {
      accessor: 'trade', // Required because our accessor is not a string
      Header: 'Tradeable',
      minWidth: 100,
      Cell: ({ value }) => (value == '' || value == undefined ? "No" : value),
      filterMethod: (filter, row) => {
        console.log(row);
        console.log(row[filter.id]);
         if (filter.value === "all") {
           return true;
         }
         if (filter.value === "true") {
           return row[filter.id] != 'No' && row[filter.id] != undefined && row[filter.id] != "" ;
         }
         return row[filter.id] == "";
       },
       Filter: ({ filter, onChange }) =>
         <select
           onChange={event => onChange(event.target.value)}
           style={{ width: "100%" }}
           value={filter ? filter.value : "all"}
         >
           <option value="all">Show All</option>
           <option value="true">Yes</option>
           <option value="false">No</option>
         </select>
    }, {
      accessor: 'buy', // Required because our accessor is not a string
      Header: 'Buyable',
      minWidth: 100,
      Cell: ({ value }) => (value == '' || value == undefined ? "No" : value),
      filterMethod: (filter, row) => {
        console.log(row);
        console.log(row[filter.id]);
         if (filter.value === "all") {
           return true;
         }
         if (filter.value === "true") {
           return row[filter.id] != 'No' && row[filter.id] != undefined && row[filter.id] != "" ;
         }
         return row[filter.id] == "";
       },
       Filter: ({ filter, onChange }) =>
         <select
           onChange={event => onChange(event.target.value)}
           style={{ width: "100%" }}
           value={filter ? filter.value : "all"}
         >
           <option value="all">Show All</option>
           <option value="true">Yes</option>
           <option value="false">No</option>
         </select>
    }]
}];


export default class CustomSortTable extends React.Component {
  constructor(props) {
      super();
      this.state = {rows: [], columns: [], sheet: 1};

      this.tableSwap = this.tableSwap.bind(this);
  }

  getGoog(sheetIndex) {
    initGapi(sArray[sheetIndex].id, sArray[sheetIndex].range, (resp) => {
      let range = resp.result;
       if (range.values.length > 0) {
         for (var i = 0; i < range.values.length; i++) {
           var row = range.values[i];
           var rowObj = [], columnObj = [];
           var count = 0;

            range.values.forEach(function(entry) {
              if (count > 0) {
                if (sheetIndex == 0) {
                  rowObj.push({
                    name: entry[0],
                    price: parseInt(entry[1]),
                    damage: parseInt(entry[2]),
                    armorpen: parseInt(entry[3]),
                    speed: parseInt(entry[4]),
                    richo: entry[5],
                    frag: entry[6],
                    meta: parseInt(entry[8]),
                  })
                } else if (sheetIndex == 1) {
                  rowObj.push({
                    name: entry[0],
                    damage: parseInt(entry[4]),
                    armorpen: parseInt(entry[5]),
                    armordmg: parseInt(entry[7]),
                    tracer: entry[9],
                    speed: parseInt(entry[10]),
                  })
                } else if (sheetIndex == 2) {
                  rowObj.push({
                    cat: entry[1],
                    item: entry[0],
                    price: [entry[2], parseInt(entry[3]),entry[4]],
                    value: [ parseInt(entry[5]),entry[6],entry[7]],
                    quest: entry[9],
                    trade: entry[10],
                    buy: entry[11],
                  })
                }
              }
              count++

            });
            this.setState({rows: rowObj, columns: sArray[sheetIndex].header}); 
            }
         }
    }); 
  }

  componentDidMount() {
    document.getElementById('MainMenu').style.display = 'block';
    loadGapi();

    if(this.props.pathname == 'bartering') {
      this.getGoog(2);
      this.setState({sheet: 2});
      // document.getElementById('ammoTableSwapper').style.display = 'none';
    } else {
      this.getGoog(0);
      this.setState({sheet: 0});
    }
  }

  updateFooter(sheetIndex) {
    var swap = document.getElementById('ammoTableSwapper');
    var link = document.getElementById('ammoTableLink');

    swap.innerHTML = 'Switch to '+ sArray[sheetIndex].name +' Data';
    swap.style.color = sArray[sheetIndex].color;
    link.href  = 'https://docs.google.com/spreadsheets/d/'+sArray[sheetIndex].id;
  }

  tableSwap(event) {
    if (this.state.sheet == 0) {
      this.getGoog(1);
      this.updateFooter(0);
      this.setState({sheet: 1});
    } else {
      this.getGoog(0);
      this.updateFooter(1);
      this.setState({sheet: 0});
    }
  }

  render() {
    const { rows, sheet, columns } = this.state;

    return (
      <div>
          {rows.length == 0 &&
          <div className="loading-div">Loading...</div>
          }
          {rows.length > 0 &&
            <div className="jumbotron contentcontainer tab-container" id="Ammo" >
              <ReactTable
                data={rows}
                columns={columns}
                defaultPageSize={10}
                className="-striped -highlight"
                showPageSizeOptions={false}
                resizable= {false}
                showPageJump= {false}
                filterable={true}
                subComponent={row => {
                  return(<div>Test</div>)
                }}
              />
             <span>Data is pulled from the following <a id="ammoTableLink" target="_blank" href={'https://docs.google.com/spreadsheets/d/'+sArray[sheet].id}>spreadsheet</a>. <i>{sArray[sheet].credit}</i></span>
             {sheet == 0 &&
              <span>
              <a id="ammoTableSwapper" style={{color: "gray", float: "right", cursor:"pointer"}} onClick={this.tableSwap}>Switch to Unofficial Data</a>
              </span>
              }
             </div>
            }
    </div>);
  }
}