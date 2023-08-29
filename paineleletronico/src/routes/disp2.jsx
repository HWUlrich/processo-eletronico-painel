import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';
import blogFetchVot from '../axios/configVot';

const Disp2 = () => {

  const [parl, setParl] = useState([]);
  const [parlSig, setParlSig] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parl.slice(startIndex, endIndex);


  const getParl = useCallback ( async () => {
    
    try {
      const response = await blogFetchPar.get("parlamentar/search_parlamentares");
      const response1 = await blogFetchVot.get("votoparlamentar");

      const data = response.data.filter(data => data.ativo === true);
      setParl(data);

      const data1 = response1.data.results;
      setParlSig(data1);

    } catch (error) {
      console.log(error);
      alert ("Sem conexão com o SAPL");
    }

  }, []);

  useEffect(() => {
    getParl();    
  }, [getParl]);

  return (
    <div className='par'>      
      {currentItens.length === 0 ? (<p>Carregando Parlamentares...</p>) : (        
        currentItens.map((parla) => (                     
          <div className="parl" key={parla.id}>                         
            <div className='parl-1'>
              <h1>{parla.nome_parlamentar}</h1> 
            </div>                           
            <div className='parl-2'>
              <h2>{parla.partido}</h2>
            </div>
            <div className='parl-4'>
              <h2>Presente</h2>
            </div> 
            <div className='parl-3'>
              <h2>voto</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp2;