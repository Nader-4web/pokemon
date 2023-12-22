import "../style/App.css"
import {NavLink} from "react-router-dom"

function Nav() {
    return (
        
            <nav className='navigation'>               
                <p> <NavLink to ="/">Accueil</NavLink></p>
                <p id="contact"><NavLink to ="/contact">Contact</NavLink></p>
            </nav>
        
    );
}

export default Nav;