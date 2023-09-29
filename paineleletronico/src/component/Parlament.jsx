import { useState, useEffect, useCallback, useContext } from 'react';
import '../routes/Disp.css';
import aPIFetchPar from '../axios/configPar';
import aPIFetchVot from '../axios/configVot';
import aPIFetchPres from '../axios/configPres';
import Disp4 from '../routes/Disp4';
import '../routes/Disp.css';


const Parlament = () => {
  
  // altera a tabela de estilos
  document.body.classList.toggle('parlamentares');
   

  const [parlament, setParlament] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(21);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parlament.slice(startIndex, endIndex);
 
  

  const getParl = useCallback ( async () => {
    
    try {
      
      let numSesPlenaria = 695 // Disp4.sessions.map((sessao) => sessao.sessao_plenaria); // 15-08-2023
      let ordem = 2540; // 15-08-2023 - ordem 2534

      const parlamentResponse = await aPIFetchPar.get("parlamentar/search_parlamentares");      
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);      
      const votoResponse = await aPIFetchVot.get(`?ordem=${ordem}&page_size=21`);
      
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);      
      const dataPresent = presentResponse.data.results; 
      const dataVoto = votoResponse.data.results;  
      
      const merged = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),
        ...dataVoto.find((o) => o.parlamentar === screen.id),
        ...screen      
      }));

      setParlament(merged);

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
      {currentItens?.length === 0 ? (<p>Carregando Parlamentares...</p>) : (        
        currentItens?.map((parlament) => (                     
          <div className="parl" key={parlament.id}>                         
            <div className='parl-1'>
              <h1>{parlament.nome_parlamentar}</h1> 
            </div>                           
            <div className='parl-2'>
              <h2>{parlament.partido}</h2>
            </div>
            <div id='presParl' className='parl-3'>             
            <div>{parlament.parlamentar?<h2>Presente</h2>:<h3>Ausente</h3>}</div>            
            </div> 
            <div className='parl-4'>
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