

function About({poids, taille, types, talents}){

    let arrType = [];
    let arrImg = [];
    let arrTalents = []

   

    if(talents === null){
        for(let i = 0; i < types.length; i++){
            arrImg.push({"img" :types[i].image})
            arrType.push({"type" :types[i].name})
        }
        return(

            <div className="pokemon-about">
            <div className="pokemon-about_blocks">
                <div className="pokemon-about_blocks_elements">
                    <h5 className="elements-name">Poids</h5>
                    <span className="elements-value">{poids}</span>
                </div>
                <div  className="pokemon-about_blocks_elements">
                    <h5 className="elements-name">Taille</h5>
                    <span className="elements-value">{taille}</span>
                </div>
            </div>


            <div className="pokemon-about_blocks">
                <div className="pokemon-about_blocks_elements">
                    <h5 className="elements-name">Type</h5>
                    <div className="container-type-icon">
                        <div className="block-img">
                            {arrImg.map(({img}, i)=>(
                                <img key={i} className="img-type" src={img} alt="" />
                            ))}
                        </div>
                        <div className="block-type">      
                            {arrType.map(({type}, i)=>(         
                                <p key={i} className="pokemon-about_blocks_icon-type">{type}</p>
                                ))}
                        </div>
                    </div> 
                </div>
                <div  className="pokemon-about_blocks_elements">
                    <h5 className="elements-name">Talents</h5>

                </div>
            </div>
        </div>
        )

    }else{
        for(let i = 0; i < types.length; i++){
            arrImg.push({"img" :types[i].image})
            arrType.push({"type" :types[i].name})
        }
        
        for(let i = 0; i < talents.length; i++){
            arrTalents.push({"talent" :talents[i].name})     
        }
        return (
            <div className="pokemon-about">
                <div className="pokemon-about_blocks">
                    <div className="pokemon-about_blocks_elements">
                        <h5 className="elements-name">Poids</h5>
                        <span className="elements-value">{poids}</span>
                    </div>
                    <div  className="pokemon-about_blocks_elements">
                        <h5 className="elements-name">Taille</h5>
                        <span className="elements-value">{taille}</span>
                    </div>
                </div>
    
    
                <div className="pokemon-about_blocks">
                    <div className="pokemon-about_blocks_elements">
                        <h5 className="elements-name">Type</h5>
                        <div className="container-type-icon">
                            <div className="block-img">
                                {arrImg.map(({img}, i)=>(
                                    <img key={i} className="img-type" src={img} alt="" />
                                ))}
                            </div>
                            <div className="block-type">      
                                {arrType.map(({type}, i)=>(         
                                    <p key={i} className="pokemon-about_blocks_icon-type">{type}</p>
                                    ))}
                            </div>
                        </div> 
                    </div>
                    <div  className="pokemon-about_blocks_elements">
                        <h5 className="elements-name">Talents</h5>
                        {arrTalents.map(({talent},i) =>(
                            <p key = {i} className="elements-value">{talent}</p>
                        ))}
                    </div>
                </div>
            </div>
        );

    }

}

export default About;