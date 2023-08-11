import React from 'react';
import { useState, useEffect } from 'react';
import './Disp.css';
import axios from 'axios';


const Disp4 = () => {  

  const [parl, setParl] = useState([]);    

  const getParl = async () => {

    const date = new Date().toLocaleDateString();
    //console.log(date);
    
    try {
      const url = 'https://sapl.novafriburgo.rj.leg.br/api/sessao-plenaria';
      const response = await axios.get(url);
      //console.log(response);
     
      const data = response.data.results.filter(
        results => results.datReuniaoString.slice(0, 10) >= date);
      console.log(data);
      setParl(data);  

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
          <div className="parl" key={parla.id}>                         
            <div className='parl-1'>
              <h1>{parla.txtTituloReuniao}</h1> 
            </div>            
            <div className='parl-2'>
              <h2>{parla.datReuniaoString}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp4;