import React from "react";
import { Link} from "react-router-dom";

export default function BackButton(){
    return(

        <Link to="/"><button className="home-button">&laquo;Home</button></Link>

    )
}