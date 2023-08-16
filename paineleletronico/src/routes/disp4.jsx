import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import axios from 'axios';
import blogFetchSes from '../axios/configSes';


const Disp4 = () => {  

  const [ses, setSes] = useState([]);    

  const getSes = async () => {

        
    try {
      const response = await blogFetchSes.get('?page=69&page_size=10');

      //  'https://sapl.novafriburgo.rj.leg.br/api/sessao-plenaria/?page=69&page_size=10'      
     
      const pag = response.data.pagination.total_pages;
      //console.log(pag);
      //const key = Object.keys(response);
      //console.log(key);
      //const lastKey = key[key.length - 1];
      //console.log(lastKey);
      //const lastItem = response[lastKey];
      // console.log(lastItem);      
      
      const data = response.data.results;      
      setSes(data);      

    } catch (error) {
      console.log(error);
      alert ("Sem conexão com o SAPL");
    }

  }

  useEffect(() => {
    getSes();    
  }, []);

  return (
    <div className='painel'>      
      {ses?.length === 0 ? (<p>Carregando Painel...</p>) : (        
        ses?.map((sessao) => (                    
          <div className="painel-0" key={sessao.id}>                         
            <div className='painel-1'>
              <h1>{sessao.txtTituloReuniao}</h1> 
            </div>            
            <div className='parinel-2'>
              <h2>{sessao.datReuniaoString}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp4;