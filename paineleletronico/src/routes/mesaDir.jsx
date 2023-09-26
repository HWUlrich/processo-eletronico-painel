import './Disp.css';
import Parlament from '../component/Parlament';
import Disp4 from './disp4';

const MesaDir = () => {

  // altera a tabela de estilos
  document.body.classList.toggle('mesa-dir');
  
  return (    
    <div className='mesa-diretora'>
      <div className='mesa-dir'>        
        <Parlament />
        <div className='mesa-dir-1'>        
          <Disp4 /> 
        </div>
      </div>

    </div>
  );
}

export default MesaDir;