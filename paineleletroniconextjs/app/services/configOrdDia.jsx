import axios from 'axios';

const aPIFetchOrdDia = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/ordemdia/",
    //timeout: 8000,
    headers: {      
        "content-language": "pt-br",         
        "content-type": "application/json",             
    }
});

export default aPIFetchOrdDia;