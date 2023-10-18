import { useState, useEffect } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';


function Provider({ children }) {
  
  const [sessions, setSessions] = useState([]);
  
  
  useEffect(() => {
    aPIFetchOrdDia().then((data) => setSessions(data));
  }, [setSessions]);

  const contextValue = {    
    sessions,
    setSessions,
  };

  return (
    <Context.Provider value={ contextValue }>
      { children }
    </Context.Provider>
  );
}

export default Provider;