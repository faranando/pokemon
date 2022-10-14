import React from "react";
import {Link} from "react-router-dom"
import logo from "../images/logo.png"
import bag from "../images/bag.png"

export default function Header(){
    return(
        <div className="header-container">
            <Link to="/pokemon"><img src={logo}  className="nav-icon"/></Link>
            <Link to="/bag"><img src={bag} className="nav-icon"/></Link>
        </div>
    )
}