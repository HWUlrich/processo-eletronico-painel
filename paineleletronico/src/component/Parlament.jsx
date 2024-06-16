import { useState, useContext } from 'react';
import './Parlament.css';
import Context from '../context/MyContext';


const Parlament = () => {

    // altera a tabela de estilos
    const dispStyleParl = () => {
      document.body.classList.toggle('parlamentares');
    }
  
    const { presenca, parlament } = useContext(Context);
    
    const [ itensPerPage ] = useState(21);
    const [ currentPage ] = useState(0);  
   
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;  
    const currentItens = presenca?.slice(startIndex, endIndex);
    const currentItens1 = parlament?.slice(startIndex, endIndex);  
    console.log(currentItens);  
  
    return (
      <div className='parlament'>            
        {currentItens?.map((parlament) => (                     
            <div className="parlament-0" key={parlament.id}>                         
              <div className='parlament-1'>
                <h1>{parlament.nome_parlamentar}</h1>
              </div>                           
              <div className='parlament-2'>
                <h2>{parlament.partido}</h2>
              </div>            
              <div id='presParlament' className='parlament-3'>
                <div>{parlament.parlamentar ? <h2>Presente</h2> : <h3>Ausente</h3>}</div>            
              </div>
              <div>
                {currentItens1?.map((parlament1) => (
                <div className='parlament-4'key={parlament1.id}>                               
                  <div>{parlament1.voto === "Sim" ? <h2>Sim</h2> : ""}</div>
                  <div>{parlament1.voto === "Não" ? <h3>Não</h3> : ""}</div>
                  <div>{parlament1.voto === "Abstenção" ? <h4>Abstenção</h4> : ""}</div>
                  <div>{parlament1.voto === "Não Votou" ? <h5>Não Votou</h5> : ""}</div>              
                </div>            
                ))}
              </div>                                       
            </div>
        ))}
      </div>
    );
  }

export default Parlament;