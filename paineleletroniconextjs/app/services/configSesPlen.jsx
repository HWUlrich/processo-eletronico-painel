import axios from 'axios';

const aPIFetchSesPlen = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao-plenaria/",
    //timeout: 8000,
    headers: {     
        "content-language": "pt-br", 
        //"content-length": 4954, 
        "content-type": "application/json",
        //"Access-Control-Allow-Origin": "*",//http://localhost:5173/",     
    }
});

export default aPIFetchSesPlen;