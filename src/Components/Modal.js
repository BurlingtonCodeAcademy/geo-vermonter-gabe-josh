import React, { Component } from "react"


let selectedCounty;

class Modal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            guessedCounty: "",
        }
    }
    

    handleChange = (event) => {
        event.preventDefault();
        console.log(event.target.value)
        // this.setState(() => {
        //     return {
        //     guessedCounty: event.target.value
        //     }
        // })
        selectedCounty = `${event.target.value} County`;
      }

    render() {
        return(
            <div id="guess_modal_background" style={{ display: this.props.guessModalDisplay }}>
                <div id="guess_form_container">
                    <h3 id="county_title" className="guess_element">County:</h3>
                    
                    <select id="counties"  onChange={this.handleChange}>
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
                        <div id="guess_close_button" onClick={this.props.handleClose}>+</div>
                </div>
            </div>
        )
    }
}

export { Modal, selectedCounty };