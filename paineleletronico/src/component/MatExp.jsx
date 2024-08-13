import { useState, useEffect, useCallback, useContext } from 'react';
import Context from '../context/MyContext';
import '../routes/Disp.css';
import aPIFetchExpMat from '../axios/configExpMat';


const MatExp = () => {

    const [ matExp, setMatExp ] = useState([]);
    const [ matExp1, setMatExp1] = useState([]);

    const { date } = useContext(Context);

    const matExped = useCallback ( async () => {

        try{
        const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
        const dataExpMat = expMatResponse.data.results;

        const matExp = dataExpMat?.filter((p) => p.resultado === "");
        const matExp1 = dataExpMat?.filter((p) => p.resultado !== "");

        const nmatExp = matExp ? matExp?.map((p) => {return p.id}).shift() : null;      
        const nmatExp1 = matExp1 ? matExp1?.map((p) => {return p.id}).pop() : null;
                
        const dataMateriasExp = nmatExp ? await aPIFetchExpMat.get(`${nmatExp}/`) : null;
        const materiasExp = dataMateriasExp.data;
        setMatExp([materiasExp]);
        
        const dataMateriasExp1 = nmatExp1 ? await aPIFetchExpMat.get(`${nmatExp1}/`) : null;
        const materiasExp1 = dataMateriasExp1.data;
        setMatExp1([materiasExp1]);

        } catch (error) {
            console.log(error);
        }

    }, [date, matExp, matExp1]);

    useEffect (() => {
        matExped();
    }, [matExped])    
    
    return (
        <div className="materias-exp">
            <div>                    
            {matExp1?.map((sessao) => (                                                                          
                <div className='exped-result'  key={sessao.id}>                         
                    <div className='exped-result-mat'>
                        <h1>Expediente: {sessao.__str__.slice(24, -67)}</h1>                                            
                    </div>            
                    <div className='exped-result-res'>
                        <h2>{sessao.resultado ? sessao.resultado : "Em Pauta para Leitura"}</h2>                
                    </div>                                         
                </div>                
            ))}
            </div>
            <div>
            {matExp?.map((sessao) => (                                                                          
                <div className='exped-result'  key={sessao.id}>                         
                    <div className='exped-result-mat1'>
                        <h1>Expediente: {sessao.__str__.slice(24, -67)}</h1>                                            
                    </div>            
                    <div className='exped-result-res1'>
                        <h2>{sessao.resultado ? sessao.resultado : "Em Pauta para Leitura"}</h2>                
                    </div>                                         
                </div>                
            ))}
            </div>          
        </div>
    )
};

export default MatExp;
