import React from "react";
import masterball from "../images/masterball.png"
import gotcha from "../images/gotcha.png"

export default function ModalCaught({open, onClose}){
    if(open !== "modal-caught") return null
    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <img className="modal-img" src={gotcha}></img>
                <p className="modal-text">Gotcha! Pokemon was caught!</p>
                <button className="default-button" onClick={onClose}>Close</button>
            </div>
        </div>

    )
}