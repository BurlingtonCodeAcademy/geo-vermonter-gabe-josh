import React from "react";

class GiveUpModal extends React.Component {
    
//shows the give up modal and gives option to restart the game
  render() {

    return (
        <>
      <div
        id="give_up_modal_background"
        style={{ display: this.props.giveUpModalDisplay }}
      >
        <div id="give_up_form_container">
            <h1>The county was: {this.props.county}</h1>
            <button id="restart_btn" onClick={this.props.restartGame} style={{display: this.props.restartButtonDisplay}}>Play Again?</button>
        </div>
      </div>
      </>
    );
  }
}

export default GiveUpModal;