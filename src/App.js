import React, { Component } from "react";
// import L from 'leaflet'
import VTMap from "./VTMap";
import PointChecker from "./Components/PointGenerator";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      coords: [44.0886, -72.7317],
      zoom: 8,
      latStatus: "",
      longStatus: "",
      countyStatus: "",
      townStatus: "",
    };
  }

  StartGame = (evt) => {
    evt.preventDefault();
    this.setState({ gameStarted: true });

    // move map to random coordinates

    let result = PointChecker();
    console.log(result);
    this.setState(() => {
      return {
        coords: [result[0], result[1]],
        zoom: 18,
        latStatus: "?",
        longStatus: "?",
        countyStatus: "?",
        townStatus: "?",
        points: 100
      };
    });
  };
  
  GiveUp = (evt) => {
    evt.preventDefault()

    this.setState(() => {
      return {
        latStatus: (this.state.coords[0]).toFixed(4),
        longStatus: (this.state.coords[1]).toFixed(4),
        countyStatus: "?",
        townStatus: "?",
        points: 100
      };
    });

    this.findCounty()
}

findCounty = () => {
  fetch(`https://nominatim.openstreetmap.org/reverse?lat=<${this.state.coords[0]}>lon=<${this.state.coords[1]}>`)
  .then(res => res.json())
  .then(json => {
    let locationData = json;
    console.log(locationData);
  })
}

directional = () => {
    this.setState(() => {
      let newPoints = this.state.points - 1;
      return {
        points: newPoints
      }
  })
}

moveNorth = (evt) => {
  evt.preventDefault();
  console.log('went north');
  this.directional()
}

  moveSouth = (evt) => {
    evt.preventDefault();
    console.log("Went south");
    this.directional()
  };

  moveEast = (evt) => {
    evt.preventDefault();
    console.log("Went east");
    this.directional()
  };

  moveWest = (evt) => {
    evt.preventDefault();
    console.log("Went west");
    this.directional()
  };

  render() {
    return (
      <div>
        {/* GAME MAP  */}
        <VTMap coords={this.state.coords} zoom={this.state.zoom} />

        {/* START BUTTON  */}
        <button
          id="start"
          onClick={this.StartGame}
          style={{ display: this.state.gameStarted ? "none" : "inline" }}
        >
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
        <button
          id="quit"
          onClick={this.GiveUp}
          style={{ display: this.state.gameStarted ? "inline" : "none" }}
        >
          I give up.
        </button>

        {/* LOCATION FIELDS  */}
        <div id="info_panel">
          <div id="lat_field">Latitude: {this.state.latStatus}</div>
          <div id="long_field">Longitude: {this.state.longStatus}</div>
          <div id="count_field">County: {this.state.countyStatus}</div>
          <div id="town_field">Town: {this.state.townStatus}</div>
          <div id="points_field">Points: {this.state.points}</div>
        </div>

        {/* DIRECTION BUTTONS  */}
        <div
          id="button_container"
          style={{ display: "grid", border: "1px solid black" }}
        >
          <button
            id="northBtn"
            onClick={this.moveNorth}
            disabled={this.state.gameStarted ? false : true}
          >
            N
          </button>
          <button
            id="southBtn"
            onClick={this.moveSouth}
            disabled={this.state.gameStarted ? false : true}
          >
            S
          </button>
          <button
            id="eastBtn"
            onClick={this.moveEast}
            disabled={this.state.gameStarted ? false : true}
          >
            E
          </button>
          <button
            id="westBtn"
            onClick={this.moveWest}
            disabled={this.state.gameStarted ? false : true}
          >
            W
          </button>
        </div>
      </div>
    );
  }
}

export default App;
