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
  const [presenca, setPresenca] = useState([]);
  const [matExp, setMatExp] = useState([]);
  const [matExp1, setMatExp1] = useState([]);
  const [matOrd, setMatOrd] = useState([]);
  const [matOrd1, setMatOrd1] = useState([]);
  const dayToday = new Date();
  const day = dayToday.getDate();
  const month = dayToday.getMonth() + 1;
  const year = dayToday.getFullYear();
  const sessionsDay = (year + "-" + (month < 10 ?  "0" + month : month) + "-" + (day < 10 ? "0" + day : day));
  const [date, setDate] = useState('2024-06-18');
  //console.log(date);
  
  
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
      //console.log("Sessão Plenária: " + numSesPlenaria);

      const numSesPlen = sessions.map((p) => p.sessao_plenaria);
      const numSespLenar = numSesPlen.sort((a, b) => a - b);
      const numSesPlenaria3 = numSespLenar.shift();
      console.log(numSesPlenaria3);

      const ordem = dataOrdDia?.filter((p) => p.resultado === "");      
      //console.log("nordem: " + [nordem]);
      const nordem = ordem ? ordem?.map((p) => {return p.id}).shift() : [];                         
            
      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria3}`);           
      const votoResponse =  nordem ? await aPIFetchVot.get(`?ordem=${nordem}&page_size=30`) : null;
      //console.log([presentResponse])
        
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results; 
      const dataVoto = votoResponse ? votoResponse.data.results : null;
      //console.log(dataPresent);
      
      const merged1 = dataParlament.map((screen) => ({
        //...dataPresent.find((o) => o.parlamentar === screen.id),        
        ...dataVoto.find((o) => o.parlamentar === screen.id),
        ...screen      
      }));
      setParlament(merged1);
      //console.log(parlament);
      
      const merged2 = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),        
        ...screen        
      }));
      setPresenca(merged2);
      //console.log(presenca);
      
      //Matérias do Expediente
      const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
      const dataExpMat = expMatResponse.data.results;
      //console.log('date: ' + date);

      const matExp = dataExpMat?.filter((p) => p.resultado === "");
      const matExp1 = dataExpMat?.filter((p) => p.resultado !== "");

      const nmatExp = matExp ? matExp?.map((p) => {return p.id}).shift() : [];
      const nmatExp1 = matExp1 ? matExp1?.map((p) => {return p.id}).pop() : [];
      //console.log('nmatExp :' + nmatExp);
        
      const dataMateriasExp = nmatExp ? await aPIFetchExpMat.get(`${nmatExp}/`) : null;
      const materiasExp = dataMateriasExp.data;
      setMatExp([materiasExp]);
      //console.log(materiasExp);
      
      const dataMateriasExp1 = nmatExp1 ? await aPIFetchExpMat.get(`${nmatExp1}/`) : null;
      const materiasExp1 = dataMateriasExp1.data;
      setMatExp1([materiasExp1]);
      //console.log(materiasExp1); 

      //Matérias da Ordem do Dia
      const ordDiaResponse1 = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);
      const dataOrdDia1 = ordDiaResponse1.data.results;

      const ordem2 = dataOrdDia1?.filter((p) => p.resultado === "");
      const ordem1 = dataOrdDia1?.filter((p) => p.resultado !== "");
      //console.log(ordem2);

      const nordem2 = ordem2 ? ordem2?.map((p) => {return p.id}).shift() : [];
      const nordem1 = ordem1 ? ordem1?.map((p) => {return p.id}).pop() : [];
      
      const dataMateriasOrd = nordem2 ? await aPIFetchOrdDia.get(`${nordem2}/`) : null;
      const materiasOrd = dataMateriasOrd.data;
      setMatOrd([materiasOrd]);
      //console.log(materiasOrd);

      const dataMateriasOrd1 = nordem1 ? await aPIFetchOrdDia.get(`${nordem1}/`) : null;
      const materiasOrd1 = dataMateriasOrd1.data;
      setMatOrd1([materiasOrd1]);
      //console.log(materiasOrd1);
    
    } catch (error) {
      console.log(error);
      //alert ("Sem conexão com o SAPL");

    } 

  }, [sessions, date]);


  useEffect(() => {
    getSessions(); 
    /*      
    const apiUpdate = setInterval(() => {
      getSessions();
    }, 10000);    
    */
  }, [getSessions]);


  const contextValue = {    
    sessions,    
    parlament,
    presenca,
    matExp,
    matExp1,
    matOrd,
    matOrd1,    
    date,
    setSessions,    
    setParlament,
    setPresenca,
    setMatExp,
    setMatExp1,
    setMatOrd,
    setMatOrd1,    
    setDate,    
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;