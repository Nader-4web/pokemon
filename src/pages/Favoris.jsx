import { NavLink } from "react-router-dom";
import Cards from "../components/Cards";
import { useState } from "react";
import PokemonDetails from "../components/PokemonDetails";

function Favoris() {
    const pokemonsInLs = JSON.parse(localStorage.getItem("favoris")) || [];
    const [pokemonId, setPokemonId] = useState()
    const [selectedPokemon, setSelectedPokemon] = useState(false)

    const updatePokemonId = (id)=>{
        setPokemonId(id)
      }

      const clickedPokemon = ()=>{
        setSelectedPokemon(true)
      }

      const hideCard = ()=>{
        setSelectedPokemon(false)
      }

      if(!pokemonsInLs || pokemonsInLs.length === 0){
        return(
            <div>
                <div id="wrapper">
                {selectedPokemon && <PokemonDetails hideCard ={hideCard} pokemonId = {pokemonId}/>}
                    <header>
                    <h1>Favoris</h1>
                    <p>Ceci est la liste de tes pokémons préférés</p>
                    </header>

                    <h3 className="no-pokemons">Aucun pokémons dans tes favoris actuellement </h3>
                    <div className="block-no-pokemon-picture">
                        <img src="pikachu.png" alt=""  className="no-pokemon-picture"/>
                    </div>
                </div>
                 <nav className="navigation">         
                        <NavLink to ="/"
                        className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
                            <div className="navigation_elements">
                                <i className="fa-solid fa-house"></i>
                                {/* <img src="home.png" alt="" className="icon-home" /> */}
                                <h4 className="navigation_elements_text">Accueil</h4>
                            </div>
                        </NavLink>

                    <NavLink  className={(activeLink) => (activeLink.isActive ? 'activeLink' : '')}>
                        <div className="navigation_elements">
                            <i className="fa-solid fa-heart" id="navigation_elements_heart"></i>
                            <h4 className="navigation_elements_text">Favoris</h4>
                        </div>
                    </NavLink>      
                </nav>
        </div>
        )
      }else{

          return (
              <div>
                  <div id="wrapper">
                  {selectedPokemon && <PokemonDetails hideCard ={hideCard} pokemonId = {pokemonId}/>}
                      <header>
                      <h1>Favoris</h1>
                      <p>Ceci est la liste de tes pokémons préférés</p>
                      </header>
                      <div className="block-cards" onClick={clickedPokemon}>
                          {pokemonsInLs.map((pokemon) =>(
                          <Cards key = {pokemon.pokedexId} 
                          picture = {pokemon.sprites.regular}
                          id = {pokemon.pokedexId}
                          types = {pokemon.types}
                          name = {pokemon.name.fr}
                          updatePokemonId = {updatePokemonId} />
                          ))}
                      </div>
      
                  </div>
                       <nav className="navigation">         
                              <NavLink to ="/"
                              className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
                                  <div className="navigation_elements">
                                      <i className="fa-solid fa-house"></i>
                                      {/* <img src="home.png" alt="" className="icon-home" /> */}
                                      <h4 className="navigation_elements_text">Accueil</h4>
                                  </div>
                              </NavLink>
      
                          <NavLink  className={(activeLink) => (activeLink.isActive ? 'activeLink' : '')}>
                              <div className="navigation_elements">
                                  <i className="fa-solid fa-heart" id="navigation_elements_heart"></i>
                                  <h4 className="navigation_elements_text">Favoris</h4>
                              </div>
                          </NavLink>      
                      </nav>
              </div>
          );
      }

}

export default Favoris;