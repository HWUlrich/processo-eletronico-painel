import axios from 'axios';

const aPIFetchRegVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/registrovotacao/",
    headers: {
        "content-type": "application/json"
    }
});

export default aPIFetchRegVot;