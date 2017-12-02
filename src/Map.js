import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';



class Map extends Component {
  render () {
    return (
      <div>
        <header>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.2.0/dist/leaflet.css"
     integrity="sha512-M2wvCLH6DSRazYeZRIm1JnYyh22purTM+FDB5CsyxtQJYeKq83arPe5wgbNmcFXGqiSH2XR8dT/fJISVA1r/zQ=="
     crossorigin=""/>
         <script src="https://unpkg.com/leaflet@1.2.0/dist/leaflet.js"
      integrity="sha512-lInM/apFSqyy1o6s89K4iQUKg6ppXEgsVxT35HbzUupEVRh2Eu9Wdl4tHj7dZO0s1uvplcYGmt3498TtHq+log=="
      crossorigin=""></script>
          <h1>Hi</h1>

        </header>
        hi
        <div id="mapid"></div>
      </div>
    );
  }
}

export default Map;
