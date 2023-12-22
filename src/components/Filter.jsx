import { useState, useEffect} from "react"


function Filter({applyFilter, hideFilter}){
  
  const [generation, setGeneration] = useState()
  const [type, setType] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [minWeight, setMinWeight] = useState()
  const [maxWeight, setMaxWeight] = useState()
  const [minHeight, setMinHeight] = useState()
  const [maxHeight, setMaxHeight] = useState()


  useEffect(() => {
    setIsButtonDisabled(generation === undefined && type === "" && (minWeight === undefined || maxWeight === undefined) &&
     (minHeight === undefined || maxHeight === undefined) || (minHeight !== undefined && maxHeight === undefined) ||(minWeight !== undefined
      && maxWeight === undefined));

  }, [generation, type, minWeight, maxWeight, minHeight, maxHeight]);



  // useEffect(() => {
  //   if (generation !== undefined || type !== "" || minWeight !== undefined || maxWeight === undefined || minHeight === undefined
  //   || maxHeight === undefined) {
  //     window.scrollTo(0, 0);
  //   }
  // }, [generation, type, minWeight, maxWeight, minHeight, maxHeight]);
  

  const getSelectedGen = (e) => {
    const selectedGen = Number(e.target.id);
    setGeneration((prevGeneration) =>
      prevGeneration === selectedGen ? undefined : selectedGen
    );
  };


  const getSelectedType = (e) => {
    const selectedType = e.target.id;
    setType((prevType) =>
      prevType === selectedType ? "" : selectedType
     
    );
  };

  const getMinWeightValue = (e) => {
    const minWeightValue = Number(e.target.value)
    setMinWeight(minWeightValue)
    
  }

  const getMaxWeightValue = (e) => {
    const maxWeightValue = Number(e.target.value)
    setMaxWeight(maxWeightValue)
  }

  const getMinHeightValue = (e) => {
    const minHeightValue = Number(e.target.value)
    setMinHeight(minHeightValue)

  }

  const getMaxHeightValue = (e) => {
    const maxHeightValue = Number(e.target.value)
    setMaxHeight(maxHeightValue)

  }



  const handleClick = () => {
    // Mettre à jour 'generation' ici déclenchera l'effet useEffect
    applyFilter(generation, type, minWeight, maxWeight, minHeight, maxHeight);
    hideFilter()
    window.scrollTo(0, 0);
  };

  const hidef = ()=>{
    hideFilter()
  }

  const defaultParams = ()=>{
    // setIsButtonDisabled(true)
    setGeneration(undefined)
    setMaxHeight(undefined)
    setMinHeight(undefined)
    setType(undefined)
    setMinWeight(undefined)
    setMaxWeight(undefined)
  }

///////////////////SLIDERS AND INPUT CONTROLLERS FOR WEIGHT////////////////////

  function controlFromInput(fromSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    if (from > to) {
        fromSlider.value = to;
        fromInput.value = to;
    } else {
        fromSlider.value = from;
    }
  }
    
  function controlToInput(toSlider, fromInput, toInput, controlSlider) {
    const [from, to] = getParsed(fromInput, toInput);
    fillSlider(fromInput, toInput, '#C6C6C6', '#25daa5', controlSlider);
    setToggleAccessible(toInput);
    if (from <= to) {
        toSlider.value = to;
        toInput.value = to;
    } else {
        toInput.value = from;
    }
  }
  
  function controlFromSlider(fromSlider, toSlider, fromInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  if (from > to) {
    fromSlider.value = to;
    fromInput.value = to;
  } else {
    fromInput.value = from;
  }
  }
  
  function controlToSlider(fromSlider, toSlider, toInput) {
  const [from, to] = getParsed(fromSlider, toSlider);
  fillSlider(fromSlider, toSlider, '#C6C6C6', '#25daa5', toSlider);
  setToggleAccessible(toSlider);
  if (from <= to) {
    toSlider.value = to;
    toInput.value = to;
  } else {
    toInput.value = from;
    toSlider.value = from;
  }
  }

///////////////////SLIDERS AND INPUT CONTROLLERS FOR HEIGHT////////////////////


function controlFromInputHeight(fromSliderHeight, fromInputHeight, toInputHeight, controlSliderHeight) {
  const [from, to] = getParsed(fromInputHeight, toInputHeight);
  fillSliderHeight(fromInputHeight, toInputHeight, '#C6C6C6', '#25daa5', controlSliderHeight);
  if (from > to) {
    fromSliderHeight.value = to;
    fromInputHeight.value = to;
  } else {
    fromSliderHeight.value = from;
  }
}
  
function controlToInputHeight(toSliderHeight, fromInputHeight, toInputHeight, controlSliderHeight) {
  const [from, to] = getParsed(toInputHeight, toInputHeight);
  fillSliderHeight(fromInputHeight, toInputHeight, '#C6C6C6', '#25daa5', controlSliderHeight);
  setToggleAccessibleHeight(toInputHeight);
  if (from <= to) {
    toSliderHeight.value = to;
      toInputHeight.value = to;
  } else {
    toInputHeight.value = from;
  }
}

function controlFromSliderHeight(fromSliderHeight, toSliderHeight, fromInputHeight) {
const [from, to] = getParsed(fromSliderHeight, toSliderHeight);
fillSliderHeight(fromSliderHeight, toSliderHeight, '#C6C6C6', '#25daa5', toSliderHeight);
if (from > to) {
  fromSliderHeight.value = to;
  fromInputHeight.value = to;
} else {
  fromInputHeight.value = from;
}
}

function controlToSliderHeight(fromSliderHeight, toSliderHeight, toInputHeight) {
const [from, to] = getParsed(fromSliderHeight, toSliderHeight);
fillSliderHeight(fromSliderHeight, toSliderHeight, '#C6C6C6', '#25daa5', toSliderHeight);
setToggleAccessibleHeight(toSliderHeight);
if (from <= to) {
  toSliderHeight.value = to;
  toInputHeight.value = to;
} else {
  toInputHeight.value = from;
  toSliderHeight.value = from;
}
}

  
  function getParsed(currentFrom, currentTo) {
  const from = parseInt(currentFrom.value, 10);
  const to = parseInt(currentTo.value, 10);
  return [from, to];
  }
  
  function fillSlider(from, to, sliderColor, rangeColor, controlSlider) {
    
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSlider.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
      
        
      
  }


  function fillSliderHeight(from, to, sliderColor, rangeColor, controlSliderHeight) {
    const rangeDistance = to.max-to.min;
    const fromPosition = from.value - to.min;
    const toPosition = to.value - to.min;
    controlSliderHeight.style.background = `linear-gradient(
      to right,
      ${sliderColor} 0%,
      ${sliderColor} ${(fromPosition)/(rangeDistance)*100}%,
      ${rangeColor} ${((fromPosition)/(rangeDistance))*100}%,
      ${rangeColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} ${(toPosition)/(rangeDistance)*100}%, 
      ${sliderColor} 100%)`;
  }

  
  function setToggleAccessible(currentTarget) {
  const toSlider = document.querySelector('#toSlider');
  if (Number(currentTarget.value) <= 0 ) {
    toSlider.style.zIndex = 2;
  } else {
    toSlider.style.zIndex = 0;
  }
  }

  function setToggleAccessibleHeight(currentTarget) {
    const toSliderHeight = document.querySelector('#toSliderHeight');
    if (Number(currentTarget.value) <= 0 ) {
      toSliderHeight.style.zIndex = 2;
    } else {
      toSliderHeight.style.zIndex = 0;
    }
  }

    return (
      
       <div className="filtre">
          {/* <hr id="small-line"  onClick={hidef}/> */}
          <i className="fa-solid fa-xmark" onClick={hidef}></i>
            <h2 id="title-filter">Filtres</h2>
            <h3 className="filter-titles">Générations</h3>
            <div className="container-generations filter-containers">
              <div className={`generation ${generation === 1 ? "selected" : ""}`} onClick={getSelectedGen} id="1">Génération 1</div>
              <div className={`generation ${generation === 2 ? "selected" : ""}`} onClick={getSelectedGen} id="2">Génération 2</div>
              <div className={`generation ${generation === 3 ? "selected" : ""}`} onClick={getSelectedGen} id="3">Génération 3</div>
              <div className={`generation ${generation === 4 ? "selected" : ""}`} onClick={getSelectedGen} id="4">Génération 4</div>
              <div className={`generation ${generation === 5 ? "selected" : ""}`} onClick={getSelectedGen} id="5">Génération 5</div>
              <div className={`generation ${generation === 6 ? "selected" : ""}`} onClick={getSelectedGen} id="6">Génération 6</div>
              <div className={`generation ${generation === 7 ? "selected" : ""}`} onClick={getSelectedGen} id="7">Génération 7</div>
              <div className={`generation ${generation === 8 ? "selected" : ""}`} onClick={getSelectedGen} id="8">Génération 8</div>
              <div className={`generation ${generation === 9 ? "selected" : ""}`} onClick={getSelectedGen} id="9">Génération 9</div>
              
            </div>

            <h3 className="filter-titles">Types</h3>
            <div className="container-types filter-containers">
              <div className={`container-types_type ${type === "Plante" ? "selected" : ""}`} onClick={getSelectedType} id="Plante"><div><img className="container-types_type_icon" src="../assets/plante.png" alt="" /></div>Plante</div>
              <div className={`container-types_type ${type === "Eau" ? "selected" : ""}`} onClick={getSelectedType} id="Eau"><div><img className="container-types_type_icon" src="../assets/eau.png" alt="" /></div>Eau</div>
              <div className={`container-types_type ${type === "Insecte" ? "selected" : ""}`} onClick={getSelectedType} id="Insecte"><div><img className="container-types_type_icon" src="../assets/insecte.png" alt="" /></div>Insecte</div>
              <div className={`container-types_type ${type === "Vol" ? "selected" : ""}`} onClick={getSelectedType} id="Vol"><div><img className="container-types_type_icon" src="../assets/vol.png" alt="" /></div>Vol</div>
              <div className={`container-types_type ${type === "Feu" ? "selected" : ""}`} onClick={getSelectedType} id="Feu"><div><img className="container-types_type_icon" id="Feu" src="../assets/feu.png" alt="" /></div>Feu</div>
              <div className={`container-types_type ${type === "Électrik" ? "selected" : ""}`} onClick={getSelectedType} id="Électrik"><div><img className="container-types_type_icon" src="../assets/electrik.png" alt="" /></div>Électrik</div>
              <div className={`container-types_type ${type === "Ténèbres" ? "selected" : ""}`} onClick={getSelectedType} id="Ténèbres"><div><img className="container-types_type_icon" src="../assets/tenebres.png" alt="" /></div>Ténèbres</div>
              <div className={`container-types_type ${type === "Psy" ? "selected" : ""}`}onClick={getSelectedType} id="Psy"><div><img className="container-types_type_icon" src="../assets/psy.png" alt="" /></div>Psy</div>
              <div className={`container-types_type ${type === "Normal" ? "selected" : ""}`}onClick={getSelectedType} id="Normal"><div><img className="container-types_type_icon" src="../assets/normal.png" alt="" /></div>Normal</div>
              <div className={`container-types_type ${type === "Dragon" ? "selected" : ""}`}onClick={getSelectedType} id="Dragon"><div><img className="container-types_type_icon" src="../assets/dragon.png" alt="" /></div>Dragon</div>
              <div className={`container-types_type ${type === "Poison" ? "selected" : ""}`}onClick={getSelectedType} id="Poison"><div><img className="container-types_type_icon" src="../assets/poison.png" alt="" /></div>Poison</div>
              <div className={`container-types_type ${type === "Spectre" ? "selected" : ""}`}onClick={getSelectedType} id="Spectre"><div><img className="container-types_type_icon" src="../assets/spectre.png" alt="" /></div>Spectre</div>
              <div className={`container-types_type ${type === "Acier" ? "selected" : ""}`}onClick={getSelectedType} id="Acier"><div><img className="container-types_type_icon" src="../assets/acier.png" alt="" /></div>Acier</div>
              <div className={`container-types_type ${type === "Combat" ? "selected" : ""}`}onClick={getSelectedType} id="Combat"><div><img className="container-types_type_icon" src="../assets/combat.png" alt="" /></div>Combat</div>
              <div className={`container-types_type ${type === "Glace" ? "selected" : ""}`}onClick={getSelectedType} id="Glace"><div><img className="container-types_type_icon" src="../assets/glace.png" alt="" /></div>Glace</div>
              <div className={`container-types_type ${type === "Sol" ? "selected" : ""}`}onClick={getSelectedType} id="Sol"><div><img className="container-types_type_icon" src="../assets/sol.png" alt="" /></div>Sol</div>
              <div className={`container-types_type ${type === "Roche" ? "selected" : ""}`}onClick={getSelectedType} id="Roche"><div><img className="container-types_type_icon" src="../assets/roche.png" alt="" /></div>Roche</div>
              <div className={`container-types_type ${type === "Fée" ? "selected" : ""}`} onClick={getSelectedType} id="Fée"><div><img className="container-types_type_icon" src="../assets/fee.png" alt="" /></div>Fée</div>
            </div>

              {/* ////////////////////////////////// POIDS /////////////////////// */}

              <h3 className="filter-titles">Poids</h3>
             <div className="range_container"> 
             <div className="form_control">
                <div className="form_control_container">
                    <div className="form_control_container__time">Min</div> 
                    <p id="fromInput" onInput = {() => controlFromInput(fromSlider, fromInput, toInput, toSlider)}>{minWeight} kg</p> 
                </div>
                <div className="form_control_container">
                    <div className="form_control_container__time">Max</div>
                    <p id="toInput" onInput = {() => controlToInput(toSlider, fromInput, toInput, toSlider)}>{maxWeight} kg</p>
                </div>
            </div>
            <div className="sliders_control">
                <input onInput = {() => controlFromSlider(fromSlider, toSlider,fromInput)}  onChange={getMinWeightValue} value={minWeight} id="fromSlider" type="range"  min="0" max="950"/>
                <input onInput = {() => controlToSlider(fromSlider, toSlider,toInput)}   onChange={getMaxWeightValue} value={maxWeight} id="toSlider" type="range"  min="0" max="950"/>
            </div>
         
        </div>

         {/* ////////////////////////////////// TAILLE /////////////////////// */}
         <h3 className="filter-titles">Taille</h3>
         <div className="range_container"> 
             <div className="form_control">
                <div className="form_control_container">
                    <div className="form_control_container__time">Min</div> 
                    <p id="fromInputHeight" onInput = {() => controlFromInputHeight(fromSliderHeight, fromInputHeight, toInputHeight, toSliderHeight)}>{minHeight} m</p> 
                </div>
                <div className="form_control_container">
                    <div className="form_control_container__time">Max</div>
                    <p id="toInputHeight" onInput = {() => controlToInputHeight(toSliderHeight, fromInputHeight, toInputHeight, toSliderHeight)}>{maxHeight} m</p>
                </div>
            </div>
            <div className="sliders_control">
                <input onInput = {() => controlFromSliderHeight(fromSliderHeight, toSliderHeight,fromInputHeight)} onChange={getMinHeightValue }id="fromSliderHeight" value={minHeight} type="range"  min="0" max="15"/>
                <input onInput = {() => controlToSliderHeight(fromSliderHeight, toSliderHeight,toInputHeight)} onChange={getMaxHeightValue} id="toSliderHeight" value={maxHeight} type="range"  min="0" max="15"/>
            </div>      
        </div>

          <button className={`apply-filter-button ${isButtonDisabled ? "disabledButton" : ""}`} onClick={handleClick} disabled={isButtonDisabled}>Appliquer</button>
          <p id="default-params" onClick={defaultParams}>Rétablir les paramètres par défault</p>
        </div>
    );
}

export default Filter;