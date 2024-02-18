import axios from 'axios';

const aPIFetchPres = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/presencaordemdia/",
    //timeout: 8000,
    headers: {       
        "content-language": "pt-br",         
        "content-type": "application/json",          
    }
});

export default aPIFetchPres;