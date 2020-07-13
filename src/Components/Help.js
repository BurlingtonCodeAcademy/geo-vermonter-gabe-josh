import React from "react";

class Help extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      guessedCounty: "",
    };
  }
  render() {
    return (
      <div
        id="help_modal_background"
        style={{ display: this.props.helpMessageDisplay }}
      >
          <div id='help_message_container'>
              <p>Press "Start Game" to start a new game. The map will zoom in to a random point in Vermont.<br />
                Use the directional "N, E, S, W" buttons to move the display. You start out with 100 points. Every time you move it will cost you 1 point.<br />
                When you think you know in which county you're in, press "Make a guess" to select from a list of the 14 Vermont counties. Every incorrect guess will dock you 10 points.<br />
                If you don't know the answer, press "I give up" to display the coordinates, county and town you are in. This will result in a point total of -100, and is not recommended.<br />
                Try to see how many points you can keep by the end. Good luck! </p>
          <div className="close_button" onClick={this.props.handleClose}>
          +
        </div>
          </div>

      </div>
    );
  }
}

export default Help;