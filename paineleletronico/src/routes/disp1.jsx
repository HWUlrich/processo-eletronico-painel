import React from 'react'
import { useState, useEffect } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';

const Disp1 = () => {

  const [parl, setParl] = useState([]);

  const getParl = async () => {
    
    try {
      const response = await blogFetchPar.get("/parlamentar");
      
      const data = response.data.results;
      setParl(data);

    } catch (error) {
      console.log(error);
      alert ("Falta de conxão com o SAPL");
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
            <h2>{parla.nome_parlamentar}</h2>
            <h1>{parla.sigla}</h1>
            <p>{parla.ativo}</p>            
          </div>
        )
        )
      )}
    </div>
  );

}

export default Disp1;