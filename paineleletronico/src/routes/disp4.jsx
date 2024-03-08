import { useContext, useEffect, useCallback, useState } from 'react';
import { useTime } from 'react-timer-hook';
import Context from '../context/MyContext';
import './Disp.css';
import aPIFetchExpMat from '../axios/configExpMat';
import aPIFetchOrdDia from '../axios/configOrdDia';


const Disp4 = () => {

  const [ matExp, setMatExp] = useState([]);
  const [ matOrd, setMatOrd] = useState([]);

  const { sessions, parlament, date } = useContext(Context);
  const { hours, minutes, seconds, ampm } = useTime({ format: '12-hour'});
  
  const dayToday = new Date();
  const day = dayToday.getDate();
  const month = dayToday.getMonth() + 1;
  const year = dayToday.getFullYear();
  const timer = (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;    


  const getMaterias = useCallback ( async () => {

  try {

  // Matérias do Expediente
  const expMatResponse = await aPIFetchExpMat.get(`?data_ordem=${date}&page_size=30`);
  const dataExpMat = expMatResponse.data.results;
  console.log('date: ' + date);

  const matExp = dataExpMat?.filter((p) => p.resultado === "Matéria lida")

  const nmatExp = matExp
    ?.map((p) => {
      return p.id;
    })
    .shift();

  console.log('nmatExp :' + nmatExp);
    
  const dataMateriasExp = nmatExp ? await aPIFetchExpMat.get(`${nmatExp}/`) : null;
  const materiasExp = dataMateriasExp.data;
  setMatExp([materiasExp]);
  console.log(materiasExp);

  const ordDiaResponse = await aPIFetchOrdDia.get(`?data_ordem=${date}&page_size=30`); 
  const dataOrdDia = ordDiaResponse.data.results;
  
  const ordem = dataOrdDia?.filter((p) => p.resultado === "Aprovado")
  
  const nordem = ordem
    ?.map((p) => {
      return p.id;
    })
    .shift();
    console.log('ordemDia :' + nordem);

    

  const dataMateriasOrd = nordem ? await aPIFetchOrdDia.get(`${nordem}/`) : null;
  const materiasOrd = dataMateriasOrd.data;
  setMatOrd([materiasOrd]);
  console.log(materiasOrd);

  } catch (error) {
    console.log(error);
    //alert ("Sem conexão com o SAPL");
  } 

  }, []);

  useEffect(() => {
    getMaterias();    
  }, [getMaterias]);

  return (    
    <div className='painel'>
      <div className='headline'>
        <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>             
      </div>
      <div className='data-hora'>
          <h2>{day + " / " + month + " / " + year}</h2>       
          <h2>{timer}</h2>
      </div>       
      <div className="materias-exp">                    
        {matExp.map((sessao) => (                                                                          
            <div className='exped-result'  key={sessao.id}>                         
              <div className='exped-result-mat'>
                <h1>Expediente: {sessao.__str__.slice(24, -67)}</h1>                                            
              </div>            
              <div className='exped-result-res'>
                <h2>{sessao.resultado}</h2>                
              </div>                                         
            </div>                
        ))}
      </div>               
      <div className="painel-mat-result">
        {matOrd.map((sessao) => (                    
          <div className='materia-vot' key={sessao.id}>
            <h1>Votação: {sessao.__str__.slice(24, -67)}</h1>                                  
          </div>
        ))} 
          <div className='resultado-vot'>             
            <h2>Sim: {parlament.reduce((o,p) => {p.voto === "Sim" && o++; return o}, 0)}</h2>
            <h2>Não: {parlament.reduce((o,p) => {p.voto === "Não" && o++; return o}, 0)}</h2>
            <h2>Abstenções: {parlament.reduce((o,p) => {p.voto === "Abstenções" && o++; return o}, 0)}</h2>
            <h2>Não Votaram: {parlament.reduce((o,p) => {p.voto === "Não Votou" && o++; return o}, 0)}</h2>                                       
          </div>          
      </div>
    </div>
  );
};

export default Disp4;