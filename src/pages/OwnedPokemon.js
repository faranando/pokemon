import React from "react";
import HomeButton from "../components/HomeButton";
import Card from "../components/Card";
import pikachu from "../images/pikachu.png"

export default function OwnedPokemon({pokemonData, loading}){
    console.log(pokemonData)
    document.addEventListener("mousemove", parallax);
    function parallax(e){
        document.querySelectorAll(".no-pokemon-img").forEach(function(move){
            let moving_value = move.getAttribute("data-value");
            let x = (e.clientX * moving_value) / 250;
            let y = (e.clientY * moving_value) / 250;

            move.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
        })
    }
    return(
        pokemonData.length > 0 ? 
            <div className="owned-pokemon-container">
                <HomeButton />
                <div className="card-layout">
                    <Card pokemon={pokemonData} loading={loading} />
                </div>
            </div> :
            <div className="no-pokemon-container">
            <img className="no-pokemon-img" src={pikachu} data-value="8"></img>
            <h1>No pokemon caught yet!</h1>
            </div>
        
    )
}