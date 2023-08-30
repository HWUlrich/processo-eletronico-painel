import axios from 'axios';

const aPIFetchPres = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/presencaordemdia/",
    headers: {
        "content-type": "application/json"
    }
});

export default aPIFetchPres;