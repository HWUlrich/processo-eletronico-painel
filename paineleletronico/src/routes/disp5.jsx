import Disp1 from './disp1';
import Disp2 from './disp2';
import Disp3 from './disp3';
import Disp4 from './disp4';

const Disp5 = () => {

  // altera a tabela de estilos
  document.body.classList.toggle('mesa-dir');
 
  return (    
    <div className='mesa-diretora'>
      <div className='mesa-dir'>
        <Disp1 />
        <Disp2 />
        <Disp3 />
      </div>   
      <Disp4 />  
    </div>
  );
}

export default Disp5;