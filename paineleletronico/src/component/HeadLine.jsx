import { useState, useEffect, useCallback } from 'react';
import '../routes/Disp.css';
import aPIFetchSesPlen from '../axios/configOrdDia';

const HeadLine = () => {

  const [sessions, setSessions] = useState([]);     

  const getSessions = useCallback ( async () => {

    try {
                  
      let date = "2023-08-15";  // new Date().toLocaleDateString;
      const sesPlenResponse = await aPIFetchSesPlen.get(`?data_inicio=${date}`);
      
      const dataSesPlen = sesPlenResponse.data.results;      

      setSessions(dataSesPlen);

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
        <div className='headline'>
        <div>{sessions.map((titulo) => <h1 key={titulo.codReuniao}>{titulo.txtTituloReuniao}</h1>)}</div>
      </div>
      )} 
    </div>
  );
}

export default HeadLine;