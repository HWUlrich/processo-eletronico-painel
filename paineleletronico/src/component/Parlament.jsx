import { useState, useContext, useEffect, useCallback } from 'react';
import './Parlament.css';
import Context from '../context/MyContext';


const Parlament = () => {
  // altera a tabela de estilos
  const dispStyleMesa = () => {
    document.body.classList.toggle('parlamentares');
  };

  const { presenca, presencaExp, parlament, dataPre, dataPreExp } = useContext(Context);
  
  const [ itensPerPage ] = useState(21);
  const [ currentPage ] = useState(0);  
    
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;  
  const currentItens0 = presencaExp?.slice(startIndex, endIndex);
  const currentItens1 = presenca?.slice(startIndex, endIndex);
  const currentItens2 = parlament?.slice(startIndex, endIndex);

  const currentItens = useCallback (() => {
    if(dataPre.length > 0) {
      return currentItens1;
    } else {
      return currentItens0;
    }
  }, [dataPre, dataPreExp]);

  useEffect (() => {
    currentItens();
  }, [currentItens])
  
    return (
      <div>            
        {currentItens()?.map((parlament) => (                     
            <div className="parla" key={parlament.id}>                         
              <div className='parla-1'>
                <h1>{parlament.nome_parlamentar}</h1>
              </div>                           
              <div className='parla-2'>
                <h2>{parlament.partido}</h2>
              </div>            
              <div id='presParla' className='parla-3'>
                <div>{parlament.parlamentar ? <h2>Presente</h2> : <h3>Ausente</h3>}</div>            
              </div>
              <div className='parla-4-0'>
                {currentItens2?.map((parlament1) => (
                <div className='parla-4'key={parlament1.id}>                               
                  <div>{parlament1.voto === "Sim" && parlament1.parlamentar === parlament.parlamentar ? <h2>Sim</h2> : null}</div>
                  <div>{parlament1.voto === "Não" && parlament1.parlamentar === parlament.parlamentar ? <h3>Não</h3> : null}</div>
                  <div>{parlament1.voto === "Abstenção" && parlament1.parlamentar === parlament.parlamentar ? <h4>Abstenção</h4> : null}</div>
                  <div>{parlament1.voto === "Não Votou" && parlament1.parlamentar === parlament.parlamentar ? <h5>Não Votou</h5> : null}</div>              
                </div>            
                ))}
              </div>                                       
            </div>
        ))}
      </div>
    );
};

export default Parlament;