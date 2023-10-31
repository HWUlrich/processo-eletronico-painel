import axios from 'axios';

const aPIFetchRegVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/registrovotacao/",
    //timeout: 8000,
    headers: {       
        "content-language": "pt-br", 
        "content-length": 4954, 
        "content-type": "application/json"      
    }
});

export default aPIFetchRegVot;