import { useState, useEffect, useCallback } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';
import aPIFetchSesPlen from '../axios/configSesPlen';
import aPIFetchPar from '../axios/configPar';
import aPIFetchPres from '../axios/configPres';
import aPIFetchVot from '../axios/configVot';

function Provider({ children }) {
  const [sessions, setSessions] = useState([]);
  const [parlament, setParlament] = useState([]);
  const [date, setDate] = useState('2023-12-14');

  const getSessions = useCallback(async () => {
    //const dateOrdem = "2023-12-14";
    //setDate(dateOrdem);

    try {
      // Ordem do dia
      const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);
      const sesPlenResponse = await aPIFetchSesPlen.get(`?data_inicio=${date}&page_size=30`);
      const test = 1;

      const dataOrdDia = ordDiaResponse.data.results;

      const dataSesPlen = sesPlenResponse.data.results;

      const merged = dataOrdDia.map((screen) => ({
        ...dataSesPlen.find((o) => o.codReuniao === screen.sessao_plenaria),
        ...screen,
      }));

      setSessions(merged);
      //console.log(merged);

      // Painéis
      const numSesPlenaria = sessions?.reduce((o, p) => {
        return p.sessao_plenaria;
      }, '');
      //console.log(numSesPlenaria)

      const ordem = dataOrdDia?.filter((p) => p.resultado === 'Aprovado');
      const nordem = ordem
        ?.map((p) => {
          return p.id;
        })
        .shift();

      const parlamentResponse = await aPIFetchPar.get('parlamentar/search_parlamentares');
      const presentResponse = await aPIFetchPres.get(`?page_size=21&sessao_plenaria=${numSesPlenaria}`);
      const votoResponse = nordem ? await aPIFetchVot.get(`?ordem=${nordem}&page_size=30`) : null;

      const dataParlament = parlamentResponse.data.filter((data) => data.ativo === true);
      const dataPresent = presentResponse.data.results;
      const dataVoto = votoResponse ? votoResponse.data.results : [];
      //console.log(dataVoto);

      const merged1 = dataParlament.map((screen) => ({
        ...dataPresent.find((o) => o.parlamentar === screen.id),
        ...dataVoto.find((o) => o.parlamentar === screen.id),
        ...screen,
      }));

      setParlament(merged1);
    } catch (error) {
      console.log(error);
      //alert ("Sem conexão com o SAPL");
    }
  }, []);

  useEffect(() => {
    getSessions();
  }, [getSessions]);

  const contextValue = {
    sessions,
    parlament,
    date,
    setSessions,
    setParlament,
    setDate,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export default Provider;
