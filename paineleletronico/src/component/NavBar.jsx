import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to={`/disp1`}>Tela 1</Link>
                </li>
                <li>
                    <Link to={`/disp2`}>Tela 2</Link>
                </li>
                <li>
                    <Link to={`/disp3`}>Tela 3</Link>
                </li>
                <li>
                    <Link to={`/disp4`}>Tela 4</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;