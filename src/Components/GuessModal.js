import React, { Component } from "react"


let selectedCounty;

class GuessModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            guessedCounty: "",
        }
    }
//guess button opens a modal with a select of the 14 VT counties and a submit button
    handleChange = (event) => {
        event.preventDefault();
        selectedCounty = `${event.target.value} County`;
      }

    render() {
        return(
            <div id="guess_modal_background" style={{ display: this.props.guessModalDisplay }}>
                <div id="guess_form_container">
                    <h3 id="county_title" className="guess_element">County:</h3>
                    
                    <select id="counties"  onChange={this.handleChange}>
                            <option value="" ></option>
                            <option value="Addison" >Addison</option>
                            <option value="Bennington" >Bennington</option>
                            <option value="Caledonia" >Caledonia</option>
                            <option value="Chittenden" >Chittenden</option>
                            <option value="Essex">Essex</option>
                            <option value="Franklin" >Franklin</option>
                            <option value="Grand Isle" >Grand Isle</option>
                            <option value="Lamoille" >Lamoille</option>
                            <option value="Orange" >Orange</option>
                            <option value="Orleans" >Orleans</option>
                            <option value="Rutland">Rutland</option>
                            <option value="Washington">Washington</option>
                            <option value="Windham">Windham</option>
                            <option value="Windsor">Windsor</option>
                        </select>

                        <button id="guess_btn" className="guess_element" onClick={this.props.guessSubmit}>Guess</button>
                        <div className="close_button" onClick={this.props.handleClose}>+</div>
                </div>
            </div>
        )
    }
}

export { GuessModal, selectedCounty };