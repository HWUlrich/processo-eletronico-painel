import { useCallback, useContext } from 'react';
import { useTime } from 'react-timer-hook';
import Context from '../context/MyContext';
import './Disp.css';
import MatOrdDia from '../component/matOrdDia';
import MatExp from '../component/MatExp';



const Disp4 = () => {  

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
      <div className='painel'>
        <div className='headline'>
          <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>             
        </div>
        <div className='data-hora'>
            <h2>{(day < 10 ? "0" + day : day) + " / " + (month < 10 ? "0" + month : month) + " / " + year}</h2>       
            <h2>{timer}h</h2>
        </div>       
        <div className="materias-exp">
          <MatExp />
          <MatOrdDia />
        </div>               
        <div className="painel-mat-result">        
          <div className='resultado-vot'>             
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

export default Disp4;