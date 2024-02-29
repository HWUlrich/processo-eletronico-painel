import axios from 'axios';

const aPIFetchVot = axios.create({
  baseURL: 'https://sapl.novafriburgo.rj.leg.br/api/sessao/votoparlamentar/',
  //timeout:  8000,
  headers: {
    'content-language': 'pt-br',
    'content-type': 'application/json',
  },
});

export default aPIFetchVot;
