

function Stats({stats, types}) {


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

    return (
        <div className="block-stats">
            <div className="stats">
                <p className="stat-name">HP</p>
                <span className="stat">{stats.hp}</span>
                <div className="block-range">
                    <div className="seconde_block-range">
                        <span className="range" style ={{width:`${stats.hp}%`, background:`${colours[typeColor]}` }}></span>
                    </div>
                </div>
            </div>

            <div className="stats">
                <p className="stat-name">Atk</p>
                <span className="stat">{stats.atk}</span>
                <div className="block-range">
                    <div className="seconde_block-range">
                        <span className="range" style ={{width:`${stats.atk}%`, background:`${colours[typeColor]}` }}></span>
                    </div>
                </div>
            </div>

            <div className="stats">
                <p className="stat-name">Def    </p>
                <span className="stat">{stats.def}</span>
                <div className="block-range">
                    <div className="seconde_block-range">
                        <span className="range" style ={{width:`${stats.def}%`, background:`${colours[typeColor]}` }}></span>
                    </div>
                </div>
            </div>

            <div className="stats">
                <p className="stat-name">Sp.Atk</p>
                <span className="stat">{stats.spe_atk}</span>
                <div className="block-range">
                    <div className="seconde_block-range">
                        <span className="range" style ={{width:`${stats.spe_atk}%`, background:`${colours[typeColor]}` }}></span>
                    </div>
                </div>
            </div>

            <div className="stats">
                <p className="stat-name">Sp.Def</p>
                <span className="stat">{stats.spe_def}</span>
                <div className="block-range">
                    <div className="seconde_block-range">
                        <span className="range" style ={{width:`${stats.spe_def}%`, background:`${colours[typeColor]}` }}></span>
                    </div>
                </div>
            </div>

            <div className="stats">
                <p className="stat-name">Vit</p>
                <span className="stat">{stats.vit}</span>
                <div className="block-range">
                    <div className="seconde_block-range">
                        <span className="range" style ={{width:`${stats.vit}%`, background:`${colours[typeColor]}` }}></span>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default Stats;