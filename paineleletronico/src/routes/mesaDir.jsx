import { useContext, useState } from 'react';
import './Disp.css';
import Parlament from '../component/Parlament';
import Context from '../context/MyContext';
import PanelInfo from '../component/PanelInfo';

const MesaDir = () => {
  
     // altera a tabela de estilos
     const dispStyleMesa = () => {
      document.body.classList.toggle('mesa-dir');
    }    


  const { sessions, expmat, parlament } = useContext(Context);
  const [data, setData] = useState();
  
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
              <h1>Matérias do Expediente</h1>
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
              <h1>Ordem do Dia</h1>
              {sessions.map((sessao) => (                                                
              <div className="painel-0" key={sessao.id}>                         
                <div className='painel-1'>
                  <h1>{sessao.__str__.slice(24, -67)}</h1>                                            
                </div>
                <div className='painel-2'>
                  <h2>Sim: {parlament.reduce((o,p) => {p.voto === "Sim" && o++; return o}, 0)}</h2>
                  <h2>Não: {parlament.reduce((o,p) => {p.voto === "Não" && o++; return o}, 0)}</h2>
                  <h2>Abstenções: {parlament.reduce((o,p) => {p.voto === "Abstenções" && o++; return o}, 0)}</h2>
                  <h2>Não Votaram: {parlament.reduce((o,p) => {p.voto === "Não Votou" && o++; return o}, 0)}</h2>                
                </div>
                <div>
                  <PanelInfo votar={data} />
                </div>                
              </div>
              ))};         
            </div>
          </div>        
        </div>
      </div>
    </div>
  );
}

export default MesaDir;