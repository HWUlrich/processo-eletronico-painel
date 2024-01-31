import Link from 'next/link';
import styles from "./navbar.modules.css";
import Image from 'next/image';


const NavBar = () => {    
    

    return (
        <nav className={styles.navbar}>
            <div className={styles.img_wrapper}>
                <Image
                    src= '../public/images/brasaoLogo.png'
                    width= '70'
                    height= '50'
                    alt= 'Logo Identidade Visual Câmara Municipal'
                />                
            </div>          
            <div className={styles.title}>
                <h1>CÂMARA MUNICIPAL DE NOVA FRIBURGO</h1>
                <h2>Fonte: SAPL</h2>                
            </div>                        
            <ul>
                <li>
                    <Link href="/">1</Link>
                </li>
                <li>
                    <Link href="/disp2">2</Link>
                </li>
                <li>
                    <Link href="/disp3">3</Link>
                </li>
                <li>
                    <Link href="/disp4">4</Link>
                </li>
                <li>
                    <Link href="/mesaDir">5</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavBar;