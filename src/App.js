import React, { Component } from "react";
import VTMap from "./VTMap";
import PointGenerator from "./Components/PointGenerator";
import "./App.css";
import { GuessModal, selectedCounty } from "./Components/GuessModal";
import HelpModal from './Components/HelpModal'
import { WinModal, playerName } from './Components/WinModal'
import ScoreModal from './Components/ScoreModal'
import GiveUpModal from './Components/GiveUpModal'
Modal
//This project was fun to make. I enjoyed solving the logic for this and it was nice to get a little more practice using React. The CSS is really well done. It's amazing what some border radius, a good color scheme and a unified visual aesthetic will do. -Gabe

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
      scoreModalDisplay: 'none',
      helpMessageDisplay: 'none',
      giveUpModalDisplay: 'none',
      gameWon: false,
      winModalDisplay: 'none',
      points: '',
      highScores: window.localStorage,
      highScoreList: []
    };
  }

  restartGame = (evt) => {
    this.StartGame(evt);
  }

  //"start" takes a random coordinate generated in PointGenerator, feeds it to nominatim and pulls out the relevant data, then puts said data in state. The setState method in this will make sure modals are switched to off and sets zoom to 18.
  StartGame = (evt) => {
    this.setState({ 
      gameStarted: true,
      startButtonDisplay: 'none'
    });
    evt.preventDefault();
    let theCoordinate = PointGenerator();
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
          highScoreList: [],
          restartButtonDisplay: "none",
          scoreModalDisplay: 'none',
          helpMessageDisplay: 'none',
          guessModalDisplay: 'none',
          winModalDisplay: 'none',
          giveUpModalDisplay: 'none'
        });
      });
  };
//Guess Handler toggles guess modal display to its default, displaying it to the page.
  guessHandler = (evt) => {
    evt.preventDefault();
    this.setState((prevState) => {
      return { guessModalDisplay: "" };
    });
  };
//Help button does similarly.
  helpButton = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return { helpMessageDisplay: '' }
    })
  }
//handleClose is attached to all "x" buttons in modals, setting the display of each modal to "none".
  handleClose = (evt) => {
    evt.preventDefault();
    this.setState(() => {
      return {
        guessModalDisplay: "none",
        helpMessageDisplay: 'none',
        winModalDisplay: 'none',
        scoreModalDisplay: 'none',
      };
    });
  };
//When someone presses the give up button, the map will reset to original zoomed out display. It also shows information in the display panel about the coordinates, county and town at the point the give up button was pressed.
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
        giveUpModalDisplay: '',
        restartButtonDisplay: ''
      };
    });
  };

//'move' buttons alter either the lattitude or the longitude values of the player's location incrementally
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
      let newCoords = [prevState.coords[0], prevState.coords[1] - 0.003]
        return {
        coords: [prevState.coords[0], prevState.coords[1] - 0.003],
        points: prevState.points - 1,
        latLngArray: prevState.latLngArray.concat([newCoords])
      };
    });
  };

//Checks if the player's guess was equal to the county they're in. If it is, shows the win modal and if not it deducts ten points.
  guessSubmit = () => {
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

  // take playerName and player score, store them in local storage
  submitScore = (evt) => {
    evt.preventDefault();
    this.state.highScores.setItem(JSON.stringify(playerName), this.state.points)
  }

  viewHighScores = () => {
    this.setState(() => {
      return {
        scoreModalDisplay: '',
      }
    })
  }

  render() {
    return (
      <div id="main">
        <GuessModal
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
        winModalDisplay={this.state.winModalDisplay}
        handleClose={this.handleClose}
        restartGame={this.StartGame}
        restartButtonDisplay={this.state.restartButtonDisplay}
        submitScore={this.submitScore}
        score={this.state.points}
        />
        <ScoreModal 
        scoreModalDisplay={this.state.scoreModalDisplay}
        highScores={this.state.highScores}
        handleClose={this.handleClose}/>

        <GiveUpModal
        giveUpModalDisplay={this.state.giveUpModalDisplay}
        county={this.state.county}
        restartGame={this.restartGame}
        restartButtonDisplay={this.state.restartButtonDisplay}
        />

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
              <button id="scores_button"
                className="options_element"
                onClick={this.viewHighScores}
                style={{display: this.state.gameStarted ? 'inline' : 'none'}}>
                High Scores
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