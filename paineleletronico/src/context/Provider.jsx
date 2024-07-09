import { useState, useEffect, useCallback } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchSesPlen from '../axios/configSesPlen';
import aPIFetchPar from '../axios/configPar';
import aPIFetchPres from '../axios/configPres'; // Presença na ordem do dia.
import aPIFetchVot from '../axios/configVot';
import aPIFetchExpMat from '../axios/configExpMat';
import aPIFetchRetPauta from '../axios/configRetPauta';
import aPIFetchSesPlePres from '../axios/configSesPlePres'; // Presença no Expediente.


function Provider({children}) {
  
  const [sessions, setSessions] = useState([]);  
  const [parlament, setParlament] = useState([]);  
  const [presenca, setPresenca] = useState([]);
  const [presencaExp, setPresencaExp] = useState([]);
  const [matExp, setMatExp] = useState([]);
  const [matExp1, setMatExp1] = useState([]);
  const [matOrd, setMatOrd] = useState([]);
  const [matOrd1, setMatOrd1] = useState([]);
  const dayToday = new Date();
  const day = dayToday.getDate();
  const month = dayToday.getMonth() + 1;
  const year = dayToday.getFullYear();
  const sessionsDay = (year + "-" + (month < 10 ?  "0" + month : month) + "-" + (day < 10 ? "0" + day : day));
  const [date, setDate] = useState('2024-07-09');
  
  
  const getSessions = useCallback ( async () => {  

    try {      
      // Ordem do dia
      const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);      
      const sesPlenResponse = await aPIFetchSesPlen.get(`?data_inicio=${date}&page_size=30`);
      const retPautaResponse = await aPIFetchRetPauta.get(`?data=${date}&page_size=30`);      
                 
      const dataOrdDia = ordDiaResponse.data.results;       
      const dataSesPlen = sesPlenResponse.data.results;
      const dataRetPauta = retPautaResponse.data.results;
           
      const merged = dataOrdDia.map((screen) => ({        
        ...dataSesPlen.find((o) => o.codReuniao === screen.sessao_plenaria),              
        ...screen      
      }));      
      setSessions(merged);
      
      const numSesPlen = sessions.map((p) => p.sessao_plenaria);
      const numSespLenar = numSesPlen.sort((a, b) => a - b);
      const numSesPlenaria = numSespLenar.shift();
      console.log(numSesPlenaria);                           
            
      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);
      const presentExpResponse = await aPIFetchSesPlePres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);            
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results;
      const dataPresentExp = presentExpResponse.data.results;

      const merged0 = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),        
        ...screen        
      }));
      setPresenca(merged0);

      const merged1 = dataParlament.map((screen) => ({
        ...dataPresentExp.find((o) => o.parlamentar === screen.id),        
        ...screen        
      }));
      setPresencaExp(merged1);

      //Matérias do Expediente
      const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
      const dataExpMat = expMatResponse.data.results;

      const matExp = dataExpMat?.filter((p) => p.resultado === "");
      const matExp1 = dataExpMat?.filter((p) => p.resultado !== "");

      const nmatExp = matExp ? matExp?.map((p) => {return p.id}).shift() : null;      
      const nmatExp1 = matExp1 ? matExp1?.map((p) => {return p.id}).pop() : [];
              
      const dataMateriasExp = nmatExp ? await aPIFetchExpMat.get(`${nmatExp}/`) : null;
      const materiasExp = dataMateriasExp.data;
      setMatExp([materiasExp]);
      
      const dataMateriasExp1 = nmatExp1 ? await aPIFetchExpMat.get(`${nmatExp1}/`) : null;
      const materiasExp1 = dataMateriasExp1.data;
      setMatExp1([materiasExp1]);

      //Matérias da Ordem do Dia
      const ordem = dataOrdDia?.filter((p) => p.resultado === "");      
      const ordem1 = dataOrdDia?.filter((p) => p.resultado !== "");
      //console.log(ordem1);
      const retPauta = dataRetPauta?.map((p) => {return p.ordem});
      const matOrdem = ordem ? ordem?.map((p) => {return p.id}) : null;     

      const preordem = retPauta ? matOrdem.filter( item => !retPauta.includes(item)) : matOrdem;
      const nordem = ordem ? preordem.shift() : null;
      const nordem1 = ordem1 ? ordem1?.map((p) => {return p.id}).pop() : null;

      const idExpOrd = [...nmatExp, ...nordem].shift(); //É preciso que todas as matérias estejam com o resultado diferente de zero, a fim de manter a sequência.
      console.log(idExpOrd);
      
      const votoResponse =  await aPIFetchVot.get(`?ordem=${idExpOrd}&page_size=30`);
      const dataVoto = votoResponse ? votoResponse.data.results : null;      
      
      const merged2 = dataParlament.map((screen) => ({
        ...dataVoto.find((o) => o.parlamentar === screen.id),        
        ...screen      
      }));
      setParlament(merged2);     

      //Matérias da Ordem do Dia     
      const dataMateriasOrd = nordem ? await aPIFetchOrdDia.get(`${nordem}/`) : null;
      const materiasOrd = dataMateriasOrd.data;     
      setMatOrd([materiasOrd]);
      
      const dataMateriasOrd1 = nordem1 ? await aPIFetchOrdDia.get(`${nordem1}/`) : null;
      const materiasOrd1 = dataMateriasOrd1.data;
      setMatOrd1([materiasOrd1]);

    } catch (error) {
      console.log(error);
    } 

  }, [sessions, date]);

  useEffect(() => {
    getSessions(); 
  }, [getSessions]);

  const contextValue = {    
    sessions,    
    parlament,    
    presenca,
    presencaExp,
    matExp,
    matExp1,
    matOrd,
    matOrd1,    
    date,
    setSessions,    
    setParlament,    
    setPresenca,
    setPresencaExp,
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