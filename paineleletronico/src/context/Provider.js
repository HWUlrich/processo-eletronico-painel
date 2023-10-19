import { useState, useEffect } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';


function Provider() {
  
  const [sessions, setSessions] = useState([]);
  
  /*
  useEffect(() => {
    aPIFetchOrdDia().then((data) => setSessions(data));
  }, [setSessions]); 

  const contextValue = {    
    sessions,
    setSessions,
  }; */

  return (
    <Context.Provider value={ sessions }>
     <disp4 />
    </Context.Provider>
  );
}

export default Provider;