import React, { Component } from "react";
// import L from "leaflet";
import VTMap from "./VTMap";
import PointChecker from "./Components/PointGenerator";
import "./App.css";
//import ModalConductor from './ModalConductor'
import { Modal, selectedCounty } from "./Components/Modal";
import HelpModal from './Components/Help'
import WinModal from './Components/WinModal'




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
      coords: [43.9, -72.5],
      origCoords: [],
      latLngArray: [],
      zoom: 7,
      latStatus: "",
      longStatus: "",
      county: "",
      town: "",
      currentModal: "",
      guessModalDisplay: "none",
      gameStatus: "",
      startButtonDisplay: "",
      restartButtonDisplay: "none",
      helpMessageDisplay: 'none',
      gameWon: false,
      winModalDisplay: 'none'
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
        
        let town;
        town =
          jsonObj.address.city ||
          jsonObj.address.town ||
          jsonObj.address.village ||
          jsonObj.address.hamlet;
        
        this.setState({
          zoom: 18,
          coords: [theCoordinate[0], theCoordinate[1]],
          origCoords: [theCoordinate[0], theCoordinate[1]],
          latLngArray: [theCoordinate],
          county: jsonObj.address.county,
          town: town,
          points: 100,
          gameStarted: true,
          latStatus: "?",
          longStatus: "?",
          countyStatus: "?",
          townStatus: "?",
          startButtonDisplay: 'none',
        });
      });
    // move map to random coordinates
  };

  guessHandler = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => {
      return { guessModalDisplay: "" };
    });
  };

  helpButton = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return { helpMessageDisplay: '' }
    })
  }

  handleClose = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return {
        guessModalDisplay: "none",
        helpMessageDisplay: 'none',
        winModalDisplay: 'none'
      };
    });
  };

  giveUp = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return {
        coords: [43.9, -72.5],
        zoom: 7,
        latStatus: this.state.coords[0].toFixed(4),
        longStatus: this.state.coords[1].toFixed(4),
        countyStatus: this.state.county,
        townStatus: this.state.town,
        points: -100,
        restartButtonDisplay: ''
      };
    });
  };

  moveNorth = (evt) => {
    evt.preventDefault();    
    this.setState((prevState) => {
      let newCoords = [prevState.coords[0] + 0.002, prevState.coords[1]]
      return {
        coords: newCoords,
        points: prevState.points - 1,
        latLngArray: prevState.latLngArray.concat([newCoords])
      };
    });
  };

  moveSouth = (evt) => {
    evt.preventDefault();    
    this.setState((prevState) => {
      let newCoords = [prevState.coords[0] - 0.002, prevState.coords[1]]
        return {
        coords: [prevState.coords[0] - 0.002, prevState.coords[1]],
        points: prevState.points - 1,
        latLngArray: prevState.latLngArray.concat([newCoords])
      };
    });
  };

  moveEast = (evt) => {
    evt.preventDefault();    
    this.setState((prevState) => {
      let newCoords = [prevState.coords[0], prevState.coords[1] + 0.003]
        return {
        coords: [prevState.coords[0], prevState.coords[1] + 0.003],
        points: prevState.points - 1,
        latLngArray: prevState.latLngArray.concat([newCoords])
      };
    });
  };

  moveWest = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => {
      // let newLon = prevState.coords[1] - 0.003
      let newCoords = [prevState.coords[0], prevState.coords[1] - 0.003]
        return {
        coords: [prevState.coords[0], prevState.coords[1] - 0.003],
        points: prevState.points - 1,
        latLngArray: prevState.latLngArray.concat([newCoords])
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
          gameWon: true,
          winModalDisplay: ''
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
    let newCoords= this.state.origCoords
    this.setState((prevState) => {
      return {
        coords: newCoords,
        latLngArray: prevState.latLngArray.concat([newCoords])
      }
    })
  }

  zoomIn = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => {
      return{
        zoom: prevState.zoom + 1
      }
    })
  }

  zoomOut = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => {
      return{
        zoom: prevState.zoom - 1
      }
    })
  }

  render() {
    return (
      <div id="main">
        <Modal
          guessModalDisplay={this.state.guessModalDisplay}
          handleClose={this.handleClose}
          guessedCounty={this.props.guessedCounty}
          guessSubmit={this.guessSubmit}
          handleChange={this.handleChange}
        />
        <HelpModal
        helpMessageDisplay={this.state.helpMessageDisplay}
        handleClose={this.handleClose}
        />
        <WinModal 
        // style={{display: this.state.gameWon ? '' : 'none'}} />
        winModalDisplay={this.state.winModalDisplay}
        handleClose={this.handleClose}
        restartGame={this.restartGame}
        restartButtonDisplay={this.state.restartButtonDisplay}/>

        <div id="game_center_container">
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
          latLngArray={this.state.latLngArray}
        ></VTMap>
        {/* START BUTTON  */}
        <div id="info_panel_container">
        <button
          id="start"
          onClick={this.StartGame}
          style={{ display: this.state.startButtonDisplay }}
        >
          Start Game
        </button>

      
        {/* DIRECTION BUTTONS  */}
        <div
          id="directional_buttons_container" style={{display: this.state.gameStarted ? '' : 'none'}}
        >
          <button
            id="north-btn"
            className="directional_btn"
            onClick={this.moveNorth}
            disabled={this.state.gameStarted ? false : true}
          >
            <span>N</span>
          </button>
          <div id="east_west_buttons">
            <button
              id="east-btn"
              className="directional_btn"
              onClick={this.moveEast}
              disabled={this.state.gameStarted ? false : true}
            >
              <span>E</span>
            </button>
            <button
              id="west-btn"
              className="directional_btn"
              onClick={this.moveWest}
              disabled={this.state.gameStarted ? false : true}
            >
              <span>W</span>
            </button>
          </div>
          <button
            id="south-btn"
            className="directional_btn"
            onClick={this.moveSouth}
            disabled={this.state.gameStarted ? false : true}
          >
            <span>S</span>
          </button>
        </div>
        </div>

        </div>
        
          <button
          className='button'
          id='zoomInBtn'
          onClick={this.zoomIn}>Zoom In</button>
          <button
          className='button'
          id='zoomOutBtn'
          onClick={this.zoomOut}>Zoom Out</button>
          {/* GUESS BUTTON  */}
        <div id="options_container">
          <button
            id="guess"
            className="options_element"
            onClick={this.guessHandler}
            style={{ display: this.state.gameStarted ? "inline" : "none" }}
          >
            Guess
          </button>

          {/* QUIT BUTTON  */}
          <button
            id="quit"
            className="options_element"
            onClick={this.giveUp}
            style={{ display: this.state.gameStarted ? "inline" : "none" }}
          >
            Give up
          </button>
          <button
            id='help_button'
            className="options_element"
            onClick={this.helpButton}
            style={{display: this.state.gameStarted ? 'inline' : 'none'}}>
              Help
              </button>
              <button
              id='return_button'
              className="options_element"
              onClick={this.return}
              style={{display: this.state.gameStarted ? 'inline' : 'none'}}>
                Return
            </button>
          {/* LOCATION FIELDS  */}
          <div id="info_panel" style={{display: this.state.gameStarted ? '' : 'none' }}>
            <div id="lat_field">Latitude: {this.state.latStatus}</div>
            <div id="long_field">Longitude: {this.state.longStatus}</div>
            <div id="count_field">County: {this.state.countyStatus}</div>
            <div id="town_field">Town: {this.state.townStatus}</div>
            <div id="points_field">Points: {this.state.points}</div>
            <div id="game_status">Game status: {this.state.gameStatus}</div>
          </div>

            
            {/* <button 
              id="restart_btn" 
              onClick={this.restartGame}
              style={{display: this.state.restartButtonDisplay}}
              >
                Play again?
            </button> */}

        </div>
      </div>
    );
  }
}

export default App;