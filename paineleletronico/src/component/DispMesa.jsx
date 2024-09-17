import { useCallback, useContext } from 'react';
import { useTime } from 'react-timer-hook';
import Context from '../context/MyContext';
import './DispMesa.css';
import MatOrdDia from './MatOrdDia';
import MatExp from './MatExp';



const DispMesa = () => {  

  const { sessions, parlament } = useContext(Context);
  const { hours, minutes, seconds, ampm } = useTime({ format: '24-hour'});  

  const display = useCallback (() => {
    //console.log(dayToday);
    const dayToday = new Date();
    const day = dayToday.getDate();
    const month = dayToday.getMonth() + 1;
    const year = dayToday.getFullYear();
    const timer = (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;   

    return (    
      <div className='painel-mesa'>
        <div className='headline-mesa'>
          <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>             
        </div>
        <div className='data-hora-mesa'>
            <h2>{(day < 10 ? "0" + day : day) + " / " + (month < 10 ? "0" + month : month) + " / " + year}</h2>       
            <h2>{timer}h</h2>
        </div>       
        <div className="materias-exp-mesa">
          <MatExp />
          <MatOrdDia />
        </div>               
        <div className="painel-mat-result-mesa">        
          <div className='resultado-vot-mesa'>             
            <h2>Sim:  {parlament.reduce((o,p) => {p.voto === "Sim" && o++; return o}, 0)}</h2>
            <h2>Não:  {parlament.reduce((o,p) => {p.voto === "Não" && o++; return o}, 0)}</h2>
            <h2>Abstenções:  {parlament.reduce((o,p) => {p.voto === "Abstenção" && o++; return o}, 0)}</h2>
            <h2>Não Votaram:  {parlament.reduce((o,p) => {p.voto === "Não Votou" && o++; return o}, 0)}</h2>                                       
          </div>          
        </div>
      </div>
    );
  }, [parlament, ampm, hours, minutes, sessions]);

return display();

};

export default DispMesa;