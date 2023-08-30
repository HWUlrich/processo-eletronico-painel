import axios from 'axios';

const aPIFetchVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/votoparlamentar/",
    headers: {
        "content-type": "application/json"
    }
});

export default aPIFetchVot;