import React, { Component } from "react";
// import L from 'leaflet'
import VTMap from "./VTMap";
import PointChecker from "./Components/PointGenerator";
import './App.css';
//import ModalConductor from './ModalConductor'
import Modal from './Components/Modal';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      coords: [43.9, -72.5],
      zoom: 7,
      latStatus: "",
      longStatus: "",
      county: "",
      town: "",
      currentModal: '',
      guessModalDisplay: 'none'
    };
  }

  //start function gets everything you need for the game and stores it in state.
  StartGame = (evt) => {
    this.setState({ gameStarted: true })
    evt.preventDefault();
    let theCoordinate = PointChecker();
    console.log(theCoordinate[0])
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${theCoordinate[0]}&lon=${theCoordinate[1]}`)
    .then(data => data.json())
    .then(jsonObj => {
      console.log(jsonObj)
      let town;
      town = jsonObj.address.city || jsonObj.address.town || jsonObj.address.village || jsonObj.address.hamlet
      this.setState({
        mainMap: {
          // lat: flippedPoint[0],
          // lon: flippedPoint[1],
          zoom: 18,
        },
        // mapCoords: [flippedPoint],
        county: jsonObj.address.county,
        town: town,
        score: 100,
        gameStarted: true
      })
      console.log(this.state.gameStarted)
    })
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

componentDidMount() {
  console.log(this.state.guessModalDisplay)
}

guessHandler = (evt) => {
  evt.preventDefault();
  this.setState((prevState) => {
    //return { guessModal: !prevState.guessModal};
    return { guessModalDisplay: '' }
  });
};

hideModal = (evt) => {
  evt.preventDefault();
  this.setState(() => {
    return { currentModal: ''};
  });
};

  giveUp = (evt) => {
    evt.preventDefault()

    this.setState(() => {
      return {
        latStatus: (this.state.coords[0]).toFixed(4),
        longStatus: (this.state.coords[1]).toFixed(4),
        countyStatus: this.state.county,
        townStatus: this.state.town,
        points: -100
      };
    });
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
  this.setState(() => {
    let newLat = this.state.coords[0] + .002;
    return {
    coords: [newLat, this.state.coords[1]],
  }
})
  this.directional()
}

  moveSouth = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      let newLat = this.state.coords[0] - .002;
      return {
      coords: [newLat, this.state.coords[1]],
    }
  })
    this.directional()
  };

  moveEast = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      let newLong = this.state.coords[1] + .003;
      return {
      coords: [this.state.coords[0], newLong],
    }
  })
  this.directional()
  };

  moveWest = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      let newLong = this.state.coords[1] - .003;
      return {
      coords: [this.state.coords[0], newLong],
    }
  })
  this.directional()
  };

  render() {
    return (
      <div id='main'>
        {/* <ModalConductor close={this.hideModal} /> */}
        <Modal guessModalDisplay={this.state.guessModalDisplay} />
        {/* GAME MAP  */}
        <VTMap z-index='0' coords={this.state.coords} zoom={this.state.zoom} zoomControl={false} scrollWheelZoom={false} touchZoom={false} doubleClickZoom={false}
        guessModal={this.state.guessModal}
        >
        </VTMap>
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
        </div>

        {/* DIRECTION BUTTONS  */}
        <div
          id="button_container"
          style={{ border: "1px solid black", width: '30vw', height: '30vw'}}
        >
          <button
            className='button'
            id="northBtn"
            onClick={this.moveNorth}
            disabled={this.state.gameStarted ? false : true}
          >
            N
          </button>
          <button
            className='button'
            id="southBtn"
            onClick={this.moveSouth}
            disabled={this.state.gameStarted ? false : true}
          >
            S
          </button>
          <button
            className='button'
            id="eastBtn"
            onClick={this.moveEast}
            disabled={this.state.gameStarted ? false : true}
          >
            E
          </button>
          <button
            className='button'
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

// function Modal (props) {
//   return (
//     <div id='modal-background'>
//       <div id='modal'>

//       </div>
//     <button onClick={props.close}>Close</button>
//     </div>
//   );
// };