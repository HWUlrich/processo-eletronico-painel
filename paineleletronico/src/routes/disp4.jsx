import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchRegVot from '../axios/configRegVot';
import aPIFetchSesPlen from '../axios/configSesPlen';
import HeadLine from '../component/headLine';
import Disp1 from './disp1';


const Disp4 = () => {

  const [sessions, setSessions] = useState([]);     

  const getSessions = useCallback ( async () => {

    try {
                  
      let date = "2023-08-15";  // new Date().toLocaleDateString;
      const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}`);
      const regVotResponse = await aPIFetchRegVot.get(`?materia=46327`); // ${dataOrdDia.reduce((0) => o.materia}
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
      onDataFetched(merged);

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
      <HeadLine />     
      {sessions.length === 0 ? (<p>Carregando Painel...</p>) : (        
        sessions.map((sessao) => (                                                
          <div className="painel-0" key={sessao.id}>                         
            <div className='painel-1'>
              <h1>{sessao.__str__.slice(0, 70)}</h1>              
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