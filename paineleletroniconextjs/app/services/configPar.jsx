import axios from 'axios';

const aPIFetchPar = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/parlamentares/",
    //timeout: 8000,
    headers: {       
        "content-language": "pt-br",         
        "content-type": "application/json",            
    }
});

export default aPIFetchPar;