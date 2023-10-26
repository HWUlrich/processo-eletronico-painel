import axios from 'axios';

const aPIFetchVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/votoparlamentar/",
    headers: {       
        "content-language": "pt-br", 
        "content-length": 4954, 
        "content-type": "application/json"      
    }
});

export default aPIFetchVot;