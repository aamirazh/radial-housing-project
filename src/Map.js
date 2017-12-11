import React, { Component } from 'react';
import logo from './logo.svg';
import './Map.css';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

// const position = [51.505, -0.09]

class Map1 extends Component {

  constructor() {
  super();
  this.state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  };
  }

  render () {

    const position = [this.state.lat, this.state.lng];
    return (
      <div className = "leaflet-container">
        <header>

        </header>
        <Map center={position} zoom={this.state.zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        />
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup.<br />Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default Map1;
