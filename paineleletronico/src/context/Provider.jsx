import { useState, useEffect } from 'react';
import Context from './MyContext';
import aPIFetchOrdDia from '../axios/configOrdDia';


function Provider({children}) {
  
  const [sessions, setSessions] = useState([]);
  
  
  useEffect(() => {
    const fetchData = async () => {
    const response = await aPIFetchOrdDia();
    setSessions(response.data.results);
    };

    fetchData();
  }, [setSessions]);

  const contextValue = {    
    sessions,
    setSessions,
  }; 

  return (
    <Context.Provider value={ contextValue }>
     {children}
    </Context.Provider>
  );
}

export default Provider;