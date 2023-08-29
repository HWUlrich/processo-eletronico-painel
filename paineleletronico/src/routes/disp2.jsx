import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';
import blogFetchVot from '../axios/configVot';
import blogFetchPres from '../axios/configPres';

const Disp2 = () => {

  const [parlament, setParlament] = useState([]);
  const [parlamentPresent, setParlamentPresent] = useState([]);
  const [parlamentVoto, setParlamentVoto] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parlament.slice(startIndex, endIndex);


  const getParl = useCallback ( async () => {
    
    try {
      let numSesPlenaria = 696;
      let ordem = 2380;
      const parlamentResponse = await blogFetchPar.get("parlamentar/search_parlamentares");
      
      const presentResponse = await blogFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);
      
      const votoResponse = await blogFetchVot.get(`?ordem=${ordem}`);
      
      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);
      //setParlament(dataParlament);
      console.log(dataParlament);

      const dataPresent = presentResponse.data.results;
      //setParlamentPresent(dataPresent);
      console.log(dataPresent);

      const dataVoto = votoResponse.data.results;
      //setParlamentVoto(dataVoto);
      console.log(dataVoto);
      
      const merged = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),
        ...dataVoto.find((u) => u.parlamentar === screen.id),
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
              <h2>{parla.sessao_plenaria}</h2>
            </div> 
            <div className='parl-3'>
              <h2>{parla.voto}</h2>
            </div>                              
          </div>                    
        )
        )
      )} 
    </div>
  );
}

export default Disp2;