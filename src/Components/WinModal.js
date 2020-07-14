import React from "react";

let playerName;

class WinModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  scoreSubmit = (event) => {};

  changeHandler = (event) => {
    playerName = event.target.value;
  };

  render() {
    return (
      <>
        <div
          id="win_modal_background"
          style={{ display: this.props.winModalDisplay }}
        >
          <div id="win_form_container">
            <h1>You Win!</h1>
            <h3>Your score was: {this.props.score}</h3>
            <p>
              To submit your high score, please enter your name and hit
              "Submit",
              <br />
              Otherwise, feel free to play again.
            </p>
            <form onSubmit={this.props.submitScore}>
              <input
                type="text"
                id="player_name"
                placeholder="name"
                onChange={this.changeHandler}
              ></input>
              <button type="submit">Submit</button>
            </form>
            <button
              id="restart_btn"
              onClick={this.props.restartGame}
              style={{ display: this.props.restartButtonDisplay }}
            >
              Play again?
            </button>

            <div className="close_button" onClick={this.props.handleClose}>
              +
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { WinModal, playerName };
