import { useState, useEffect, useCallback, useContext } from 'react';
import './Disp.css';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchRegVot from '../axios/configRegVot';
import aPIFetchSesPlen from '../axios/configSesPlen';


const Disp4 = () => {

  const [sessions, setSessions] = useState([]);     

  const getSessions = useCallback ( async () => {

    try {
                  
      const date = "2023-08-15";  // new Date().toISOString().slice(0,10);
      const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}`);
      const regVotResponse = await aPIFetchRegVot.get(`?materia=46327`);
      const sesPlenResponse = await aPIFetchSesPlen.get(`?data_inicio=${date}`);           
      const dataOrdDia = ordDiaResponse.data.results; 
      const dataRegVot = regVotResponse.data.results; // numero de ordem
      const dataSesPlen = sesPlenResponse.data.results;      
      
      const merged = dataOrdDia.map((screen) => ({
        ...dataRegVot.find((o) => o.materia === screen.materia),
        ...dataSesPlen.find((o) => o.codReuniao === screen.sessao_plenaria),              
        ...screen      
      }));
      
      setSessions(merged);
    
    } catch (error) {
      console.log(error);
      alert ("Sem conexão com o SAPL");
    }

    }, []);

  useEffect(() => {
    getSessions();    
  }, [getSessions]);


  return (    
    <div className='painel'>
      <div className='headline'>
        <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>
      </div>               
      {sessions.length === 0 ? (<p>Carregando Painel...</p>) : (        
        sessions.map((sessao) => (                                                
          <div className="painel-0" key={sessao.id}>                         
            <div className='painel-1'>
              <h1>{sessao.__str__.slice(0, 71)}</h1>                            
            </div>            
            <div className='painel-2'>
              <h2>Sim: {sessao.numero_votos_sim}</h2>
              <h2>Não: {sessao.numero_votos_nao}</h2>
              <h2>Abstenções: {sessao.numero_abstencoes}</h2>
              <h3>Matéria: {sessao.materia}</h3>
            </div>                                          
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp4;