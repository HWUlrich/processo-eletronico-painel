import Disp4 from './Disp4';
import './Disp.css';
import Parlament from '../component/Parlament';
import HeadLine from '../component/headLine';

const MesaDir = () => {

  // altera a tabela de estilos
  document.body.classList.toggle('mesa-dir');
  
  return (    
    <div className='mesa-diretora'>
      <HeadLine />
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