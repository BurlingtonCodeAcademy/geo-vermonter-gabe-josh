import React from 'react'
// import './App.css';

function ModalConductor(props) {
    const currentModal = props.currentModal;
    if (currentModal === 'guessModal') {
        return <guessModal />
    }
    if (currentModal === 'howToPlay') {
        return <howToPlay />
    }
    // ReactDOM.render(
    //     <>
    //     <p>This will work</p>
    //     <ModalConductor />
    //     </>,
    //     document.getElementById('root')
    // )
}

function guessModal(props) {

}

function howToPlay(props) {

}

export default { ModalConductor }