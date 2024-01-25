import { useContext } from 'react';
import { useTime } from 'react-timer-hook';
import Context from '../context/MyContext';
import styles from '../page.module.css';


const Disp4 = () => {

  const { sessions, expmat, parlament, ordemDia } = useContext(Context);
  const { hours, minutes, seconds, ampm } = useTime({ format: '12-hour'});
  
  const dayToday = new Date();
  const day = dayToday.getDate();
  const month = dayToday.getMonth() + 1;
  const year = dayToday.getFullYear();
  const timer = (hours < 10 ? "0" + hours : hours) + " : " + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;

  return (    
    <div className={styles.painel}>
      <div className={styles.headline}>
        <h1>{sessions.reduce((o, p) => {return p.txtTituloReuniao}, "")}</h1>             
      </div>
      <div className={styles.data-hora}>
          <h2>{day + " / " + month + " / " + year}</h2>       
          <h2>{timer}</h2>
        </div>       
      <div className={styles.materias-exp}>                    
        {expmat.map((sessao) => (                                                                            
            <div className={styles.exped-result}  key={sessao.id}>                         
              <div className={styles.exped-result-mat}>
                <h1>{sessao.__str__.slice(24, -67)}</h1>                                            
              </div>            
              <div className={styles.exped-result-res}>
                <h2>{sessao.resultado}</h2>                
              </div>                                         
            </div>                
        ))}
      </div>               
      <div className={styles.painel-mat-result}>
        {sessions.map((sessao) => (                    
          <div className={styles.materia-vot} key={sessao}>
            <h1>{sessao.id === ordemDia && sessao.__str__.slice(24, -67)}</h1>                                  
          </div>
        ))} 
          <div className={styles.resultado-vot}>             
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