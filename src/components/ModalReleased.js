import React from "react";
import { Link } from "react-router-dom";
import pawprints from "../images/pawprints.png"
export default function ModalReleased({open, onClose}){
    if(open !== "modal-released") return null
    return(
        <div className="modal-overlay">
            <div className="modal-container">
                <img className="modal-img" src={pawprints}></img>
                <p className="modal-text">Pokemon released.</p>
                <Link to="/bag"><button className="default-button" onClick={onClose}>Close</button></Link>
            </div>
        </div>
    )
}