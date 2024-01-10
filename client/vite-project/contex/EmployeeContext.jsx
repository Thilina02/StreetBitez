import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const EmployeeContext = createContext({});

export function EmployeeContextProvider({ children }) {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    if (!employee) {
    axios.get('/employee/getEmployeeProfile')
    .then(({data}) =>{
      setEmployee(data)
    })
    }
  },[]); 

  return (
    <EmployeeContext.Provider value={ {employee,setEmployee}}>
      {children}
    </EmployeeContext.Provider>
  )
}
