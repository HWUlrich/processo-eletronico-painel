import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className='navbar'>
            <div className='img'>
                <img src='./public/images/Brasão_de_Nova_Friburgo_-_RJ.svg' alt='Logo Nova Friburgo'/>
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
            </ul>
        </nav>
    )
}

export default NavBar;