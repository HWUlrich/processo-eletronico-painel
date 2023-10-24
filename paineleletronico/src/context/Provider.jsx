import { useState, useEffect, useCallback } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchRegVot from '../axios/configRegVot';
import aPIFetchSesPlen from '../axios/configSesPlen';
import aPIFetchPar from '../axios/configPar';
import aPIFetchPres from '../axios/configPres';
import aPIFetchVot from '../axios/configVot';


function Provider({children}) {
  
  const [sessions, setSessions] = useState([]);
  const [parlament, setParlament] = useState([]);  
  
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

      const numSesPlenaria = sessions?.reduce((o,p) => {return p.sessao_plenaria}, "");
      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);      
      const votoResponse = await aPIFetchVot.get(`?ordem=${ordem}&page_size=21`);
      
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results; 
      const dataVoto = votoResponse.data.results;  
      
      const merged1 = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),
        ...dataVoto.find((o) => o.parlamentar === screen.id),
        ...screen      
      }));

      setParlament(merged1);      
    
    } catch (error) {
      console.log(error);
      alert ("Sem conexão com o SAPL");
    }

    }, [sessions]);

  useEffect(() => {
    getSessions();    
  }, [getSessions]);


  const contextValue = {    
    sessions,
    parlament,
    setSessions,
    setParlament,    
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;