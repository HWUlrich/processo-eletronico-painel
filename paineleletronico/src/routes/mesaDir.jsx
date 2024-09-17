import './MesaDir.css';
import Parlament from '../component/Parlament';
import DispMesa from '../component/DispMesa';


const MesaDir = () => {
  
  // altera a tabela de estilos
  const dispStyleMesa = () => {
    document.body.classList.toggle('mesa-1');
  }  
  
  return (    
    <div className='mesa-diretora'>
      <div className='mesa-1'>
        <div className='parlament'>
        <Parlament />
        </div>
        <DispMesa />             
      </div>
      <div className='som'> 
        <h1>Controle de Som</h1>
      </div>                
    </div>
  );
}

export default MesaDir;