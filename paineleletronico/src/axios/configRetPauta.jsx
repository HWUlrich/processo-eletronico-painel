import axios from 'axios';

const aPIFetchRetPauta = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/retiradapauta/",
    //timeout: 8000,
    headers: {
        "content-language": "pt-br",         
        "content-type": "application/json",      
    }
});

export default aPIFetchRetPauta;