import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';

const Disp1 = () => {

  const [parl, setParl] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(3);

  // const pages = Math.ceil(parl.length / itensPerPage);
  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parl.slice(startIndex, endIndex);


  const getParl = async () => {
    
    try {
      const response = await blogFetchPar.get("/parlamentar/search_parlamentares");
      //const response1 = await blogFetchPar.get("/partido");

      const data = response.data.ativo('true');
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
      {currentItens?.length === 0 ? (<p>Carregando...</p>) : (        
        currentItens?.map((parla) => (          
            (parla.ativo === true || parla.ativo === false ? (         
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