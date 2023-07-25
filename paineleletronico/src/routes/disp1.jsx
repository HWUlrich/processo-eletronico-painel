import React from 'react'
import { useState, useEffect } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/config';

const Disp1 = () => {

  const [posts, setPosts] = useState([]);

  const getPosts = async() => {
    
    try {
      const response = await blogFetchPar.get('/parlamentar');
      
      const data = response.results;
      setPosts(data);

    } catch (error) {
      console.log(error);
      alert ("Falta de conxão com o Banco de Dados");
    }

  }

  useEffect(() => {
    getPosts();
  }, [])

const disp1 = () => {
  return (
    <div className='par'>
      <h1>Parlamentares - CMNF</h1>
      {parlamentar.length === 0 ? (<p>Carregando...</p>) : (
  
        parlamentar.map((parl) => (
          <div className="post" key={parl.id}>
            <h2>{parl.nome_parlamentar}</h2>
            <h1>{parl.partido}</h1>
            <p>{parl.ativo}</p>            
          </div>
        )
        )
      )}
    </div>
  )
}
}

export default Disp1;