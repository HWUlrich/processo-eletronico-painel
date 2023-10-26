import axios from 'axios';

const aPIFetchSesPlen = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao-plenaria/",
    headers: {     
        "content-language": "pt-br", 
        "content-length": 4954, 
        "content-type": "application/json"     
    }
});

export default aPIFetchSesPlen;