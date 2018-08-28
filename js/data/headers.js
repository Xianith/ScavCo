import React from 'react';
import ReactTable from 'react-table'

function priceExpand(t) {
  console.log(t)
}

export function nameClean(name) {

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

export var sArray = [{
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
      filterable: false,
      filterall: false,
      minWidth: 100,
      sortFunc:  (a, b) => {
                           return a > b;
                       }, 
      Cell: props => <span className='number'>{props.value} ₽</span> // Custom cell components!
    }, {
      accessor: 'damage', // Required because our accessor is not a string
      Header: 'Damage',
      filterable: false,
      filterall: false,
      minWidth: 100
    }, {
      accessor: 'armorpen', // Required because our accessor is not a string
      Header: 'Armor Pen',
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      filterable: false,
      filterall: false,
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
      minWidth: 100,
      Cell: ({ value }) => (value == 'FALSE' ? <span>X</span> : <span>✓</span>),
      filterMethod: (filter, row) => {
         if (filter.value === "all") {
           return true;
         }
         if (filter.value === "true") {
           return row[filter.id] != 'FALSE';
         }
         return row[filter.id] == "FALSE";
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
      accessor: 'armordmg', // Required because our accessor is not a string
      Header: 'Armor Damage',
      filterable: false,
      filterall: false,
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
              <span title="Average Price" style={{cursor:"pointer"}} className="alert-info" onclick={priceExpand(this)}><span className="glyphicon glyphicon-minus" aria-hidden="true"></span><span className="sell-max">{props.value[2]} ₽</span></span><br />
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