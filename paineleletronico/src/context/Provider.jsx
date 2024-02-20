import { useState, useEffect, useCallback } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchSesPlen from '../axios/configSesPlen';
import aPIFetchPar from '../axios/configPar';
import aPIFetchPres from '../axios/configPres';
import aPIFetchVot from '../axios/configVot';
import aPIFetchExpMat from '../axios/configExpMat';


function Provider({children}) {
  
  const [sessions, setSessions] = useState([]);
  const [expmat, setExpmat] = useState([]);
  const [parlament, setParlament] = useState([]);
  const [ordemDia, setOrdemDia] = useState([]);
  const [date, setDate] = useState([]);
  
  
  
  const getSessions = useCallback ( async () => {

    try {                  
      const date = "2023-12-14"; // new Date().toISOString().slice(0,10);
      setDate(date);
      
      // Ordem do dia
      const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);      
      const sesPlenResponse = await aPIFetchSesPlen.get(`?data_inicio=${date}&page_size=30`);      
                 
      const dataOrdDia = ordDiaResponse.data.results;       
      const dataSesPlen = sesPlenResponse.data.results;
           
      const merged = dataOrdDia.map((screen) => ({        
        ...dataSesPlen.find((o) => o.codReuniao === screen.sessao_plenaria),              
        ...screen      
      }));
      
      setSessions(merged);
      //console.log(merged);

      // Matérias do Expediente
      const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
      const dataExpMat = expMatResponse.data.results;
      //console.log(dataExpMat);

      const matExp = dataExpMat?.filter((p) => p.resultado === "Matéria lida")
      const nmatExp = matExp?.map((p) => {return p.id}).shift();
      const dataMateriasExp = await aPIFetchExpMat.get(`?id=${nmatExp}&page_size=30`);
      const materiasExp = dataMateriasExp.data.results; 

      setExpmat(materiasExp);
      console.log(materiasExp);           

      // Painéis
      const numSesPlenaria = sessions?.reduce((o,p) => {return p.sessao_plenaria}, "");
      //console.log(numSesPlenaria)

      const ordem = sessions?.filter((p) => p.resultado === "Aprovado")
      const nordem = ordem?.map((p) => {return p.id}).shift();
      setOrdemDia(nordem);        
      console.log('nordem :' + nordem);
      console.log('ordemDia :' + ordemDia);
      
      
      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);      
      const votoResponse =  ordemDia ? await aPIFetchVot.get(`?ordem=${ordemDia}&page_size=30`) : null;
        
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results; 
      const dataVoto = votoResponse ? votoResponse.data.results : [];
      //console.log(dataVoto);
      
      const merged1 = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),
        ...dataVoto.find((o) => o.parlamentar === screen.id),
        ...screen      
      }));

      setParlament(merged1);      
    
    } catch (error) {
      console.log(error);
      //alert ("Sem conexão com o SAPL");
    } 

    }, [ordemDia, sessions]);


  useEffect(() => {
    getSessions();    
  }, [getSessions]);


  const contextValue = {    
    sessions,
    expmat,
    parlament,
    ordemDia,
    date,
    setSessions,
    setExpmat,
    setParlament,
    setOrdemDia,
    setDate,    
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;