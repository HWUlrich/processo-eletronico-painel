import axios from 'axios';

const blogFetchPres = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/presencaordemdia/",
    headers: {
        "content-type": "application/json"
    }
});

export default blogFetchPres;