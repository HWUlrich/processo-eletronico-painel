import Disp1 from './disp1';
import Disp2 from './disp2';
import Disp3 from './disp3';
import Disp4 from './disp4';

const Disp5 = () => {

  //document.body.classList.toggle('dark-theme');
 
  return (    
    <div className='mesaDir'>
      <div className='mesa'>
      <Disp1 />
      <Disp2 />
      <Disp3 />
      </div>   
      <Disp4 />  
    </div>
  );
}

export default Disp5;