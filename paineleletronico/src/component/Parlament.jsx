import { useState, useContext } from 'react';
import './Parlament.css';
import Context from '../context/MyContext';


const Parlament = () => {
  
  const { parlament } = useContext(Context);
  const [ itensPerPage ] = useState(21);
  const [ currentPage ] = useState(0);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parlament.slice(startIndex, endIndex);  

 
  return (
    <div className='parlament'>      
      {currentItens?.length === 0 ? (<p>Carregando Parlamentares...</p>) : (        
        currentItens?.map((parlament) => (                     
          <div className="parlament-0" key={parlament.id}>                         
            <div className='parlament-1'>
              <h1>{parlament.nome_parlamentar}</h1> 
            </div>                           
            <div className='parlament-2'>
              <h2>{parlament.partido}</h2>
            </div>
            <div id='presParlament' className='parlament-3'>             
            <div>{parlament.parlamentar?<h2>Presente</h2>:<h3>Ausente</h3>}</div>            
            </div> 
            <div className='parlament-4'>
              <h2>{parlament.voto?parlament.voto:"-"}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Parlament;