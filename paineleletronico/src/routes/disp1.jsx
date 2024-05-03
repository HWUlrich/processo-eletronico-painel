import { useState, useContext } from 'react';
import './Disp.css';
import Context from '../context/MyContext';


const Disp1 = () => {
  
  // altera a tabela de estilos
  const dispStyleParl = () => {
    document.body.classList.toggle('parlamentares');
  }

  const { parlament } = useContext(Context);
  
  const [ itensPerPage ] = useState(7);
  const [ currentPage ] = useState(0); 
 
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
            <div id='presParl' className='parl-3'>             
              <div>{parlament.parlamentar ? <h2>Presente</h2> : <h3>Ausente</h3>}</div>            
            </div> 
            <div className='parl-4'>
              <div>{parlament.voto === "Sim" ? <h2>Sim</h2> : ""}</div>
              <div>{parlament.voto === "Não" ? <h3>Não</h3> : ""}</div>
              <div>{parlament.voto === "Abstenção" ? <h4>Abstenção</h4> : ""}</div>
              <div>{parlament.voto === "Não Votou" ? <h5>Não Votou</h5> : ""}</div>              
            </div>                              
          </div>                    
        )
        )
      } 
    </div>
  );
}

export default Disp1;