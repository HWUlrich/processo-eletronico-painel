import { useState, useEffect, useCallback } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchSesPlen from '../axios/configSesPlen';
import aPIFetchPar from '../axios/configPar';
import aPIFetchPres from '../axios/configPres'; // Presença na ordem do dia.
import aPIFetchVot from '../axios/configVot';
import aPIFetchRetPauta from '../axios/configRetPauta';
import aPIFetchSesPlePres from '../axios/configSesPlePres'; // Presença no Expediente.


function Provider({children}) {
  
  const [sessions, setSessions] = useState([]);  
  const [parlament, setParlament] = useState([]);  
  const [presenca, setPresenca] = useState([]);
  const [dataPre, setDataPre] = useState([]);
  const [presencaExp, setPresencaExp] = useState([]);
  const [dataPreExp, setDataPreExp] = useState([]);
  const [retPautaOrd, setRetPautaOrd] = useState([]);
  
  const dayToday = new Date();
  const day = dayToday.getDate();
  const month = dayToday.getMonth() + 1;
  const year = dayToday.getFullYear();
  const sessionsDay = (year + "-" + (month < 10 ?  "0" + month : month) + "-" + (day < 10 ? "0" + day : day));
  const [date, setDate] = useState('2025-02-13');
  
  
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
      console.log('Presença', presentResponse);
      const presentExpResponse = await aPIFetchSesPlePres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);            
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results;
      setDataPre(dataPresent);
      const dataPresentExp = presentExpResponse.data.results;
      setDataPreExp(dataPresentExp);

      const merged0 = dataParlament.map((screen) => ({
        ...dataPresent.filter((o) => o.parlamentar === screen.id),        
        ...screen
      }));
      setPresenca(merged0);

      const merged1 = dataParlament.map((screen) => ({
        ...dataPresentExp.filter((o) => o.parlamentar === screen.id),        
        ...screen
      }));
      setPresencaExp(merged1);    

      //Matérias da Ordem do Dia
      const ordem = dataOrdDia?.filter((p) => p.resultado === "");      
      console.log('ordem: ', ordem);
      const retPauta = dataRetPauta?.map((p) => {return p.ordem});
      const matOrdem = ordem ? ordem?.map((p) => {return p.id}) : null;
      setRetPautaOrd(retPauta);     

      const nordem = retPauta ? matOrdem.filter( item => !retPauta.includes(item)) : matOrdem;           
      console.log('nordem: ', [nordem]);      
      
      const votoResponse =  await aPIFetchVot.get(`?ordem=${nordem.shift()}&page_size=30`);
      const dataVoto = votoResponse.data.results;
      console.log('voto', dataVoto);      
      
      const merged2 = dataParlament.map((screen) => ({
        ...dataPresentExp.filter((o) => o.parlamentar === screen.id),
        ...dataPresent.filter((o) => o.parlamentar === screen.id),
        ...dataVoto.filter((o) => o.parlamentar === screen.id),        
        ...screen      
      }));
      setParlament(merged2);
      console.log('merged2', merged2)     

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
    dataPre,
    presencaExp,
    dataPreExp,        
    date,
    retPautaOrd,
    setSessions,    
    setParlament,    
    setPresenca,
    setDataPre,
    setPresencaExp,
    setDataPreExp,        
    setDate,
    setRetPautaOrd  
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;