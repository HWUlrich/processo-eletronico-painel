import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import blogFetchSes from '../axios/configSes';


const Disp4 = () => {  

  const [ses, setSes] = useState([]);    

  const getSes = async () => {
        
    try {
      
      const resp = await blogFetchSes.get();
      const page = resp.data.pagination.total_pages;
      let response = await blogFetchSes.get(`?page=${page}&page_size=10`);
      const date = new Date().toLocaleDateString();      
      console.log(date);
      
      for(let i = 0; i < response.data.results.length; i++) {      

      if(response.data.results[i].datReuniaoString.slice(0,9) === date) {

        response;
        break;         

       } else {
        
        response = await blogFetchSes.get(`?page=${page-1}&page_size=10`)

       }

      }       

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