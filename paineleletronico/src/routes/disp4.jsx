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
            (sessao.numero_ordem === 1 && sessao.resultado === "Matéria lida" ) ?                                                                  
            (<div className="painel-0" key={sessao.id}>                         
              <div className='painel-1'>
                <h1>{sessao.__str__.slice(24, -67)}</h1>                            
              </div>            
              <div className='painel-2'>
                <h2>{sessao.resultado}</h2>                
              </div>                                         
            </div>) :("")                 
        ))}
      </div>
      <div>
        {sessions.map((sessao) => (
            (sessao.numero_ordem === 1 && sessao.resultado === "Aprovado" ) ?                                                  
            (<div className="painel-0" key={sessao.id}>                         
              <div className='painel-1'>
                <h1>{sessao.__str__.slice(24, -67)}</h1>                            
              </div>
              <div className='painel-2'>
                <h2>Sim: {parlament.reduce((o,p) => {p.voto === "Sim" && o++; return o}, 0)}</h2>
                <h2>Não: {parlament.reduce((o,p) => {p.voto === "Não" && o++; return o}, 0)}</h2>
                <h2>Abstenções: {parlament.reduce((o,p) => {p.voto === "Abstenções" && o++; return o}, 0)}</h2>
                <h2>Não Votaram: {parlament.reduce((o,p) => {p.voto === "Não Votou" && o++; return o}, 0)}</h2>                
              </div>
            </div>) : ("")
        ))}
      </div>        
    </div>
  );
};

export default Disp4;