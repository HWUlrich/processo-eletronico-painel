import { useState, useContext } from 'react';
import './Parlament.css';
import Context from '../context/MyContext';


const Parlament = () => {

    // altera a tabela de estilos
    const dispStyleParl = () => {
      document.body.classList.toggle('parlamentares');
    }
  
    const { presenca, presencaExp, parlament } = useContext(Context);
    
    const [ itensPerPage ] = useState(21);
    const [ currentPage ] = useState(0);  
   
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;  
    const currentItens0 = presencaExp?.slice(startIndex, endIndex);
    const currentItens1 = presenca?.slice(startIndex, endIndex);
    const currentItens2 = parlament?.slice(startIndex, endIndex);
  
    const currentItens = presencaExp.length !== 0 && presenca.length === 0 ? currentItens0 : currentItens1;  
  
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
                {currentItens2?.map((parlament1) => (
                <div className='parlament-4'key={parlament1.id}>                               
                  <div>{parlament1.voto === "Sim" && parlament1.parlamentar === parlament.parlamentar ? <h2>Sim</h2> : ""}</div>
                  <div>{parlament1.voto === "Não" && parlament1.parlamentar === parlament.parlamentar ? <h3>Não</h3> : ""}</div>
                  <div>{parlament1.voto === "Abstenção" && parlament1.parlamentar === parlament.parlamentar ? <h4>Abstenção</h4> : ""}</div>
                  <div>{parlament1.voto === "Não Votou" && parlament1.parlamentar === parlament.parlamentar ? <h5>Não Votou</h5> : ""}</div>              
                </div>            
                ))}
              </div>                                       
            </div>
        ))}
      </div>
    );
  }

export default Parlament;