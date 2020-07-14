import React from "react";

class ScoreModal extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            highScoreList: []
        }
    }

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
    {/* <h3>{this.props.highScoreList}</h3> */}
            {/* <p>{this.props.highScoreList}</p> */}
        <div className="close_button" onClick={this.props.handleClose}>+</div>
        </div>
      </div>
      </>
    );
  }
}

export default ScoreModal;