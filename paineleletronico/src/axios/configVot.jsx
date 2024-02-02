import axios from 'axios';

const aPIFetchVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/votoparlamentar/",
    //timeout:  8000,
    headers: {       
        "content-language": "pt-br", 
        //"content-length": 4954, 
        "content-type": "application/json",
        "access-Control-Allow-Origin": "*",
        "access-control-allow-headers": "*"
    }
});

export default aPIFetchVot;