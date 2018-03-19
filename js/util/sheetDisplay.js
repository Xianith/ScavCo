/* eslint max-len: 0 */
import React from 'react';
import ReactTable from 'react-table'
import { initGapi, loadGapi } from '../util/gapiData'
// import {sArray} from '../data/headers'

import '../../css/sheets.css'
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import {sArray} from '../data/headers'

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
                // rowObj.push(sArray[sheetIndex].colObj(entry))
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
             {sheet < 2 &&
              <span>
              <a id="ammoTableSwapper" style={{color: "gray", float: "right", cursor:"pointer"}} onClick={this.tableSwap}>Switch to Unofficial Data</a>
              </span>
              }
             </div>
            }
    </div>);
  }
}