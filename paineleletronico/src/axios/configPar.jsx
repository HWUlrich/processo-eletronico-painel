import axios from 'axios';

const aPIFetchPar = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/parlamentares/",
    headers: {
        "content-type": "application/json"
    }
});

export default aPIFetchPar;