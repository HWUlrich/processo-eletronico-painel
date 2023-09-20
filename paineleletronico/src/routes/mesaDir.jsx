import Disp1 from './disp1';
import Disp2 from './disp2';
import Disp3 from './disp3';
import Disp4 from './disp4';
import HeadLine from '../component/headLine';

const MesaDir = () => {

  // altera a tabela de estilos
  document.body.classList.toggle('mesa-dir');
  
  return (    
    <div className='mesa-diretora'>
      <div className='mesa-dir'>
        <Disp1 />
        <Disp2 />
        <Disp3 />
      </div>
      <div className='mesa-dir-1'>
        <HeadLine />
        <Disp4 /> 
      </div>   
       
    </div>
  );
}

export default MesaDir;