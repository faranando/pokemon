import React from "react";
import Card from "../components/Card"

export default function Home({pokemonData, loading, setUrl, nextUrl}){
    const handleClick = () => {
        setUrl(nextUrl)
    }
    return(
        <>
            <div className="card-layout">
            <Card pokemon={pokemonData} loading={loading} />
            </div>
            <div className="button-container">
            <button className="default-button" onClick={handleClick}>Load More</button>
            </div>
        </>
    )
}