import React from "react";
import {Link} from "react-router-dom";
import pikachu from "../images/pikachu.png"
export default function Modal({open, onClose, releasePokemon, openModalReleased}){
    if(open !== "modal-question") return null
    const release = () => {
        releasePokemon()
        openModalReleased()

    }
    return(
        <div className="modal-overlay">
            <div className="modal-question-container">
                <img className="modal-img" src={pikachu}></img>
                <p className="modal-text">Are you sure you want to release this pokemon?</p>
                <div className="modal-button-container">
                    <button className="default-button white" onClick={release}>Release</button>
                    <button className="default-button" onClick={onClose}>Keep</button>
                </div>
            </div>
        </div>
    )
}