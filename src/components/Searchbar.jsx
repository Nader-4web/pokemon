import { useState, useEffect } from "react";


function Searchbar ({onSearchChange, displayFilter})  {

  const [fixedSearchBar, setFixedSearchbar] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const fixedPositionThreshold = 500;

      // Mettez à jour l'état en fonction de la position de défilement
      setFixedSearchbar(scrollPosition >= fixedPositionThreshold);
    };

    // Ajoutez un écouteur d'événements pour suivre le défilement
    window.addEventListener('scroll', handleScroll);

    // Nettoyez l'écouteur d'événements lorsque le composant est démonté
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

    const normalizeString = (str) => {
        return str
          .toLowerCase()
          .replace(/[^a-z0-9]/g, '');
        }

    const handleChange = (e)=>{
        const value = normalizeString(e.target.value)
        onSearchChange(value)
    }
    
    const handleClick = () => {
        displayFilter();
      };

    return (     
            <div className={fixedSearchBar ? 'fixed-searchbar container-searchbar' : 'container-searchbar' } >
            {/* <div className='container-searchbar' > */}
                <i className="fa-solid fa-magnifying-glass"></i>
                <input id="searchbar" type="text" placeholder="Rechercher un pokémon" onChange={handleChange} />
                <img className="filter" onClick={handleClick} src="filter.png" alt="" />
            </div>       
            );
}

export default Searchbar;