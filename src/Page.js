import React from "react";
import borderData from 'border.js'

let VTBorder = L.geoJSON(borderData)

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameStarted: false,
    };
  }

  StartGame = (evt) => {
    evt.preventDefault();
    this.setState({gameStarted: true});
  };

  render() {
    return (
      <div>
        <button id="start" onClick={this.StartGame} style={{display: this.state.gameStarted ? "none" : "inline" }}>
          Start Game
        </button>
        <button
          id="guess"
          onClick={this.Guess}
          style={{ display: this.state.gameStarted ? "inline" : "none" }}
        >
          Make a Guess
        </button>
        <button id="quit" onClick={this.GiveUp} style={{ display: this.state.gameStarted ? "inline" : "none" }}>
          I give up.
        </button>
      </div>
    );
  }
}

export default Page;
