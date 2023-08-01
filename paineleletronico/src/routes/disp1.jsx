import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';

const Disp1 = () => {

  const [parl, setParl] = useState([]);
  //const [parlSig, setParlSig] = useState([]);

  const getParl = async () => {
    
    try {
      const response = await blogFetchPar.get("/parlamentar/search_parlamentares");
      //const response1 = await blogFetchPar.get("/partido");

      const data = response.data;
      setParl(data);

      //const data1 = response1.data.results;
      //setParlSig(data1);

    } catch (error) {
      console.log(error);
      alert ("Sem conexão com o SAPL");
    }

  }

  useEffect(() => {
    getParl();    
  }, []);

  return (
    <div className='par'>      
      {parl?.length === 0 ? (<p>Carregando...</p>) : (        
        parl?.map((parla) => (          
            (parla.ativo === true ? (         
          <div className="parl" key={parla.id}>                         
            <div className='parl-1'>
              <h1>{parla.nome_parlamentar}</h1>
            </div>            
            <div className='parl-2'>
              <h2>{parla.partido}</h2>
            </div>                              
          </div>
          ) : "")          
        )
        )
      )} 
    </div>
  );
}

export default Disp1;