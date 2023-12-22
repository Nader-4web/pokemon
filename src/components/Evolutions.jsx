import { useState, useEffect, useRef } from "react";
import PokemonDetails from "./PokemonDetails";

function Evolutions({ nextEvo, preEvo, pkmnTypes, evolution, name, id, picture }) {
  const [pokemons, setPokemons] = useState([]);
  const idsNextEvolution = [];
  const idsPreEvolution = [];
  const isFetchDone = useRef(false);
  const [types, setTypes] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(false)
  const [pokemonId, setPokemonId] = useState()

  const fetchPokemon = async (id) => {
    try {
      const response = await fetch(
        `https://tyradex.vercel.app/api/v1/pokemon/${id}`
      );
      const pokemonData = await response.json();

          setPokemons((prevPokemons) => [...prevPokemons, pokemonData]);
          setTypes((prevTypes) => [...prevTypes, ...pokemonData.types]);

    } catch (error) {
      console.log('erreur : ', error);
    }
  };

  useEffect(() => {
   if (!isFetchDone.current) {
      // Appeler fetchPokemon pour chaque ID
      idsPreEvolution.forEach((id) => fetchPokemon(id));
      idsNextEvolution.forEach((id) => fetchPokemon(id));

      isFetchDone.current = true; // Mettre à jour la référence
    }
    
  }, [idsPreEvolution, idsNextEvolution]);
 

  let arrType = [];
  let arrImg = [];

  for(let i = 0; i < pkmnTypes.length; i++){
      arrImg.push({"img" :pkmnTypes[i].image})
      arrType.push({"type" :pkmnTypes[i].name})
  }

  if(evolution === null){
    return(
        <div className="block-evolutions">
              <h3 className="no-evolution"> Ce pokémon n&apos;évolue pas</h3>  
        </div>
        )
  
  }else{
    if (evolution.pre === null) {
      for (let i = 0; i < evolution.next.length; i++) {
        idsNextEvolution.push(evolution.next[i].pokedexId);
      }
    } else if (evolution.next === null) {
      for (let i = 0; i < evolution.pre.length; i++) {
        idsPreEvolution.push(evolution.pre[i].pokedexId);
      }
  
    }else if(!evolution){
      return
    }
    
    else {
      for (let i = 0; i < evolution.next.length; i++) {
        idsNextEvolution.push(evolution.next[i].pokedexId);
      }
  
      for (let i = 0; i < evolution.pre.length; i++) {
        idsPreEvolution.push(evolution.pre[i].pokedexId);
      }
    }

    const clickedPokemon = ()=>{
      setSelectedPokemon(true)
    }

    const hideCard = ()=>{
      setSelectedPokemon(false)
    }

    const updatePokemonId = (id)=>{
      setPokemonId(id)
    }

    return (
      <div>
        {pokemons.map((pokemon) => (
          <div key={pokemon.pokedexId} className="block-evolutions">
            <div className="block-evolutions_img">
            {/* {selectedPokemon && <PokemonDetails hideCard = {hideCard} pokemonId = {pokemon.pokedexId}/>} */}
              <img className="img-evolutions" src={pokemon.sprites.regular} alt="" />
            </div>
            <div>
              <span className="block-evolutions_id">{"#" + pokemon.pokedexId.toString().padStart(3, "0")}</span>
              <h5 className="block-evolutions_name">{pokemon.name.fr}</h5>
  
              <div className="container-type-icon">
                <div className="block-img">
                  {pokemon.types.map((type, i) => (
                    <img key={i} className="img-type" id="img-type" src={type.image} alt="" />
                  ))}
                </div>
                <div className="block-type">
                  {pokemon.types.map((type, i) => (
                    <p key={i} className="type-name" id="type-name">
                      {type.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            
          </div>
        ))}
  
      </div>
    );
  }


}

export default Evolutions;
