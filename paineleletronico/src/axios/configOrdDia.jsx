import axios from 'axios';

const aPIFetchOrdDia = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/ordemdia/",
    headers: {      
        "content-language": "pt-br", 
        "content-length": 4954, 
        "content-type": "application/json"      
    }
});

export default aPIFetchOrdDia;