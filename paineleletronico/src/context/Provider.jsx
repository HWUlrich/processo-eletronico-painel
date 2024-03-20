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
  const [parlament, setParlament] = useState([]);
  const [matExp, setMatExp] = useState([]);
  const [matOrd, setMatOrd] = useState([]); 
  const [date, setDate] = useState("2024-02-29");
  
  
  const getSessions = useCallback ( async () => {  

    try {     
      
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

      // Painéis
      const numSesPlenaria = sessions
        ?.reduce((o,p) => {
          return p.sessao_plenaria;
        }, "");
      //console.log(numSesPlenaria)

      const ordem = dataOrdDia?.filter((p) => p.resultado === "Aprovado")

      const nordem = ordem ? ordem?.map((p) => {return p.id}).shift() : "Matérias Todas Votadas - Sessão Terminada";                  
            
      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);      
      const votoResponse =  nordem ? await aPIFetchVot.get(`?ordem=${nordem}&page_size=30`) : null;
        
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
      
      // Matérias do Expediente
      const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
      const dataExpMat = expMatResponse.data.results;
      console.log('date: ' + date);

      const matExp = dataExpMat?.filter((p) => p.resultado === "Matéria lida")

      const nmatExp = matExp ? matExp?.map((p) => {return p.id}).shift() : "Matérias Lidas e Ata Aprovada";

      console.log('nmatExp :' + nmatExp);
        
      const dataMateriasExp = nmatExp ? await aPIFetchExpMat.get(`${nmatExp}/`) : null;
      const materiasExp = dataMateriasExp.data;
      setMatExp([materiasExp]);
      console.log(materiasExp);  
      
      const dataMateriasOrd = nordem ? await aPIFetchOrdDia.get(`${nordem}/`) : null;
      const materiasOrd = dataMateriasOrd.data;
      setMatOrd([materiasOrd]);
      console.log(materiasOrd);
    
    } catch (error) {
      console.log(error);
      //alert ("Sem conexão com o SAPL");
    } 

    }, []);


  useEffect(() => {
    getSessions();    
  }, [getSessions]);


  const contextValue = {    
    sessions,    
    parlament,
    matExp,
    matOrd,    
    date,
    setSessions,    
    setParlament,
    setMatExp,
    setMatOrd,    
    setDate,    
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;