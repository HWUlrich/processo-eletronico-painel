import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import aPIFetchSes from '../axios/configSes';
import aPIFetchPres from '../axios/configPres';


const Disp4 = () => {

  const [sessions, setSessions] = useState([]);     

  const getSessions = useCallback ( async () => {

    try { 

      let numSesPlenaria = 695;
      const sessionsResponse = await aPIFetchSes.get(`?data_ordem=2023-08-15`);
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);  
      const dataPresent = presentResponse.data.results;      
      const dataSession = sessionsResponse.data.results;       
      
      
      const merged = dataSession.map((screen) => ({
        ...dataPresent.find((o) => o.sessao_plenaria === screen.sessao_plenaria),        
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