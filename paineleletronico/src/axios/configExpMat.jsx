import axios from 'axios';

const aPIFetchExpMat = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/expedientemateria/",
    //timeout: 8000,
    headers: {
        "content-language": "pt-br",
        "content-length": 4954, 
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",//http://localhost:5173/",      
    }
});

export default aPIFetchExpMat;