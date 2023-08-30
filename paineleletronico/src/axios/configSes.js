import axios from 'axios';

const aPIFetchSes = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/ordemdia/",
    headers: {
        "content-type": "application/json"
    }
});

export default aPIFetchSes;