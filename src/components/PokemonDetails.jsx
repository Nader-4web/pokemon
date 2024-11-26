// import { useEffect, useState} from "react";
// import About from "./About"
// import Stats from "./Stats"
// import Evolutions from "./Evolutions"
// import { useParams } from 'react-router';


// function PokemonDetails(){

//     const [pokemon, setPokemon] = useState()
//     const [about, setAbout] = useState(true)
//     const [stats, setStats] = useState(false)
//     const [evolutions, setEvolutions] = useState(false)
//     const [addPokeToFavorite, setAddPokeToFavorite] = useState(false)
//     const { id } = useParams('id');

//     const fetchPokemon = async () => {
//       try {
//         const response = await fetch(
//           `https://tyradex.vercel.app/api/v1/pokemon/${id}`
//         );
//         const pokemonData = await response.json();

//         setPokemon(pokemonData)
      
//       } catch (error) {
//         console.log('erreur : ', error);
//       }
//     };
    

//     useEffect(()=>{
//         fetchPokemon()
//     },[])

//     useEffect(() => {
//         let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
//         let pokemonsInLS = favoris.find((p) => p?.pokedex_id === pokemon?.pokedex_id);
    
//         setAddPokeToFavorite(!!pokemonsInLS);
//       }, [pokemon && pokemon.pokedex_id]);

//     const closeCard = ()=>{
//         window.close()
//     }

//     if(pokemon === undefined){
//         return
//     }

//     const displayStats = ()=>{
//         setStats(true)
//         setAbout(false)
//         setEvolutions(false)
//     }

//     const displayAbout = ()=>{
//         setAbout(true)
//         setStats(false)
//         setEvolutions(false)
//     }

//     const displayEvolutions = ()=>{
//         setEvolutions(true)
//         setStats(false)
//         setAbout(false)
//     }

//     const colours = {
//         Normal: '#A8A77A',
//         Feu: '#EE8130',
//         Eau: '#6390F0',
//         Électrik: '#F7D02C',
//         Plante: '#7AC74C',
//         Glace: '#96D9D6',
//         Combat: '#C22E28',
//         Poison: '#A33EA1',
//         Sol: '#E2BF65',
//         Vol: '#A98FF3',
//         Psy: '#F95587',
//         Insecte: '#A6B91A',
//         Roche: '#B6A136',
//         Spectre: '#735797',
//         Dragon: '#6F35FC',
//         Ténèbres: '#705746',
//         Acier: '#B7B7CE',
//         Fée: '#D685AD',
//     };
    

//     let typeColor = pokemon.types[0].name;

    

//     const addToFavorite = () => {    
//         let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
//         let pokemonsInLS = favoris.find(p => p?.pokedex_id === pokemon?.pokedex_id);
        
//         if (pokemonsInLS) {
//             setAddPokeToFavorite(false);
//             deletePokeFromFavorite();
//             return;
//         } else {
//             setAddPokeToFavorite(true);
//             favoris.push(pokemon);
//             localStorage.setItem("favoris", JSON.stringify(favoris));
//         }   
//     }

//     const deletePokeFromFavorite = ()=>{    
//         let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
//         const index = favoris.findIndex(p => p.pokedex_id === pokemon.pokedex_id)
//         if(index !== -1){
//             favoris.splice(index, 1)
//             localStorage.setItem("favoris", JSON.stringify(favoris));
//         }
//     } 

//     return (
//         <div className='selected-pokemon'>
//             <div className='selected-pokemon_block' style={{background: `linear-gradient(to bottom, ${colours[typeColor]}, #ffff)` }}>
//                 <div className="selected-pokemon_block_elements">
//                     <span id='selected-pokemon_arrow-back' onClick={closeCard}><i className="fa-solid fa-chevron-left" ></i></span>
//                     <p className="selected-id">{"#" + pokemon.pokedex_id.toString().padStart(3, "0")}</p>
//                     { addPokeToFavorite ? <span><i className="fa-solid fa-heart heart-favorite" onClick={addToFavorite}></i></span>:
//                     <span><i className="fa-regular fa-heart" onClick={addToFavorite}></i></span>}                 
//                 </div>
//                 <div className="selected-pokemon_img-name">
//                     <img className='selected-pokemon_img' src={pokemon.sprites.regular} alt="" />
//                     <h5 className='selected-pokemon_name'>{pokemon.name.fr}</h5>
//                     <span className="selected-pokemon_category">{pokemon.category}</span>
//                 </div>
//             </div>
//             <div className="pokemon-details_block">
//                 <div className="pokemon-details">
//                     <h4 onClick={displayAbout} className={about ? "active" : "pokemon-details_pointer"}>A propos</h4>
//                     <h4 onClick={displayStats} className={stats ? "active" : "pokemon-details_pointer"}>Stats</h4>            
//                     <h4 onClick={displayEvolutions} className={evolutions ? "active" : "pokemon-details_pointer"}>Evolutions</h4>
//                 </div>
            
//                     {about && <About poids = {pokemon.weight} taille = {pokemon.height} types = {pokemon.types} talents = {pokemon.talents}/>}
//                     {stats && <Stats stats = {pokemon.stats} types = {pokemon.types}/>}
//                     {evolutions && <Evolutions 
//                     evolution = {pokemon.evolution}
//                     id = {pokemon.pokedex_id}
//                     name = {pokemon.name.fr}
//                     pkmnTypes = {pokemon.types}
//                     picture = {pokemon.sprites.regular}/>} 
//             </div>      
//         </div>
//     );
  
// }

// export default PokemonDetails;

import { useEffect, useState } from "react";
import About from "./About";
import Stats from "./Stats";
import Evolutions from "./Evolutions";
import { useParams } from "react-router";

function PokemonDetails() {
    const [pokemon, setPokemon] = useState();
    const [activeSection, setActiveSection] = useState(0); // 0: About, 1: Stats, 2: Evolutions
    const [addPokeToFavorite, setAddPokeToFavorite] = useState(false);
    const { id } = useParams("id");

    const sections = ["About", "Stats", "Evolutions"]; // Ordre des sections
    let touchStartX = 0; // Position de départ du toucher
    let touchEndX = 0; // Position de fin du toucher

    // Récupération des données du Pokémon
    const fetchPokemon = async () => {
        try {
            const response = await fetch(
                `https://tyradex.vercel.app/api/v1/pokemon/${id}`
            );
            const pokemonData = await response.json();
            setPokemon(pokemonData);
        } catch (error) {
            console.log("erreur : ", error);
        }
    };

    useEffect(() => {
        fetchPokemon();
    }, []);

    useEffect(() => {
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        let pokemonsInLS = favoris.find((p) => p?.pokedex_id === pokemon?.pokedex_id);

        setAddPokeToFavorite(!!pokemonsInLS);
    }, [pokemon && pokemon.pokedex_id]);

    const closeCard = () => {
        window.close();
    };

    if (pokemon === undefined) {
        return null;
    }

    // Gestion des gestes tactiles
    const handleTouchStart = (e) => {
        touchStartX = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    };

    const handleSwipe = () => {
        if (touchStartX - touchEndX > 50) {
            // Swipe gauche -> section suivante
            setActiveSection((prev) => Math.min(prev + 1, sections.length - 1));
        } else if (touchEndX - touchStartX > 50) {
            // Swipe droite -> section précédente
            setActiveSection((prev) => Math.max(prev - 1, 0));
        }
    };

    // Fonction pour déterminer quelle section afficher
    const renderSection = () => {
        switch (activeSection) {
            case 0:
                return <About poids={pokemon.weight} taille={pokemon.height} types={pokemon.types} talents={pokemon.talents} />;
            case 1:
                return <Stats stats={pokemon.stats} types={pokemon.types} />;
            case 2:
                return (
                    <Evolutions
                        evolution={pokemon.evolution}
                        id={pokemon.pokedex_id}
                        name={pokemon.name.fr}
                        pkmnTypes={pokemon.types}
                        picture={pokemon.sprites.regular}
                    />
                );
            default:
                return null;
        }
    };

    const colours = {
        Normal: "#A8A77A",
        Feu: "#EE8130",
        Eau: "#6390F0",
        Électrik: "#F7D02C",
        Plante: "#7AC74C",
        Glace: "#96D9D6",
        Combat: "#C22E28",
        Poison: "#A33EA1",
        Sol: "#E2BF65",
        Vol: "#A98FF3",
        Psy: "#F95587",
        Insecte: "#A6B91A",
        Roche: "#B6A136",
        Spectre: "#735797",
        Dragon: "#6F35FC",
        Ténèbres: "#705746",
        Acier: "#B7B7CE",
        Fée: "#D685AD",
    };

    const addToFavorite = () => {
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        let pokemonsInLS = favoris.find((p) => p?.pokedex_id === pokemon?.pokedex_id);

        if (pokemonsInLS) {
            setAddPokeToFavorite(false);
            deletePokeFromFavorite();
            return;
        } else {
            setAddPokeToFavorite(true);
            favoris.push(pokemon);
            localStorage.setItem("favoris", JSON.stringify(favoris));
        }
    };

    const deletePokeFromFavorite = () => {
        let favoris = JSON.parse(localStorage.getItem("favoris")) || [];
        const index = favoris.findIndex((p) => p.pokedex_id === pokemon.pokedex_id);
        if (index !== -1) {
            favoris.splice(index, 1);
            localStorage.setItem("favoris", JSON.stringify(favoris));
        }
    };

    return (
        <div
            className="selected-pokemon"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="selected-pokemon_block"
                style={{
                    background: `linear-gradient(to bottom, ${colours[pokemon.types[0].name]}, #ffff)`,
                }}
            >
                {/* En-tête */}
                <div className="selected-pokemon_block_elements">
                    <span id="selected-pokemon_arrow-back" onClick={closeCard}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </span>
                    <p className="selected-id">
                        {"#" + pokemon.pokedex_id.toString().padStart(3, "0")}
                    </p>
                    {addPokeToFavorite ? (
                        <span>
                            <i className="fa-solid fa-heart heart-favorite" onClick={addToFavorite}></i>
                        </span>
                    ) : (
                        <span>
                            <i className="fa-regular fa-heart" onClick={addToFavorite}></i>
                        </span>
                    )}
                </div>

                {/* Image et infos */}
                <div className="selected-pokemon_img-name">
                    <img
                        className="selected-pokemon_img"
                        src={pokemon.sprites.regular}
                        alt=""
                    />
                    <h5 className="selected-pokemon_name">{pokemon.name.fr}</h5>
                    <span className="selected-pokemon_category">{pokemon.category}</span>
                </div>
            </div>

            {/* Navigation entre sections */}
            <div className="pokemon-details_block">
                <div className="pokemon-details">
                    <h4
                        onClick={() => setActiveSection(0)}
                        className={activeSection === 0 ? "active" : "pokemon-details_pointer"}
                    >
                        À propos
                    </h4>
                    <h4
                        onClick={() => setActiveSection(1)}
                        className={activeSection === 1 ? "active" : "pokemon-details_pointer"}
                    >
                        Stats
                    </h4>
                    <h4
                        onClick={() => setActiveSection(2)}
                        className={activeSection === 2 ? "active" : "pokemon-details_pointer"}
                    >
                        Évolutions
                    </h4>
                </div>

                {/* Section affichée */}
                {renderSection()}
            </div>
        </div>
    );
}

export default PokemonDetails;
