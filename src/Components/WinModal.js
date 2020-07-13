import React from "react";

class WinModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }
  render() {
    return (
        <>
      <div
        id="win_modal_background"
        style={{ display: this.props.winModalDisplay }}
      >
        <div id="win_form_container">
            <button 
              id="restart_btn" 
              onClick={this.props.restartGame}
              style={{display: this.props.restartButtonDisplay}}
              >
                Play again?
            </button>

        <div className="close_button" onClick={this.props.handleClose}>+</div>
        </div>
      </div>
      </>
    );
  }
}

export default WinModal;
