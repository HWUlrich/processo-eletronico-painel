import axios from 'axios';

const blogFetchVot = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/",
    headers: {
        "content-type": "application/json"
    }
});

export default blogFetchVot;