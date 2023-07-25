import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to={'/Disp1'} className='par'>1</Link>
                </li>
                <li>
                    <Link to={'/Disp2'} className='par'>2</Link>
                </li>
                <li>
                    <Link to={'/Disp3'} className='par'>3</Link>
                </li>
                <li>
                    <Link to={'/Disp3'} className='mat'>3</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;