import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import aPIFetchSes from '../axios/configSes';
import aPIFetchRegVot from '../axios/configRegVot';


const Disp4 = () => {

  const [sessions, setSessions] = useState([]);     

  const getSessions = useCallback ( async () => {

    try { 
      let materia = 46327;
      //let numSesPlenaria = 695;
      const sessionsResponse = await aPIFetchSes.get(`?data_ordem=2023-08-15`);
      const regVotResponse = await aPIFetchRegVot.get(`?materia=${materia}`);
      //console.log(regVotResponse);            
      const dataSession = sessionsResponse.data.results; 
      const dataRegVot = regVotResponse.data.results;        
      
      
      const merged = dataSession.map((screen) => ({
        ...dataRegVot.find((o) => o.materia === screen.materia),        
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
      {sessions.length === 0 ? (<p>Carregando Painel...</p>) : (        
        sessions.map((sessao) => (                                      
          <div className="painel-0" key={sessao.id}>                         
            <div className='painel-1'>
              <h1>{sessao.__str__}</h1> 
            </div>            
            <div className='painel-2'>
              <h2>{sessao.materia}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp4;