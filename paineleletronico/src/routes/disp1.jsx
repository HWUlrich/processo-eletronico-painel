import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';

const Disp1 = () => {

  const [parl, setParl] = useState([]);
  const [parlSig, setParlSig] = useState([]);

  const getParl = async () => {
    
    try {
      const response = await blogFetchPar.get("/parlamentar");
      const response1 = await blogFetchPar.get("/partido");

      const data = response.data.results;
      setParl(data);

      const data1 = response1.data.results;
      setParlSig(data1);

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
      <h1>Parlamentares - CMNF</h1>
      {parl?.length === 0 ? (<p>Carregando...</p>) : (        
        parl?.map((parla) => (
          <div className="parl" key={parla.id}>
            <h1>{parla.nome_parlamentar}</h1>
            <h2>{parla.sexo}</h2>
            {parlSig?.length === 0 ? (<p>Carregando...</p>) : (        
              parlSig?.map((parla) => (
                <div className="parl" key={parla.id}>            
                  <p>{parla.sigla}</p>            
                </div>
        )
        )
      )}            
          </div>
        )
        )
      )}  
    
    </div>
  );

}

export default Disp1;