import React from "react";
import { useNavigate } from "react-router-dom";

export default function BackButton(){
    const navigate = useNavigate();
    return(

        <button onClick={()=> navigate(-1)} className="back-button">&laquo;Back</button>

    )
}