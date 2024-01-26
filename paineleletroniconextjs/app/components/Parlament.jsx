'use client'
import { useState, useContext } from 'react';
import styles from '../page.module.css'
import Context from '../context/MyContext';


const Parlament = () => {
  
  const { parlament } = useContext(Context);
  const [ itensPerPage ] = useState(21);
  const [ currentPage ] = useState(0);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parlament.slice(startIndex, endIndex);  

 
  return (
    <div className={styles.par}>      
      {currentItens?.length === 0 ? (<p>Carregando Parlamentares...</p>) : (        
        currentItens?.map((parlament) => (                     
          <div className={styles.parl} key={parlament.id}>                         
            <div className={styles.parl-1}>
              <h1>{parlament.nome_parlamentar}</h1> 
            </div>                           
            <div className={styles.parl-2}>
              <h2>{parlament.partido}</h2>
            </div>
            <div id={styles.presParl} className='parl-3'>             
            <div>{parlament.parlamentar?<h2>Presente</h2>:<h3>Ausente</h3>}</div>            
            </div> 
            <div className={styles.parl-4}>
              <h2>{parlament.voto?parlament.voto:"-"}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Parlament;