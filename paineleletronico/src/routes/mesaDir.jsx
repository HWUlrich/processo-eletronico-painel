import { useContext } from 'react';
import './Disp.css';
import Parlament from '../component/Parlament';
import Context from '../context/MyContext';

const MesaDir = () => {
  
     // altera a tabela de estilos
     const dispStyleMesa = () => {
      document.body.classList.toggle('mesa-dir');
  }

  const { sessions, expmat, parlament } = useContext(Context);
  
  return (    
    <div className='mesa-diretora'>
      <div className='headline-mesa'>
        <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>
      </div>
      <div className='mesa-dir'>        
        <Parlament />
        <div className='mesa-dir-1'>
          <div className='painel'>            
            <div className='painel-mesa-fundo'>
              {expmat.map((sessao) => (                                                
                <div className="painel-mesa-0" key={sessao.id}>                         
                  <div className='painel-mesa-1'>
                    <h1>{sessao.__str__.slice(24, -67)}</h1>                            
                  </div>            
                  <div className='painel-mesa-2'>
                    <h2>{sessao.resultado}</h2>                
                  </div>                                          
                </div>                    
              ))}
            </div>
            <div>
              {sessions.map((sessao) => (                                                
                <div className="painel-0" key={sessao.id}>                         
                  <div className='painel-1'>
                    <h1>{sessao.__str__.slice(0, 71)}</h1>
                    <button className='button-mesa'>Votar</button>                            
                  </div>                  
                </div>
              ))}
            </div>
            <div className='painel-2'>
            {parlament.map((votopar) => (
                      <div key={parlament.id}>                                        
                        <h2>{(votopar.voto === "Sim" ? votopar.voto : "")}</h2>                      
                          
                      </div>                               
                    ))}
            </div>        
          </div> 
        </div>
      </div>
    </div>
  );
}

export default MesaDir;