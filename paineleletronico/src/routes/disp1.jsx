import { useState, useEffect, useCallback } from 'react';
import './Disp.css';
import blogFetchPar from '../axios/configPar';
import blogFetchVot from '../axios/configVot';
import blogFetchPres from '../axios/configPres';

const Disp1 = () => {

  const [parlament, setParlament] = useState([]);
  const [parlamentPresent, setParlamentPresent] = useState([]);
  const [parlamentVoto, setParlamentVoto] = useState([]);
  const [itensPerPage, setItensPerPage] = useState(7);
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itensPerPage;
  const endIndex = startIndex + itensPerPage;
  const currentItens = parlament.slice(startIndex, endIndex);


  const getParl = useCallback ( async () => {
    
    try {
      let numSesPlenaria = 697;
      let ordem = 2380;
      const parlamentResponse = await blogFetchPar.get("parlamentar/search_parlamentares");
      const presentResponse = await blogFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);
      const votoResponse = await blogFetchVot.get(`?ordem=${ordem}`);

      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);
      setParlament(dataParlament);

      const dataPresent = presentResponse.data.results;
      setParlamentPresent(dataPresent);

      const dataVoto = votoResponse.data.results;
      setParlamentVoto(dataVoto);


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
            {parlamentPresent.map((present) => (             
            <div className='parl-4'>
              <h2>{present.parlamentar}</h2>
            </div>))}
            {parlamentVoto.map((voto) => (             
            <div className='parl-3'>
              <h2>{voto.voto}</h2>
            </div>))}
          </div>
    </div>
  )
}

export default Disp1;