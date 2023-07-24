import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className='navbar'>
            <h2>
                <Link to={'/'}>0</Link>
            </h2>
            <ul>
                <li>
                    <Link to={'disp1'} className='parlament'>1</Link>
                </li>
                <li>
                    <Link to={'disp2'} className='parlament'>2</Link>
                </li>
                <li>
                    <Link to={'disp3'} className='parlament'>3</Link>
                </li>
                <li>
                    <Link to={'disp3'} className='materias'>3</Link>
                </li>
            </ul>
        </nav>
    )
}