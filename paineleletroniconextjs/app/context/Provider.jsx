'use client'
import { useState } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../services/configOrdDia';
import aPIFetchSesPlen from '../services/configSesPlen';
import aPIFetchPar from '../services/configPar';
import aPIFetchPres from '../services/configPres';
import aPIFetchVot from '../services/configVot';
import aPIFetchExpMat from '../services/configExpMat';



function Provider({children}) {
  
  const [sessions, setSessions] = useState([]);
  const [expmat, setExpmat] = useState([]);
  const [parlament, setParlament] = useState([]);
  const [ordemDia, setOrdemDia] = useState([]);
  const [date, setDate] = useState([]);
  
  
  
  const getSessions =  async () => {

    try {                  
      const date = "2023-12-14"; // new Date().toISOString().slice(0,10);
      setDate(date);
      
      // Ordem do dia
      const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);
      //const regVotResponse = await aPIFetchRegVot.get(`?materia=46327`); //O Registro de Votação é usado somente quando o operador preenche com os dados. 
      const sesPlenResponse = await aPIFetchSesPlen.get(`?data_inicio=${date}&page_size=30`);      
                 
      const dataOrdDia = ordDiaResponse.data.results; 
      //const dataRegVot = regVotResponse.data.results; // numero de ordem
      const dataSesPlen = sesPlenResponse.data.results;
           
      const merged = dataOrdDia.map((screen) => ({
        //...dataRegVot.find((o) => o.ordem === screen.id),
        ...dataSesPlen.find((o) => o.codReuniao === screen.sessao_plenaria),              
        ...screen      
      }));
      
      setSessions(merged);
      //console.log(merged);

      // Matérias do Expediente
      const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
      const dataExpMat = expMatResponse.data.results;
      //console.log(dataExpMat);

      const matExp = dataExpMat.map((p) => {
        if(p.resultado === "") {
          return p.id;
        }     
      })
        
      //console.log(matExp);
      setExpmat(dataExpMat);
      console.log(matExp.shift());

      // Painéis
      const numSesPlenaria = sessions?.reduce((o,p) => {return p.sessao_plenaria}, "");
      console.log(numSesPlenaria)

      const ordem = sessions?.map((p) => {
        if(p.resultado === "") {
          return p.id;
        }
      })
        
      //console.log(ordemDia);
      setOrdemDia(ordem.shift());
      
      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);      
      const votoResponse =  await aPIFetchVot.get(`?ordem=${ordemDia}&page_size=30`);
        
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results; 
      const dataVoto = votoResponse.data.results;
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
  }



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