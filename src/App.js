import React, { Component } from "react";
// import L from "leaflet";
import VTMap from "./VTMap";
import PointChecker from "./Components/PointGenerator";
import "./App.css";
//import ModalConductor from './ModalConductor'
import { Modal, selectedCounty } from "./Components/Modal";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      coords: [43.9, -72.5],
      origCoords: [],
      zoom: 7,
      latStatus: "",
      longStatus: "",
      county: "",
      town: "",
      currentModal: "",
      guessModalDisplay: "none",
      gameStatus: "",
      startButtonDisplay: "",
      restartButtonDisplay: "none"
    };
  }

  restartGame = (evt) => {
    this.StartGame(evt);
  }

  //start function gets everything you need for the game and stores it in state.
  StartGame = (evt) => {
    this.setState({ 
      gameStarted: true,
      startButtonDisplay: 'none'
    });
    evt.preventDefault();
    let theCoordinate = PointChecker();
    fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${theCoordinate[0]}&lon=${theCoordinate[1]}`
    )
      .then((data) => data.json())
      .then((jsonObj) => {
        console.log(jsonObj);
        let town;
        town =
          jsonObj.address.city ||
          jsonObj.address.town ||
          jsonObj.address.village ||
          jsonObj.address.hamlet;
        this.setState({
          mainMap: {
            // lat: flippedPoint[0],
            // lon: flippedPoint[1],
          },
          zoom: 18,
          coords: [theCoordinate[0], theCoordinate[1]],
          origCoords: [theCoordinate[0], theCoordinate[1]],
          // mapCoords: [flippedPoint],
          county: jsonObj.address.county,
          town: town,
          points: 100,
          gameStarted: true,
          latStatus: "?",
          longStatus: "?",
          countyStatus: "?",
          townStatus: "?",
          startButtonDisplay: 'none'
        });
      });
    // move map to random coordinates
  };

  guessHandler = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => {
      //return { guessModal: !prevState.guessModal};
      return { guessModalDisplay: "" };
    });
  };

  handleClose = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return {
        guessModalDisplay: "none",
      };
    });
  };

  giveUp = (evt) => {
    evt.preventDefault();
    // let lat = this.state.coords[0];
    // let lon = this.state.coords[1];
    this.setState(() => {
      return {
        coords: [43.9, -72.5],
        zoom: 7,
        latStatus: this.state.coords[0].toFixed(4),
        longStatus: this.state.coords[1].toFixed(4),
        countyStatus: this.state.county,
        townStatus: this.state.town,
        points: -100,
      };
    });
  };

  directional = () => {
    this.setState(() => {
      let newPoints = this.state.points - 1;
      return {
        points: newPoints,
      };
    });
  };

  moveNorth = (evt) => {
    evt.preventDefault();
    this.directional();
    this.setState(() => {
      let newLat = this.state.coords[0] + 0.002;
      return {
        coords: [newLat, this.state.coords[1]],
      };
    });
  };

  moveSouth = (evt) => {
    evt.preventDefault();
    this.directional();
    this.setState(() => {
      let newLat = this.state.coords[0] - 0.002;
      return {
        coords: [newLat, this.state.coords[1]],
      };
    });
  };

  moveEast = (evt) => {
    evt.preventDefault();
    this.directional();
    this.setState(() => {
      let newLong = this.state.coords[1] + 0.003;
      return {
        coords: [this.state.coords[0], newLong],
      };
    });
  };

  moveWest = (evt) => {
    evt.preventDefault();
    this.directional();
    this.setState(() => {
      let newLong = this.state.coords[1] - 0.003;
      return {
        coords: [this.state.coords[0], newLong],
      };
    });
  };

  guessSubmit = () => {
    console.log("selected county: ");
    console.log(selectedCounty);
    console.log("this.state.county:");
    console.log(this.state.county);
    if (selectedCounty === this.state.county) {
      this.setState(() => {
        return {
          gameStarted: false,
          guessModalDisplay: "none",
          restartButtonDisplay: "",
          latStatus: this.state.coords[0].toFixed(4),
          longStatus: this.state.coords[1].toFixed(4),
          countyStatus: this.state.county,
          townStatus: this.state.town,
          gameStatus: "Correct!",
        };
      });
    } else {
      this.setState(() => {
        let newPoints = this.state.points - 10;
        return {
          points: newPoints,
          gameStatus: "Sorry, try again!",
        };
      });
    }

    this.setState(() => {
      return {
        guessModalDisplay: "none",
      };
    });
  };

  return = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return {
        coords: this.state.origCoords
      }
    })
  }

  render() {
    return (
      <div id="main">
        {/* <ModalConductor close={this.hideModal} /> */}
        <Modal
          guessModalDisplay={this.state.guessModalDisplay}
          handleClose={this.handleClose}
          guessedCounty={this.props.guessedCounty}
          guessSubmit={this.guessSubmit}
          handleChange={this.handleChange}
        />
        {/* GAME MAP  */}
        <VTMap
          z-index="0"
          coords={this.state.coords}
          zoom={this.state.zoom}
          zoomControl={false}
          scrollWheelZoom={false}
          touchZoom={false}
          doubleClickZoom={false}
          guessModal={this.state.guessModal}
        ></VTMap>
        {/* START BUTTON  */}
        <button
          id="start"
          onClick={this.StartGame}
          style={{ display: this.state.startButtonDisplay }}
        >
          Start Game
        </button>

        {/* GUESS BUTTON  */}
        <button
          id="guess"
          onClick={this.guessHandler}
          style={{ display: this.state.gameStarted ? "inline" : "none" }}
        >
          Make a Guess
        </button>

        {/* QUIT BUTTON  */}
        <button
          id="quit"
          onClick={this.giveUp}
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
          <div id="game_status">Game status: {this.state.gameStatus}</div>
        </div>

        {/* DIRECTION BUTTONS  */}
        <div
          id="button_container"
        >
          <button
            className="button"
            id="northBtn"
            onClick={this.moveNorth}
            disabled={this.state.gameStarted ? false : true}
          >
            N
          </button>
          <button
            className="button"
            id="southBtn"
            onClick={this.moveSouth}
            disabled={this.state.gameStarted ? false : true}
          >
            S
          </button>
          <button
            className="button"
            id="eastBtn"
            onClick={this.moveEast}
            disabled={this.state.gameStarted ? false : true}
          >
            E
          </button>
          <button
            className="button"
            id="westBtn"
            onClick={this.moveWest}
            disabled={this.state.gameStarted ? false : true}
          >
            W
          </button>
          {/* <button
          className='button'
          id='zoomInBtn'
          onClick={this.zoomIn}>Zoom In</button> */}
          <button
            className='button'
            id='returnButton'
            onClick={this.return}
            style={{display: this.state.gameStarted ? 'inline' : 'none'}}>Return</button>
          <button 
            id="restart_btn" 
            onClick={this.restartGame}
            style={{display: this.state.restartButtonDisplay}}
            >
              Play again?
          </button>
        </div>
      </div>
    );
  }
}

export default App;

// function Modal (props) {
//   return (
//     <div id='modal-background'>
//       <div id='modal'>

//       </div>
//     <button onClick={props.close}>Close</button>
//     </div>
//   );
// };
