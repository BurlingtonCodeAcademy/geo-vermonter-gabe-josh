import React from "react";

class ScoreModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            highScoreList: []
        }
    }
//shows the high scores that have been preserved in local storage
  render() {
    const userNames = Object.keys(this.props.highScores)
    const userScores = Object.values(this.props.highScores)

    return (
        <>
      <div
        id="score_modal_background"
        style={{ display: this.props.scoreModalDisplay }}
      >
        <div id="score_form_container">
            <h1>High Scores</h1>
            <ul>
                {userNames.map(function(name, index){
                    let score = userScores[index]
                    return <li key={ index }>Name: {name} Score: {score}</li>;
                  })}
            </ul>
        <div className="close_button" onClick={this.props.handleClose}>+</div>
        </div>
      </div>
      </>
    );
  }
}

export default ScoreModal;