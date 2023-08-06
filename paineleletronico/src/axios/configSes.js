import axios from 'axios';

const blogFetchSes = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/votoparlamentar/",
    headers: {
        "content-type": "application/json"
    }
});

export default blogFetchSes;