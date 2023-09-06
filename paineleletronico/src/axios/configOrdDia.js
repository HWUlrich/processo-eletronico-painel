import axios from 'axios';

const aPIFetchOrdDia = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/ordemdia/",
    headers: {
        "content-type": "application/json"
    }
});

export default aPIFetchOrdDia;