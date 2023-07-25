import { Link } from 'react-router-dom';
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className='navbar'>
            <ul>
                <li>
                    <Link to={'/'} className='par'>1</Link>
                </li>
                <li>
                    <Link to={'/disp2'} className='par'>2</Link>
                </li>
                <li>
                    <Link to={'/disp3'} className='par'>3</Link>
                </li>
                <li>
                    <Link to={'/disp3'} className='mat'>3</Link>
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;