import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import Logo from '../public/images/LogoNovaFriburgo.png';

const NavBar = () => {
    return (
        <nav className='navbar'>                        
            <img src={Logo} alt='Logo Nova Friburgo'/>
            <div>
                <h1>CÂMARA MUNICIPAL DE NOVA FRIBURGO</h1>
                <h2>Fonte: SAPL</h2>
            </div>
                        
            <ul>
                <li>
                    <Link to={`/disp1`}>1</Link>
                </li>
                <li>
                    <Link to={`/disp2`}>2</Link>
                </li>
                <li>
                    <Link to={`/disp3`}>3</Link>
                </li>
                <li>
                    <Link to={`/disp4`}>4</Link>
                </li>
                <li>
                    <Link to={`/disp5`}>5</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;