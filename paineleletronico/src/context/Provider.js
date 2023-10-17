import { useState, useEffect } from 'react';
import Context from './MyContext';
import fetchDrinks from "../services/fetchDrinks";
import fetchFoods from '../services/fetchFoods';

function Provider({ children }) {
  
  const [sessions, setSessions] = useState([]);
  
  
  /*useEffect(() => {
    fetchFoods().then((data) => setParlament(data));
    fetchDrinks().then((data) => setSessions(data));
  }, [setSessions]); */

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