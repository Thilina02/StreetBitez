import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const DriverContext = createContext({});

export function DriverContextProvider({ children }) {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    if (!driver) {
      axios.get('http://localhost:8000/drivers/profileDriver  ').then(({ data }) => {
        setDriver(data);
      });
    }
  }, []);

  return (
    <DriverContext.Provider value = {{ driver, setDriver }}>
      {children}
    </DriverContext.Provider>
  );
}
