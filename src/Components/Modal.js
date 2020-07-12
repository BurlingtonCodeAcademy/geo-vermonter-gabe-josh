import React, { Component } from "react"

class Modal extends Component {
    render() {
        return(
            <div id="guess_modal_background" style={{ display: this.props.guessModalDisplay}}>
                <div id="guess_form_container">
                    <input id="county_input" type="text" list="counties" onChange={this._onChange} />
                    <datalist id="counties" >
                            <option value="Addison" />
                            <option value="Bennington" />
                            <option value="Caledonia" />
                            <option value="Chittenden" />
                            <option value="Essex" />
                            <option value="Franklin" />
                            <option value="Grand Isle" />
                            <option value="Orange" />
                            <option value="Orleans" />
                            <option value="Rutland" />
                            <option value="Washington" />
                            <option value="Windham" />
                            <option value="Windsor" />
                        </datalist>

                        <button id="guess_btn">Guess</button>
                </div>
            </div>


        )
    }
}

export default Modal