import React, { useEffect,useState } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Pokemon from "./pages/Pokemon"
import OwnedPokemon from "./pages/OwnedPokemon"

export default function App(){
  const [loading, setLoading] = useState(true)
  const [pokemonData, setPokemonData] = useState([])
  const [ownedPokemonData, setOwnedPokemonData] = useState(JSON.parse(localStorage.getItem("ownedPokemon")) || [])
  const [nextUrl, setNextUrl] = useState('')
  const [url,setUrl] = useState(()=>"https://pokeapi.co/api/v2/pokemon")
  //get data from API
  const getInitialPokemon = async ()=>{
      setLoading(true)
      try{
      const response = await axios.get(url)
      //add our data to state
      getPokemon(response.data.results)
      setNextUrl(()=>response.data.next)
      setLoading(false)
      } catch(err){
        console.error(err)
      }
  }
  //insert data into state
  const getPokemon = async (res) =>{
    res.map(async item=>{
      try{
      const result = await axios.get(item.url)
      let x = 0
      //check for owned pokemon from ownedPokemonState which is connected to localstorage, then change the value of "x" to 1
      for(let i = 0; i < ownedPokemonData.length; i++){
        if(ownedPokemonData[i].id === result.data.id){
          x=1
        }
      }
      //insert data into state after sorting the data
      setPokemonData(prev=>{
        prev=[...prev, {
          id: result.data.id,
          name: result.data.name,
          image: result.data.sprites.front_default,
          owned: x
        }]
        return prev.sort((a,b)=>a.id - b.id)
      })
        
    } catch(err){
      console.error(err)
    } 
    })
  }
  //modify pokemonData and ownedPokemonState state
  function changePokemonData(data){
    setPokemonData(data)
    //search for owned pokemon and save the data into newOwnedPokemon
    const newOwnedPokemon = data.filter(pokemon=>pokemon.owned).map(pokemon=>{
      if(pokemon.owned === 1){
        return {id: pokemon.id,
                name: pokemon.name,
                image: pokemon.image,
                owned: pokemon.owned
        }
      }
    })
    
    const pokemonDataNotLoaded = []
    //search for pokemon owned with no data loaded yet, then insert into pokemonDataNotLoaded array
    for(let i=0; i < ownedPokemonData.length; i++){
      if (ownedPokemonData[i].id > pokemonData.length){
        pokemonDataNotLoaded.push(ownedPokemonData[i])
      }
    }
    //insert combined data into ownedPokemonData state
    setOwnedPokemonData([...newOwnedPokemon,...pokemonDataNotLoaded])
  }
  function changeOwnedPokemonData(data){
    setOwnedPokemonData(data)
  }
  useEffect(()=>{
    getInitialPokemon()
  },[url])
  const ownedPokemonLocalStorage = ()=>{
    localStorage.setItem("ownedPokemon", JSON.stringify(ownedPokemonData))
  }
  useEffect(()=>{
    ownedPokemonLocalStorage()
  },[ownedPokemonData])
  return(
  <div className="container">
    <Header />
    <Routes>
      <Route path="/pokemon-react" element={<Home pokemonData={pokemonData} loading={loading} setUrl={setUrl} nextUrl={nextUrl} />} />
      <Route path="/pokemon-react/pokemon/:id" element={<Pokemon pokemonData={pokemonData} ownedPokemonData={ownedPokemonData} changePokemonData={changePokemonData} changeOwnedPokemonData={changeOwnedPokemonData} />} />
      <Route path="/bag" element={<OwnedPokemon pokemonData={ownedPokemonData} loading={loading} />}  />
    </Routes>
    <Footer />
  </div>
  )
}
