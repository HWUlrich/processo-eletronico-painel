import { Link } from 'react-router-dom';
import "./NavBar.css";
import Logo from '../public/images/brasaoLogo.png';
import Disp1 from '../routes/disp1';
import MesaDir from '../routes/mesaDir';


const NavBar = () => {    
    

    return (
        <nav className='navbar'>
            <div className="img-wrapper">
                <img src={Logo} alt='Logo Nova Friburgo'/>
            </div>          
            <div className='title'>
                <h1>CÂMARA MUNICIPAL DE NOVA FRIBURGO</h1>
                <h2>Fonte: SAPL</h2>                
            </div>                        
            <ul>
                <li>
                    <Link to={`/disp1`} onClick={Disp1.dispStyleParl}>1</Link>
                </li>
                <li>
                    <Link to={`/disp2`} onClick={Disp1.dispStyleParl}>2</Link>
                </li>
                <li>
                    <Link to={`/disp3`} onClick={Disp1.dispStyleParl}>3</Link>
                </li>
                <li>
                    <Link to={`/disp4`} onClick={Disp1.dispStyleParl}>4</Link>
                </li>
                <li>
                    <Link to={`/mesaDir`} onClick={MesaDir.dispStyleMesa}>5</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;