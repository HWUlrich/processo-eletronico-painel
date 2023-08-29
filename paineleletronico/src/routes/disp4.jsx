import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import blogFetchSes from '../axios/configSes';
import moment from 'moment';


const Disp4 = () => {

  const [sessions, setSesssions] = useState([]);    

  
  

  const getSessions = useCallback ( async () => {   
    try {
      const sessionsResponse = await blogFetchSes.get();
      const lastPage = sessionsResponse.data.pagination.total_pages;
      const lastPageResponse = await blogFetchSes.get(`?page=${lastPage}&page_size=10`);
      const penultimatePageResponse = await blogFetchSes.get(`?page=${lastPage -1}&page_size=10`);

      setSesssions(filterTodaySessions(lastPageResponse.data.results));
      setSesssions((previousState)=> [...previousState, ...filterTodaySessions(penultimatePageResponse.data.results)]);
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
      {sessions?.length === 0 ? (<p>Carregando Painel...</p>) : (        
        sessions?.map((sessao) => (                    
          <div className="painel-0" key={sessao.codReuniao}>                         
            <div className='painel-1'>
              <h1>{sessao.txtTituloReuniao}</h1> 
            </div>            
            <div className='parinel-2'>
              <h2>{sessao.datReuniaoString}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp4;