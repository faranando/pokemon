import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Modal from "../components/ModalQuestion"
import ModalReleased from "../components/ModalReleased";
import ModalCaught from "../components/ModalCaught";
import ModalFailed from "../components/ModalFailed";

export default function Pokemon({pokemonData, changePokemonData, ownedPokemonData, changeOwnedPokemonData}){

    const {id} = useParams()
    const getPokemon = pokemonData.find(item => item.id == id)
    const getOwnedPokemon = ownedPokemonData.find(item => item.id == id)
    const initialPokemon = getPokemon ? getPokemon:getOwnedPokemon
    const [currentPokemon, setCurrentPokemon] = useState(initialPokemon)
    const [modalOpen, setModalOpen] = useState(false)
    const catchPokemon = () => {
        const chance = Math.floor(Math.random() * 2)
        if(chance === 1){
            const newPokemonData = pokemonData.map(item=>{
                if(item.id == id){
                    return {...item, owned: 1}
                }
                return item
            })
            changePokemonData(newPokemonData)
            setModalOpen("modal-caught")
        }else{
            setModalOpen("modal-failed")
        }
    }

    const openModal = () => {
        setModalOpen("modal-question")
    }
    const closeModal = () =>{
        setModalOpen(false)
    }

    const releasePokemon = () => {


        if(getPokemon){
            const newPokemonData = pokemonData.map(item=>{
                if(item.id == id){
                    return {...item, owned: 0}
                }
                return item
            })
            changePokemonData(newPokemonData)
        }else{
            const newPokemonData = ownedPokemonData.map(item=>{
                if(item.id == id){
                    return {...item, owned: 0}
                }
                return item
            })
            function filterOwnedPokemonData(data){
                const filteredData = data.filter(item=>item.owned === 1)
                return filteredData
              }
            changeOwnedPokemonData(filterOwnedPokemonData(newPokemonData))
        }
    }
    const checkData = ()=>{
        if(currentPokemon){
            return currentPokemon.owned < 1 ? catchPokemon: openModal
        }
    }
    useEffect(()=>
        setCurrentPokemon(initialPokemon)
        ,[initialPokemon])
    return(
        <div className="pokemon">
            <BackButton />
            <img className="pokemon-img" src={currentPokemon ? currentPokemon.image: ""} />
            <h3>{currentPokemon  ? currentPokemon.name[0].toUpperCase()+currentPokemon.name.slice(1) : "No data"}</h3>
            <p>Owned: {currentPokemon ? currentPokemon.owned : "No data"}</p>
            <button className="default-button" onClick={checkData()}>{currentPokemon ? (currentPokemon.owned < 1 ? "Catch" : "Release"): "No data"}</button>
            <Modal open={modalOpen} onClose={closeModal} releasePokemon={releasePokemon} openModalReleased={()=>setModalOpen("modal-released")} />
            <ModalReleased open={modalOpen} onClose={closeModal} />
            <ModalCaught open={modalOpen} onClose={closeModal} />
            <ModalFailed open={modalOpen} onClose={closeModal} catchPokemon={catchPokemon} />
        </div>
    )
}