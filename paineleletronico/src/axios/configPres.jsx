import axios from 'axios';
// https://sapl.novafriburgo.rj.leg.br/api/sessao/sessaoplenariapresenca/?page_size=30&sessao_plenaria=657
// https://sapl.novafriburgo.rj.leg.br/api/sessao/presencaordemdia/
const aPIFetchPres = axios.create({
    baseURL: "https://sapl.novafriburgo.rj.leg.br/api/sessao/presencaordemdia/",
    //timeout: 8000,
    headers: {       
        "content-language": "pt-br",         
        "content-type": "application/json",         
    }
});

export default aPIFetchPres;