import React, { Component } from 'react';
import { render } from 'react-dom';

import CustomSortTable from '../util/sheetDisplay'

export default class Ammo extends Component {
  constructor(props) {
    super();
  }

  componentDidMount() {
   // if (document.getElementById("footer").style.display != 'block') { document.getElementById("footer").style.display = 'block'; }
    document.title = "Scav Co 🔸 Ammo";
    document.getElementById('MainMenu').style.display = 'block';
  }

  render(){
    return(
      <CustomSortTable pathname='ammo' />
    )
  }

}