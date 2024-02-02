import axios from 'axios';

const aPIFetchVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/votoparlamentar/",
    //timeout:  8000,
    headers: {       
        "content-language": "pt-br", 
        //"content-length": 4954, 
        "content-type": "application/json",
        "access-Control-Allow-Origin": "*",
        "access-control-allow-headers": "Access-Control-Allow-Origin,XMLHttpRequest,Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Mx-ReqToken,X-Requested-With "
    }
});

export default aPIFetchVot;