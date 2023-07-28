import React from 'react';
import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className='navbar'>
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