import { useState, useEffect, useCallback, useContext } from 'react';
import Context from '../context/MyContext';
import '../routes/Disp.css';
import aPIFetchOrdDia from '../axios/configOrdDia';


const MatOrdDia = () => {

    const [matOrd, setMatOrd] = useState([]);
    const [matOrd1, setMatOrd1] = useState([]);

    const { date } = useContext(Context);

    const matOrdemDia = async () => {

        try{
        const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`);
        const dataOrdDia = ordDiaResponse.data.results;

        const ordem = dataOrdDia?.filter((p) => p.resultado === "");
        const nordem = ordem ? ordem?.map((p) => {return p.id}) : null;      
        const ordem1 = dataOrdDia?.filter((p) => p.resultado !== "");
        const nordem1 = ordem1 ? ordem1?.map((p) => {return p.id}).pop() : null;
        
        console.log(ordem);

        const dataMateriasOrd = nordem ? await aPIFetchOrdDia.get(`${nordem}/`) : null;
        const materiasOrd = dataMateriasOrd.data;     
        setMatOrd(materiasOrd);
        
        const dataMateriasOrd1 = nordem1 ? await aPIFetchOrdDia.get(`${nordem1}/`) : null;
        const materiasOrd1 = dataMateriasOrd1.data;
        setMatOrd1(materiasOrd1);
        
        } catch (error) {
            console.log(error);
        }

    };

return (
    <div>
        <div>
        {matOrd1.map((sessao) => (                    
            <div className='materia-vot' key={sessao.id}>
              <h1>Votação: {sessao.__str__.slice(24, -67)}</h1>
              <div className='materia-vot-res'>
                <h2>{sessao.resultado ? sessao.resultado : "Aguardando Votação"}</h2>                
              </div>                                  
            </div>
        ))}
        </div>          
        <div>
          {matOrd.map((sessao) => (                    
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
}

export default MatOrdDia;