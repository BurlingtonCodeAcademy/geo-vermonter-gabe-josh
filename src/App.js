import React, { Component } from "react";
// import L from 'leaflet'
import VTMap from "./VTMap";
import PointChecker from './Components/PointGenerator'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      coords: [44.0886, -72.7317],
      zoom: 8
    };
  }

  StartGame = (evt) => {
    evt.preventDefault();
    this.setState({gameStarted: true});

    // move map to random coordinates
    
    let result = PointChecker()
    console.log(result)
    this.setState(() => {
      return {coords: [result[0], result[1]],
      zoom: 18 }
    })
  }

  render() {
    return (
      <div>
        {/* GAME MAP  */}
        <VTMap 
        coords={this.state.coords}
        zoom={this.state.zoom}
        />

         {/* START BUTTON  */}
        <button id="start" onClick={this.StartGame} style={{display: this.state.gameStarted ? "none" : "inline" }}>
          Start Game
        </button>

        {/* GUESS BUTTON  */}
        <button
          id="guess"
          onClick={this.Guess}
          style={{ display: this.state.gameStarted ? "inline" : "none" }}
        >
          Make a Guess
        </button>

        {/* QUIT BUTTON  */}
        <button id="quit" onClick={this.GiveUp} style={{ display: this.state.gameStarted ? "inline" : "none" }}>
          I give up.
        </button>

        <div id='info'>

        </div>

        {/* LOCATION FIELDS  */}
        <div id="address_container">
          <div id="lat_field"></div>
          <div id="long_field"></div>
          <div id="count_field"></div>
          <div id="town_field"></div>
        </div>

        {/* DIRECTION BUTTONS  */}
        <button id="northBtn"></button>
        <button id="southBtn"></button>
        <button id="eastBtn"></button>
        <button id="westBtn"></button>


      </div>
    );
  }
}

export default App;
