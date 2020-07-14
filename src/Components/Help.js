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
              <p>Press "Start Game" to start a new game. The map will zoom in to a random point in Vermont. Your job is to guess what county it's in.<br />
                Use the directional "N, E, S, W" buttons to move the display. You start out with 100 points. Each time you move, it will cost you 1 point.<br />
                When you think you can guess which county you're in, press "Make a guess" to select from a list of the 14 Vermont counties. Every incorrect guess will dock you 10 points.<br />
                If you don't know the answer, press "I give up" to display the coordinates, county and town you are in. This is not recommended.<br />
                Try to see how many points you can maintain by the end. Good luck! </p>
          <div className="close_button" onClick={this.props.handleClose}>
          +
        </div>
          </div>

      </div>
    );
  }
}

export default Help;