import { useContext, useEffect, useCallback, useState } from 'react';
import { useTime } from 'react-timer-hook';
import Context from '../context/MyContext';
import './Disp.css';
import aPIFetchExpMat from '../axios/configExpMat';
import aPIFetchOrdDia from '../axios/configOrdDia';


const Disp4 = () => {

  const [ matExp, setMatExp] = useState([]);
  const [ matOrd, setMatOrd] = useState([]);

  const { sessions, expmat, parlament, ordemDia } = useContext(Context);
  const { hours, minutes, seconds, ampm } = useTime({ format: '12-hour'});
  
  const dayToday = new Date();
  const day = dayToday.getDate();
  const month = dayToday.getMonth() + 1;
  const year = dayToday.getFullYear();
  const timer = (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
  
  console.log('expmat :' + expmat);
  console.log('ordemDia :' + ordemDia);

  const getMaterias = useCallback ( async () => {

  try {
  const dataMateriasExp = expmat ? await aPIFetchExpMat.get(`${expmat}/`) : null;
  const materiasExp = dataMateriasExp.data;
  setMatExp(materiasExp);

  const dataMateriasOrd = ordemDia ? await aPIFetchOrdDia.get(`${ordemDia}/`) : null;
  const materiasOrd = dataMateriasOrd.data;
  setMatOrd(materiasOrd);

  } catch (error) {
    console.log(error);
    //alert ("Sem conexão com o SAPL");
  } 

  }, []);

  useEffect(() => {
    getMaterias();    
  }, []);

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
                <h1>{sessao.__str__ ? sessao.__str__.slice(24, -67) : null}</h1>                                            
              </div>            
              <div className='exped-result-res'>
                <h2>{sessao.resultado ? sessao.resultado : null}</h2>                
              </div>                                         
            </div>                
        ))}
      </div>               
      <div className="painel-mat-result">
        {matOrd.map((sessao) => (                    
          <div className='materia-vot' key={sessao.id}>
            <h1>{sessao.__str__ ? sessao.__str__.slice(24, -67) : null}</h1>                                  
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