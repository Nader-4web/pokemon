import "../style/App.css"
import { NavLink } from "react-router-dom";

function Cards({picture, name, id, types, updatePokemonId, clickedPokemon}) {
        
    let arrType = [];
    let arrImg = [];

    for(let i = 0; i < types.length; i++){
        arrImg.push({"img" :types[i].image})
        arrType.push({"type" :types[i].name})
    }

    const colours = {
        Normal: '#A8A77A',
        Feu: '#EE8130',
        Eau: '#6390F0',
        Électrik: '#F7D02C',
        Plante: '#7AC74C',
        Glace: '#96D9D6',
        Combat: '#C22E28',
        Poison: '#A33EA1',
        Sol: '#E2BF65',
        Vol: '#A98FF3',
        Psy: '#F95587',
        Insecte: '#A6B91A',
        Roche: '#B6A136',
        Spectre: '#735797',
        Dragon: '#6F35FC',
        Ténèbres: '#705746',
        Acier: '#B7B7CE',
        Fée: '#D685AD',
    };

    let typeColor = types[0].name;

    // const handleClick = ()=>{
    //     clickedPokemon()
    //     const selectedPokemonId = id;
    //     updatePokemonId(selectedPokemonId)
    // }
    // onClick={handleClick}
    return (
            <div className='card' style={{backgroundColor: colours[typeColor]}} >
            <NavLink to={`/PokemonDetails/${id}`} target="_blank">
                <div className="block-name-id">
                    <p id='name-pokemon'>{name}</p>
                    <span id="pokemon-number">{"# "+ id.toString().padStart(3, "0")}</span>
                </div>
                <div className="block-type-img">    
                    <div className="container-type-icon">
                        <div className="block-img">
                            {arrImg.map(({img}, i)=>(
                                <img key={i} className= "img-type"  loading="lazy" src={img} alt="" />
                            ))}
                        </div>
                        <div className="block-type">
                                {arrType.map(({type}, i)=>(         
                                    <div key={i} className="block-type_overlay"> 
                                    <div className="overlay-type"></div>    
                                <p  className="type-name">{type}</p>
                        </div> 
                                ))}
                        </div>
                    </div>                
                        <img id ="img-pokemon" loading="lazy" src={picture} alt="" />
                </div>
                
            </NavLink>
            </div>
        
        );
}

export default Cards;