import { useState, useEffect, useCallback, useContext } from 'react';
import Context from '../context/MyContext';
import '../routes/Disp.css';
import aPIFetchOrdDia from '../axios/configOrdDia';


const MatOrdDia = () => {

    const [matOrd, setMatOrd] = useState([]);
    const [matOrd1, setMatOrd1] = useState([]);

    const { date, retPautaOrd } = useContext(Context);

    const matOrdemDia = useCallback ( async () => {

        try{
        const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);
        const dataOrdDia = ordDiaResponse.data.results;

        const ordem = dataOrdDia?.filter((p) => p.resultado === "");
        const ordem1 = dataOrdDia?.filter((p) => p.resultado !== "");

        const matOrdem = ordem ? ordem?.map((p) => {return p.id}) : null;
        const nordem = retPautaOrd ? matOrdem.filter( item => !retPautaOrd.includes(item)) : matOrdem;
        const nordem1 = ordem1 ? ordem1?.map((p) => {return p.id}).pop() : null;
        
        const dataMateriasOrd = nordem ? await aPIFetchOrdDia.get(`${nordem.shift()}/`) : null;
        const materiasOrd = dataMateriasOrd.data;     
        setMatOrd([materiasOrd]);        
        console.log('materiasOrd', materiasOrd);
        
        const dataMateriasOrd1 = nordem1 ? await aPIFetchOrdDia.get(`${nordem1}/`) : null;
        const materiasOrd1 = dataMateriasOrd1.data;
        setMatOrd1([materiasOrd1]);        
        console.log('materiasOrd1', materiasOrd);
        
        } catch (error) {
            console.log(error);
        }

    }, [date, matOrd, matOrd1]);

    useEffect (() => {
      matOrdemDia();
    }, [matOrdemDia])

return (
    <div  className="materias-exp">
        <div>
        {matOrd1?.map((sessao) => (                    
            <div className='materia-vot' key={sessao.id}>
              <h1>Votação: {sessao.__str__.slice(24, -67)}</h1>
              <div className='materia-vot-res'>
                <h2>{sessao.resultado ? sessao.resultado : "Aguardando Votação"}</h2>                
              </div>                                  
            </div>
        ))}
        </div>          
        <div>
          {matOrd?.map((sessao) => (                    
            <div className='materia-vot1' key={sessao.id}>
              <h1>Votação: {sessao.__str__.slice(24, -67)}</h1>
              <div className='materia-vot-res1'>
                <h2>{sessao.resultado ? sessao.resultado : "Aguardando Votação"}</h2>                
              </div>                                  
            </div>
        ))}
        </div>
    </div> 
)
};

export default MatOrdDia;