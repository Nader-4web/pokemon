import { useEffect, useState} from "react";
import Searchbar from "../components/Searchbar"
import Cards from "../components/Cards"
import Filter from "../components/Filter"
import PokemonDetails from "../components/PokemonDetails";
import { NavLink } from "react-router-dom";



function Home() {

  const [pokemons, setPokemons] = useState([]);
  const [generation, setGeneration] = useState()
  const [type, setType] = useState("")
  const [minWeight, setMinWeight] = useState()
  const [maxWeight, setMaxWeight] = useState()
  const [minHeight, setMinHeight] = useState()
  const [maxHeight, setMaxHeight] = useState()
  const [searchValue, setSearchValue] = useState('');
  const [isFilterVisible, setFilterVisibility] = useState(false);
  const [ isGoTopPageVisible, setGoTopPage] = useState(false)
  const [selectedPokemon, setSelectedPokemon] = useState(false)
  const [pokemonId, setPokemonId] = useState()
  const [chargementTermine, setChargementTermine] = useState(true);

  const fetchPokemons = async (generation = undefined, type= "", minWeight = undefined, maxWeight = undefined,
  minHeight = undefined, maxHeight = undefined) => {
    try {
      const response = await fetch(
        `https://tyradex.vercel.app/api/v1/pokemon`
      );
      const data = await response.json();
      const slicedData = data.slice(1, data.length)
      if(data.status === 404){
        console.log("status 404")
       return 
      }
      const pokemonsArray = Array.isArray(data) ? slicedData : [slicedData];
      setChargementTermine(false)

      const normalizeString = (str) => {
        return str
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '');
        }

      const allPokemons = pokemonsArray.filter(pokemon => normalizeString(pokemon.name.fr).startsWith(searchValue)
      || (pokemon.pokedex_id === Number(searchValue)));
      const getPokeByGeneration = allPokemons.filter((pokemon) => pokemon.generation === generation);   
      const getPokeByType = allPokemons.filter((pokemon) => pokemon.types.some((t) => t.name === type));
      const getPokeByWeight = allPokemons.filter(pokemon => {const weight = parseFloat(pokemon.weight.replace(",", "."));
        return weight >= minWeight && weight <= maxWeight;
      });

      const getPokeByHeight = allPokemons.filter(pokemon => {const height = parseFloat(pokemon.height.replace(",", "."));
      return height >= minHeight && height <= maxHeight;
    });
 
      const getPokeByGenAndType = getPokeByGeneration.filter(pokemon => getPokeByType.includes(pokemon))
      const getPokeByGenAndWeight = getPokeByGeneration.filter(pokemon => getPokeByWeight.includes(pokemon))
      const getPokeByTypeAndWeight = getPokeByType.filter(pokemon => getPokeByWeight.includes(pokemon))
      const filtredWithWeight = getPokeByGenAndType.filter(pokemon => getPokeByWeight.includes(pokemon))
      const filtredWithWeightAndHeight = filtredWithWeight.filter(pokemon => getPokeByHeight.includes(pokemon))
      const getPokeByGenAndHeight = getPokeByGeneration.filter(pokemon => getPokeByHeight.includes(pokemon))
      const getPokeByTypeAndByHeight = getPokeByType.filter(pokemon => getPokeByHeight.includes(pokemon))
      const getPokeByWeightAndHeight = getPokeByWeight.filter(pokemon => getPokeByHeight.includes(pokemon))
      const getPokeByGenTypeHeight = getPokeByGenAndType.filter(pokemon => getPokeByHeight.includes(pokemon))
     
      
      switch (true) {
        case generation !== undefined && type !== "" && (minWeight !== undefined || maxWeight !== undefined)
        && (minHeight !== undefined || maxHeight !== undefined):
          setPokemons(filtredWithWeightAndHeight);
          break;
        case generation !== undefined && type !== "" && (minWeight !== undefined || maxWeight !== undefined):
          setPokemons(filtredWithWeight);
          break;
        case generation !== undefined && (minHeight !== undefined || maxHeight !== undefined):
          setPokemons(getPokeByGenAndHeight);
          break;
        case type !== "" && (minHeight !== undefined || maxHeight !== undefined):
          setPokemons(getPokeByTypeAndByHeight);
          break;
        case (minWeight !== undefined || maxWeight !== undefined) && (minHeight !== undefined || maxHeight !== undefined):
          setPokemons(getPokeByWeightAndHeight);
          break;
        case generation !== undefined && type !== "":
          setPokemons(getPokeByGenAndType);
          break;
        case type !== "" && (minWeight !== undefined || maxWeight !== undefined):
          setPokemons(getPokeByTypeAndWeight);
          break;
        case generation !== undefined && (minWeight !== undefined || maxWeight !== undefined):
          setPokemons(getPokeByGenAndWeight);
          break;
        case type !== "":
          setPokemons(getPokeByType);
          break;
        case generation !== undefined:
          setPokemons(getPokeByGeneration);
          break;
          case minHeight !== undefined || maxHeight !== undefined:
            setPokemons(getPokeByHeight);
          break;
        case minWeight !== undefined || maxWeight !== undefined:
          setPokemons(getPokeByWeight);
          break;
        default:
          setPokemons(allPokemons);
          break;
      }

      if(generation !== undefined && type !== "" && (minHeight !== undefined || maxHeight !== undefined)){
        setPokemons(getPokeByGenTypeHeight)
      }

    
    } catch (error) {
      console.log('erreur : ', error);
    }
  };
  
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPokemons();
      
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchValue]);


  const applyFilter = (generation, type, minWeight, maxWeight, minHeight, maxHeight)=>{
    fetchPokemons(generation,type, minWeight, maxWeight, minHeight, maxHeight)
  }

  const handleSearchChange = (value) => {
    setSearchValue(value);

  };

  const displayFilter = () => {
    setFilterVisibility(true);
    setSearchValue("")
  };

  const hideFilter = ()=>{
    setFilterVisibility(false)
  }


  const hideCard = ()=>{
    setSelectedPokemon(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fixedPositionThreshold = 500;

      setGoTopPage(scrollPosition >= fixedPositionThreshold);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const clickedPokemon = ()=>{
    setSelectedPokemon(true)
  }

  const updatePokemonId = (id)=>{
    setPokemonId(id)
  }

  const refreshPage = ()=>{
    location.reload()
  }
  
  if ((!pokemons || pokemons.length === 0) && searchValue.length > 0) {

    return (
      <div>
        <div id="wrapper">
          {selectedPokemon && <PokemonDetails hideCard ={hideCard} pokemonId = {pokemonId}/>}
          {isFilterVisible && <div className="overlay"></div>}
          <header>
          <div className="block-title-logo" onClick={refreshPage}>
          <h1 className="h1-pokedex" >Pokedex</h1>
            <div className="logo-pokedex">
              <img className="img-logo"  loading="lazy" src="pokeball-4.png" alt="" />
            </div>
        </div>
          <p>Utilises le filtre pour trouver des pokémons par génération, par type, et plus !</p>
          <Searchbar onSearchChange={handleSearchChange} displayFilter={displayFilter} />
        </header>
          <div className="not-found">
            <h3>Pokémon non trouvé !</h3>
            <img id="photo-psychokwak"  loading="lazy" src="psycho-img.jpg" alt="" />
          </div>
          { isFilterVisible && < Filter displayFilter={isFilterVisible} applyFilter={applyFilter} hideFilter={hideFilter}/>} 
        </div>
        <nav className="navigation">
          <NavLink className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
            <div className="navigation_elements">
              <h4 className="navigation_elements_text">Accueil</h4>
              <img src="pokeball-4.png" alt=""  loading="lazy" className="navigation_pokeball"/>
            </div>
          </NavLink>
          <NavLink to ="/favoris" className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
            <div className="navigation_elements">
              <h4 className="navigation_elements_text">Favoris</h4>
          </div>
          </NavLink>
        </nav>
      </div>
    );

  }else if( !chargementTermine && pokemons.length === 0){
    return (
      <div>
        <div id="wrapper">
          {selectedPokemon && <PokemonDetails hideCard ={hideCard} pokemonId = {pokemonId}/>}
          {isFilterVisible && <div className="overlay"></div>}
          <header>
          <div className="block-title-logo" onClick={refreshPage}>
          <h1 className="h1-pokedex" >Pokedex</h1>
            <div className="logo-pokedex">
              <img className="img-logo"  loading="lazy" src="pokeball-4.png" alt="" />
            </div>
        </div>
          <p>Utilises le filtre pour trouver des pokémons par génération, par type, et plus !</p>
          <Searchbar onSearchChange={handleSearchChange} displayFilter={displayFilter} />
        </header>
          <div className="not-found">
            <h3>Pokémon non trouvé !</h3>
            <img id="photo-psychokwak"  loading="lazy" src="psycho-img.jpg" alt="" />
          </div>
          { isFilterVisible && < Filter displayFilter={isFilterVisible} applyFilter={applyFilter} hideFilter={hideFilter}/>} 
        </div>
        <nav className="navigation">
          <NavLink className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
            <div className="navigation_elements">
              <h4 className="navigation_elements_text">Accueil</h4>
              <img src="pokeball-4.png" alt="" className="navigation_pokeball"/>
            </div>
          </NavLink>
          <NavLink to ="/favoris" className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
            <div className="navigation_elements">
              <h4 className="navigation_elements_text">Favoris</h4>
          </div>
          </NavLink>
        </nav>
      </div>
    );

  }else if (pokemons.length === 1) {
    const pokemon = pokemons[0];

    return (
      <div>
        <div id="wrapper">
          {selectedPokemon && <PokemonDetails hideCard ={hideCard} pokemonId = {pokemonId}/>}
          {isFilterVisible && <div className="overlay"></div>}
          <header>
          <div className="block-title-logo" onClick={refreshPage}>
          <h1 className="h1-pokedex" >Pokedex</h1>
            <div className="logo-pokedex">
              <img className="img-logo"  loading="lazy" src="pokeball-4.png" alt="" />
            </div>
        </div>
          <p>Utilises le filtre pour trouver des pokémons par génération, par type, et plus !</p>
          <Searchbar onSearchChange={handleSearchChange} displayFilter={displayFilter} />
        </header>
          <div className="block-cards">
            <Cards key={pokemon.pokedex_id}
              name={pokemon.name.fr}
              picture={pokemon.sprites.regular}
              id = {pokemon.pokedex_id}
              types ={pokemon.types}
              updatePokemonId = {updatePokemonId}
              clickedPokemon = {clickedPokemon}
            />
          </div>
          { isFilterVisible && < Filter displayFilter={isFilterVisible} applyFilter={applyFilter} hideFilter={hideFilter}/>} 
        </div>
        <nav className="navigation">
          <NavLink className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
          <div className="navigation_elements">
            <h4 className="navigation_elements_text">Accueil</h4>
            <img src="pokeball-4.png" alt="" className="navigation_pokeball"/>
          </div>
          </NavLink>
          <NavLink to ="/favoris" className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
            <div className="navigation_elements">            
              <h4 className="navigation_elements_text">Favoris</h4>
          </div>
          </NavLink>
        </nav>
      </div>
    );
  }
  

  return (
    <div>
      {chargementTermine ? (
      <div className="loading">
        <div className="block-loading">
          <img id="pokeball" src="pokeball-4.png"></img>
        </div>
      </div>) :
      
      (
      <div id="wrapper">
        {selectedPokemon && <PokemonDetails hideCard ={hideCard} pokemonId = {pokemonId}/> }
        {isFilterVisible && <div className="overlay"></div>}
        <header id="header">
        <div className="block-title-logo" onClick={refreshPage}>
          <h1 className="h1-pokedex" >Pokedex</h1>
            <div className="logo-pokedex">
              <img className="img-logo"  loading="lazy" src="pokeball-4.png" alt="" />
            </div>
        </div>

          <p>Utilises le filtre pour trouver des pokémons par génération, par type, et plus !</p>
        <Searchbar  onSearchChange={handleSearchChange} displayFilter={displayFilter}/>
        </header>
        <div className="block-cards">
          {pokemons.map((pokemon) => ( 
            <Cards key={pokemon.pokedex_id} 
            name={pokemon.name.fr} 
            picture={pokemon.sprites.regular}
            id = {pokemon.pokedex_id}
            types ={pokemon.types}
            updatePokemonId = {updatePokemonId}
            clickedPokemon ={clickedPokemon} />
            ))}
        </div>
        { isFilterVisible && < Filter displayFilter={isFilterVisible} applyFilter={applyFilter} hideFilter={hideFilter}/>}
        { isGoTopPageVisible && ( < div id="top-of-page" onClick={() => window.scrollTo(0, 0)} ><i className="fa-solid fa-arrow-up"></i></div>)}
      </div>
      )}
        <nav className="navigation">
          <NavLink className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
            <div className="navigation_elements">         
              <h4 className="navigation_elements_text">Accueil</h4>
              <img src="pokeball-4.png" alt=""  loading="lazy" className="navigation_pokeball"/>
            </div>
          </NavLink>
          
          <NavLink to ="/favoris" className={(activeLink) => (activeLink.isActive ? 'activeLink' : 'not-active-link')}>
                <div className="navigation_elements">          
                <h4 className="navigation_elements_text">Favoris</h4>
              </div>
            </NavLink>
          
        </nav>
    </div>
  );

  
}

export default Home;

