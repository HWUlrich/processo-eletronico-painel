import { useState, useContext } from 'react';
import './Disp.css';
import Context from '../context/MyContext';

const Disp2 = () => {

  const { parlament } = useContext(Context);
  
  const [ itensPerPage ] = useState(7);
  const [ currentPage ] = useState(1);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parlament.slice(startIndex, endIndex);

  return (
    <div className='par'>      
      {       
        currentItens?.map((parlament) => (                     
          <div className="parl" key={parlament.id}>                         
            <div className='parl-1'>
              <h1>{parlament.nome_parlamentar}</h1> 
            </div>                           
            <div className='parl-2'>
              <h2>{parlament.partido}</h2>
            </div>
            <div className='parl-3'>
              <div>{parlament.parlamentar?<h2>Presente</h2>:<h3>Ausente</h3>}</div>
            </div> 
            <div className='parl-4'>
              <h2>{parlament.voto?parlament.voto:"-"}</h2>
            </div>                              
          </div>                    
        )
        )
      } 
    </div>
  );
}

export default Disp2;