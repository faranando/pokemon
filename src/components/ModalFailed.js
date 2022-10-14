import React from "react";
import ditto from "../images/ditto.png"

export default function ModalFailed({open, onClose, catchPokemon}){
    if(open !== "modal-failed") return null
    let randomNumber = Math.floor(Math.random() * 3)
    console.log(randomNumber)
    

    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <img className="modal-img" src={ditto} ></img>
                <p>{randomNumber < 2 ? "Oh no! The pokemon broke free!": "Shoot! It was so close, too!"}</p>
                <button className="default-button" onClick={onClose}>Close</button>
            </div>
        </div>
    )
}