import { useContext } from 'react';
import './Disp.css';
import Context from '../context/MyContext';


const Disp4 = () => {

  const { sessions, expmat, parlament } = useContext(Context);  

  return (    
    <div className='painel'>
      <div className='headline'>
        <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>
      </div>
      <div>
        {expmat.map((sessao) => (                                                
            <div className="painel-0" key={sessao.id}>                         
              <div className='painel-1'>
                <h1>{sessao.__str__.slice(0, 71)}</h1>                            
              </div>            
              <div className='painel-2'>
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
              </div>
              <div className='painel-2'>
                <h2>{parlament.reduce((o,p) => {return p.voto === "Sim" ? `Sim: ${o.voto + p.voto}` : ""}, [])}</h2>
                <h2>{parlament.reduce((o,p) => {return p.voto === "Não" ? `Não: ${o.voto + p.voto}` : ""}, [])}</h2>
                <h2>{parlament.reduce((o,p) => {return p.voto === "Abstenção" ? `Abstenções: ${o.voto + p.voto}` : "-"}, [])}</h2>                
              </div>
            </div>
        ))}
      </div>        
    </div>
  );
};

export default Disp4;