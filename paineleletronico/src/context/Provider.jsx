import { useState, useEffect, useCallback } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchRegVot from '../axios/configRegVot';
import aPIFetchSesPlen from '../axios/configSesPlen';


function Provider({children}) {
  
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

    }, [setSessions]);

  useEffect(() => {
    getSessions();    
  }, [getSessions]);


  const contextValue = {    
    sessions,
    setSessions,
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;