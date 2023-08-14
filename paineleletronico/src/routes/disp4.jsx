import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import axios from 'axios';


const Disp4 = () => {  

  const [sess, setSess] = useState([]);    

  const getSes = async () => {

    //const date = new Date().toLocaleDateString();
    //console.log(date);
    
    try {
      const url = `https://sapl.novafriburgo.rj.leg.br/api/sessao-plenaria/`;
      const response = await axios.get(url);
      //console.log(response);
     
      const data = response.data.results.slice(-1);
      
      /*.filter(
        results => results.datReuniaoString.slice(0, 10) >= date);
        */

      console.log(data);      
      setSess(data);
      

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
      {sess?.length === 0 ? (<p>Carregando Painel...</p>) : (        
        sess?.map((sessao) => (                    
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