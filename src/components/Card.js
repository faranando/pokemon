import React,{useState, useEffect} from "react";
import {Link} from "react-router-dom"

export default function Card({pokemon, loading}){
    return(
        loading ? <h1>Loading...</h1> : 
        pokemon.map( item=>{
            return(
            <Link to={`/pokemon/${item.id}`} key={item.id}>
            <div className="card" >
                <img className="card-img" src={item.image} alt={item.name} />
                <p>{item.name[0].toUpperCase()+item.name.slice(1)}</p>
                <div className="card-owned">
                    <p>Owned: {item.owned}</p>
                </div>
            </div>
            </Link>
        )}
        )
        
    )
}